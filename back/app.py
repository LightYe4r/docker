from flask import Flask, request, session, jsonify
from datetime import datetime, timedelta, timezone
import pymysql.cursors

app = Flask(__name__)
app.secret_key = 'your_secret_key'

db = pymysql.connect(host='127.0.0.1',
                       user='root',
                       password='root',
                       db='acs_db',
                       charset='utf8',
                       cursorclass=pymysql.cursors.DictCursor)

@app.route('/')
def home():
    return 'This is home!'

@app.route("/login", methods=["POST"])
def login():
    if request.method == 'POST':
        name = request.form['name']
        password = request.form['password']

        # 데이터베이스에서 사용자 정보 조회
        with db.cursor() as cursor:
            sql = "SELECT * FROM users WHERE name=%s AND password=%s"
            cursor.execute(sql, (name, password))
            user = cursor.fetchone()

        if user: # 로그인 성공
            session['user_id'] = user['id']
            session['username'] = user['name']
            return jsonify({'message': '로그인 성공', 'user': user}), 200
        else:
            return jsonify({'message': '아이디 또는 비밀번호가 잘못되었습니다.'}), 401
    
@app.route("/logout",  methods=['GET'])
def logout():
    # 세션에서 사용자 정보 삭제
    session.pop('user_id', None)
    session.pop('username', None)
    
    return jsonify({'message': '로그아웃 되었습니다.'}), 200
    
@app.route("/checkin", methods=["POST"])
def checkin():
    if 'user_id' in session:
        name = session['username']
        date = datetime.now().date()
        start_time = datetime.now()

        # 출석 데이터 추가
        with db.cursor() as cursor:
            sql = "INSERT INTO attendance (date, start_time, name) VALUES (%s, %s, %s)"
            cursor.execute(sql, (date, start_time, name))
            db.commit()
        return jsonify({'message': '출석 등록이 완료되었습니다.'}), 200
    else:
        return jsonify({'message': '로그인이 필요합니다.'}), 401

@app.route("/checkout", methods=["POST"])
def checkout():
    if 'user_id' in session:
        name = session['username']
        end_time = datetime.now()

        # 해당 사용자의 최신 출석 기록을 가져옴
        with db.cursor() as cursor:
            sql = "SELECT * FROM attendance WHERE name = %s ORDER BY id DESC LIMIT 1"
            cursor.execute(sql, (name,))
            attendance = cursor.fetchone()

        if attendance:
            # 출석 기록 업데이트
            with db.cursor() as cursor:
                sql = "UPDATE attendance SET end_time = %s WHERE id = %s"
                cursor.execute(sql, (end_time, attendance['id']))
                db.commit()
            return jsonify({'message': '퇴근 등록이 완료되었습니다.'}), 200
        else:
            return jsonify({'message': '출석을 먼저 등록해야 합니다.'}), 400
    else:
        return jsonify({'message': '로그인이 필요합니다.'}), 401

#@app.route('/attendance', methods=['GET'])
#def get_attendance():

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)