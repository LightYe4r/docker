## 가상 환경 생성
python -m venv venv

## 가상 환경 활성화
(정상적으로 활성화 시 가상환경 진입: (venv))
.\venv\Scripts\activate

## 패키지 설치
pip install -r requirements.txt

## 새로 패키지 설치 시 실행
pip freeze > requirements.txt

## 앱 실행
python app.py

## 가상 환경 종료
deactivate
