# Puppet

## What is the "Puppet"?
遠隔で電子機器を操作するWebアプリケーション

## Set Up
### 開発環境
- Windows10 22H2
- VScode
- Arduino Leonado
- ラズベリーパイ

### 開発言語
- Python
    - Django Ver4.1.1
    - numpy Ver1.23.0
    - pySerial Ver3.5
    - opencv-python Ver4.6.0.66
- HTML, CSS
- JavaScript
    - jQuery Ver3.3.1
    - Chart.js Ver3.9.

#### Pythonの外部ライブラリのインストールコマンド
```
pip install django
pip install numpy
pip install pyserial
pip install opencv-python
```

## Usage
推奨端末：ノートパソコン、デスクトップパソコン

※それ以外の端末でも使えますが、UIが崩れる可能性があります。
### 1. 電子機器とカメラをサーバに接続する
サーバとなるデバイスに電子機器とカメラを接続してください。

※このアプリ単体では、「サーバ⇔Arudion（ラズベリーパイ）」とのシリアル通信ができます。

### 2. サーバの起動
manage.pyがある場所で下記のコマンドを実行してください
```
python manage.py runserver
```

### 3. URLにアクセスする
サーバの起動後、以下のような文字列が表示されます。「Starting development server at」の後に表示されるURLにアクセスしてください。
```
Watching for file changes with StatReloader
Performing system checks...

System check identified no issues (0 silenced).
December 22, 2022 - 08:09:29
Django version 4.1.1, using settings 'Puppet.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CTRL-BREAK.
```

### 4. 実験開始
実験を開始してください。