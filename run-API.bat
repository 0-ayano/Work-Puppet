@echo off
setlocal

pushd "%~dp0"
cd back
cd api
uvicorn main:app --reload
popd