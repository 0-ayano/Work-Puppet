from starlette.middleware.cors import CORSMiddleware # 追加
from fastapi.responses import StreamingResponse
from fastapi import FastAPI, Response

import serial
from serial.tools import list_ports

from model.support import *

app = FastAPI()

# CORSを回避するために追加（今回の肝）
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,   # 追記により追加
    allow_methods=["*"],      # 追記により追加
    allow_headers=["*"]       # 追記により追加
)

"""
関数名：video_feed
引数　：数字
返り値：画像
説明　：指定した番号のカメラのカメラストリーミング
"""
@app.get("/camera/{num}")
def video_feed(num:int = 0):
    return StreamingResponse(generate_video(num), media_type='multipart/x-mixed-replace; boundary=frame')


"""
関数名：serial_communication
引数　：命令
返り値：実行結果
説明　：任意のマイコンとシリアル通信を行う
"""

@app.get("/serial/{operation}/{num}")
def serial_communication(operation:int, num:int):
    device_port = []
    check_list = ["Arduino", "Raspberry", "ESP32"]
    for info in list_ports.comports():
        for item in check_list:
            if item in info.description:
                device_port.append(info.device)

    if len(device_port) != 0:
        with serial.Serial(device_port[0]) as ser:
            content = f"{operation};{num};"
            flag = bytes(content, 'utf-8')
            ser.write(flag)   # 入力した文字を送信

            ret = ser.readline()
            ser.close()
    
    else:
        ret = "--fail--"

    return ret