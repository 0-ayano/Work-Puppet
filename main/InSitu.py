import serial
import time
from serial.tools import list_ports
from django.http import JsonResponse

def serialStart(request):
    msg = "ON"
    ports=list_ports.comports()
    device=[info for info in ports if "Arduino" in info.description]
    if len(device) != 0:
        msg = "OFF"

    print("\n\nHERE\n\n")
    d = {
        'input' : "1",
        'msg'   : msg,
        "data"  : device[0].device,
    }

    return JsonResponse(d)

def serialEnd(request):
    msg = "ON"
    ports=list_ports.comports()
    device=[info for info in ports if "Arduino" in info.description]
    if len(device) != 0:
        ser = serial.Serial(device[0].device)
        flag = bytes("0;0;", 'utf-8')
        ser.write(flag)
        ser.close()

    print("\n\nHAPPY\n\n")

    d = {
        'input' : "0",
        'msg'   : msg,
        "data"  : device[0].device,
    }

    return JsonResponse(d)

def serialMain(ser, operation, value):
    ports=list_ports.comports()
    device=[info for info in ports if "Arduino" in info.description]
    if len(device) == 0:
        return 0

    ser = serial.Serial(device[0].device)

    resultMain = []
    resultSetting = []

    maxValue = 255
    minValue = 0
    sec      = 100
    width    = 5
    tempo    = sec/1000
    for i in range( len(operation)):
        if (operation[i] == "0"):
            flag = bytes("0;0;", 'utf-8')
            ser.write(flag)

        elif (operation[i] == "1"):
            maxValue = int(value[i])

        elif (operation[i] == "2"):
            minValue = int(value[i])

        elif (operation[i] == "3"):
            width = int(value[i])

        elif (operation[i] == "4"):
            sec = int(value[i])
            tempo    = sec/1000

        elif (operation[i] == "10"):
            resultSetting.append( value[i] )
            form = "10;{};".format(value[i])
            flag = bytes(form, 'utf-8')
            ser.write(flag)
            time.sleep(tempo)
            flag = bytes("0;1;", 'utf-8')
            ser.write(flag)
            val_arduino = ser.readline()
            resultMain.append( float(val_arduino.decode()) )

        elif (operation[i] == "20"):
            for box in range(minValue, int(value[i])+1, width):
                resultSetting.append( box )
                form = "10;{};".format(box)
                flag = bytes(form, 'utf-8')
                ser.write(flag)
                time.sleep(tempo)
                flag = bytes("0;1;", 'utf-8')
                ser.write(flag)
                val_arduino = ser.readline()
                resultMain.append( float(val_arduino.decode()) )

            for box in range(int(value[i]), minValue-1, -width):
                resultSetting.append( box )
                form = "10;{};".format(box)
                flag = bytes(form, 'utf-8')
                ser.write(flag)
                time.sleep(tempo)
                flag = bytes("0;1;", 'utf-8')
                ser.write(flag)
                val_arduino = ser.readline()
                resultMain.append( float(val_arduino.decode()) )
    
    result = [resultMain, resultSetting]    
    return result

"""
def Arduino(operation, value):
    ports=list_ports.comports()
    device=[info for info in ports if "Arduino" in info.description]

    if len(device) == 0:
        return 0

    # print("COM Port : ",device[0].device)

    with serial.Serial(device[0].device) as ser:
        resultMain = []
        resultSetting = []

        maxValue = 255
        minValue = 0
        sec      = 100
        width    = 5
        tempo    = sec/1000
        for i in range( len(operation)):
            if (operation[i] == "0"):
                flag = bytes("0;0;", 'utf-8')
                ser.write(flag)

            elif (operation[i] == "1"):
                maxValue = int(value[i])

            elif (operation[i] == "2"):
                minValue = int(value[i])

            elif (operation[i] == "3"):
                width = int(value[i])

            elif (operation[i] == "4"):
                sec = int(value[i])
                tempo    = sec/1000

            elif (operation[i] == "10"):
                resultSetting.append( value[i] )
                form = "10;{};".format(value[i])
                flag = bytes(form, 'utf-8')
                ser.write(flag)
                time.sleep(tempo)
                flag = bytes("0;1;", 'utf-8')
                ser.write(flag)
                val_arduino = ser.readline()
                resultMain.append( float(val_arduino.decode()) )

            elif (operation[i] == "20"):
                for box in range(minValue, int(value[i])+1, width):
                    resultSetting.append( box )
                    form = "10;{};".format(box)
                    flag = bytes(form, 'utf-8')
                    ser.write(flag)
                    time.sleep(tempo)
                    flag = bytes("0;1;", 'utf-8')
                    ser.write(flag)
                    val_arduino = ser.readline()
                    resultMain.append( float(val_arduino.decode()) )

                for box in range(int(value[i]), minValue-1, -width):
                    resultSetting.append( box )
                    form = "10;{};".format(box)
                    flag = bytes(form, 'utf-8')
                    ser.write(flag)
                    time.sleep(tempo)
                    flag = bytes("0;1;", 'utf-8')
                    ser.write(flag)
                    val_arduino = ser.readline()
                    resultMain.append( float(val_arduino.decode()) )
        ser.close()

    result = [resultMain, resultSetting]    
    return result
"""