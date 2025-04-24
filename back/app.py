from flask import Flask, request, jsonify
from flask_cors import CORS  # 🔹 Add this
import cv2
import numpy as np
import requests
from scipy.spatial.distance import euclidean
from imutils import perspective, contours
import imutils

app = Flask(__name__)
CORS(app)

def process_image_from_url(image_url):
    # Download image from URL
    response = requests.get(image_url)
    image_array = np.asarray(bytearray(response.content), dtype=np.uint8)
    image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)

    # Resize image to 860x470
    image = cv2.resize(image, (860, 470))

    # Preprocess
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    blur = cv2.GaussianBlur(gray, (9, 9), 0)
    edged = cv2.Canny(blur, 50, 100)
    edged = cv2.dilate(edged, None, iterations=1)
    edged = cv2.erode(edged, None, iterations=1)

    cnts = cv2.findContours(edged.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    cnts = imutils.grab_contours(cnts)
    (cnts, _) = contours.sort_contours(cnts)
    cnts = [x for x in cnts if cv2.contourArea(x) > 100]

    if len(cnts) < 1:
        return []

    # Reference object: leftmost (assume it's a 2 rupee coin, diameter = 2.5 cm)
    ref_object = cnts[0]
    box = cv2.minAreaRect(ref_object)
    box = cv2.boxPoints(box)
    box = perspective.order_points(np.array(box, dtype="int"))
    (tl, tr, br, bl) = box
    dist_in_pixel = euclidean(tl, tr)
    pixel_per_cm = dist_in_pixel / 2

    results = []

    # Loop through contours to get dimensions
    for i, cnt in enumerate(cnts[1:], 1):  # skip reference
        box = cv2.minAreaRect(cnt)
        box = cv2.boxPoints(box)
        box = perspective.order_points(np.array(box, dtype="int"))
        (tl, tr, br, bl) = box

        width = euclidean(tl, tr) / pixel_per_cm
        height = euclidean(tr, br) / pixel_per_cm

        results.append({
            'object': f'Object {i}',
            'width_cm': round(width, 2),
            'height_cm': round(height, 2)
        })

    return results

@app.route('/measure', methods=['POST'])
def measure():
    data = request.get_json()
    image_url = data.get('image_url')

    if not image_url:
        return jsonify({'error': 'Image URL is required'}), 400

    try:
        measurements = process_image_from_url(image_url)
        return jsonify({'measurements': measurements})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
