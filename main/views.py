import os
os.environ["OPENCV_VIDEOIO_MSMF_ENABLE_HW_TRANSFORMS"] = "0"
import cv2
import serial
import time
from serial.tools import list_ports
from django.http import StreamingHttpResponse
from django.http import JsonResponse
from django.shortcuts import render

from .InSitu import *

def index(request):
    return render(request, 'index.html')

def miniWindow(request):
    return render(request, 'mini.html')

def video_feed_view(id = 0):
    return lambda _: StreamingHttpResponse(generate_frame(id), content_type='multipart/x-mixed-replace; boundary=frame')  

def generate_frame(id = 0):
    capture = cv2.VideoCapture(id)
    while True:
        if not capture.isOpened():
            capture = cv2.VideoCapture(0)
        ret, frame = capture.read()
        if not ret:
            break
        ret, jpeg = cv2.imencode('.jpg', frame)
        byte_frame = jpeg.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + byte_frame + b'\r\n\r\n')
    capture.release()

def ajaxPost(request):
    inputOperation = request.POST.getlist('InputOperation[]')
    inputValue = request.POST.getlist('InputValue[]')

    resultMain, resultSetting = serialMain( request.session.get('ser'), inputOperation, inputValue )

    d = {
        'input' : resultSetting,
        'result': resultMain,
    }

    return JsonResponse(d)