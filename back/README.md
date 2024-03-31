# 가상 환경 생성
python -m venv venv

# 가상 환경 활성화
.\venv\Scripts\activate
정상적으로 활성화 시 가상환경 진입: (venv)

# 패키지 설치 및 반환
pip install -r requirements.txt
pip freeze > requirements.txt

# 앱 실행
python app.py

# 가상 환경 종료
deactivate