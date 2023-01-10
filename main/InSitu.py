import serial
from serial.tools import list_ports

def Arduino(p):
    ports=list_ports.comports()
    device=[info for info in ports if "Arduino" in info.description]

    if len(device) == 0:
        return 0

    # print("COM Port : ",device[0].device)

    with serial.Serial(device[0].device) as ser:
        flag = bytes(p, 'utf-8')
        ser.write(flag)   # 入力した文字を送信

        val_arduino = ser.readline()
        val_decoded = ( float(repr(val_arduino.decode())[1:-5]) - 4 ) * 10
        ser.close()
    
    return val_decoded