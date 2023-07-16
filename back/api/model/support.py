import os
os.environ["OPENCV_VIDEOIO_MSMF_ENABLE_HW_TRANSFORMS"] = "0"

import cv2

"""
関数名：generate_video
引数　：数字
返り値：画像
説明　：指定した番号のカメラ画像の取得
"""
def generate_video(id = 0):
    capture = cv2.VideoCapture(id)
    while True:
        if not capture.isOpened():
            return
            # capture = cv2.VideoCapture(0)
        
        ret, frame = capture.read()
        if not ret:
            break
        
        ret, jpeg = cv2.imencode('.jpg', frame)
        byte_frame = jpeg.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + byte_frame + b'\r\n\r\n')
    capture.release()