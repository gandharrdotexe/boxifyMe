from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
import requests
from scipy.spatial.distance import euclidean
from imutils import perspective, contours
import imutils
import os

app = Flask(__name__)
CORS(app)

# ✅ Make sure 'static' folder exists
os.makedirs("static", exist_ok=True)

def process_image_from_url(image_url):
    response = requests.get(image_url)
    image_array = np.asarray(bytearray(response.content), dtype=np.uint8)
    image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)

    image = cv2.resize(image, (860, 470))
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

    ref_object = cnts[0]
    box = cv2.minAreaRect(ref_object)
    box = cv2.boxPoints(box)
    box = perspective.order_points(np.array(box, dtype="int"))
    (tl, tr, br, bl) = box
    dist_in_pixel = euclidean(tl, tr)
    pixel_per_cm = dist_in_pixel / 2  

    results = []

    for i, cnt in enumerate(cnts[1:], 1):
        box = cv2.minAreaRect(cnt)
        box = cv2.boxPoints(box)
        box = perspective.order_points(np.array(box, dtype="int"))
        (tl, tr, br, bl) = box

        width = euclidean(tl, tr) / pixel_per_cm
        height = euclidean(tr, br) / pixel_per_cm

        cv2.drawContours(image, [box.astype("int")], -1, (0, 0, 255), 2)
        mid_pt_horizontal = (tl[0] + int(abs(tr[0] - tl[0]) / 2), tl[1] + int(abs(tr[1] - tl[1]) / 2))
        mid_pt_verticle = (tr[0] + int(abs(tr[0] - br[0]) / 2), tr[1] + int(abs(tr[1] - br[1]) / 2))

        cv2.putText(image, "{:.1f}cm".format(width), (int(mid_pt_horizontal[0] - 15), int(mid_pt_horizontal[1] - 10)),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 2)
        cv2.putText(image, "{:.1f}cm".format(height), (int(mid_pt_verticle[0] + 10), int(mid_pt_verticle[1])),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 2)

        results.append({
            'object': f'Object {i}',
            'width': round(width, 2),
            'length': round(height, 2)
        })

    # ✅ Save image
    output_path = "static/annotated_image.jpg"
    cv2.imwrite(output_path, image)

    return results


@app.route('/measure', methods=['POST'])
def measure():
    data = request.get_json()
    image_url = data.get('image_url')

    if not image_url:
        return jsonify({'error': 'Image URL is required'}), 400

    try:
        measurements = process_image_from_url(image_url)
        return jsonify({
            'measurements': measurements,
            'annotated_image_url': request.host_url + 'static/annotated_image.jpg'
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
