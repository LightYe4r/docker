## 가상 환경 생성
python -m venv venv

## 가상 환경 활성화
.\venv\Scripts\activate -> (venv)

## 패키지 설치
pip install -r requirements.txt

## 새로 패키지 설치 시 실행
pip freeze > requirements.txt

## 앱 실행
python app.py

## 가상 환경 종료
deactivate

## 도커파일 실행
docker build -t my-flask-app .
docker run -d -p 5000:5000 my-flask-app
