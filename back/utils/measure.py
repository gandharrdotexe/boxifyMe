import cv2
import numpy as np
import requests
from io import BytesIO
from scipy.spatial.distance import euclidean
from imutils import perspective, contours
import imutils

def measure_from_url(image_url):
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

    if not cnts:
        return {"error": "No valid contours found."}

    ref_object = cnts[0]
    box = cv2.minAreaRect(ref_object)
    box = cv2.boxPoints(box)
    box = np.array(box, dtype="int")
    box = perspective.order_points(box)
    (tl, tr, br, bl) = box
    pixel_per_cm = euclidean(tl, tr) / 2.5  # 2.5 cm diameter of 2 INR coin

    measurements = []
    for i, cnt in enumerate(cnts):
        box = cv2.minAreaRect(cnt)
        box = cv2.boxPoints(box)
        box = np.array(box, dtype="int")
        box = perspective.order_points(box)
        (tl, tr, br, bl) = box

        width = euclidean(tl, tr) / pixel_per_cm
        height = euclidean(tr, br) / pixel_per_cm

        measurements.append({
            "object": i + 1,
            "width_cm": round(width, 2),
            "height_cm": round(height, 2)
        })

    return {"measurements": measurements}
