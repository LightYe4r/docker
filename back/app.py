from datetime import datetime, date
import os
import time
import secrets
import pymysql.cursors # type: ignore
from flask import Flask, request, session, jsonify, redirect, url_for # type: ignore
from flask_cors import CORS, cross_origin # type: ignore


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}},
     headers={
         'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
         'Access-Control-Allow-Headers': 'origin, accept, accept-encoding, content-Type, X-Requested-With, authorization, Access-Control-Request-Method, Access-Control-Request-Headers',
         'Access-Control-Max-Age': '60',
         'Access-Control-Allow-Credentials': 'true',
         'Access-Control-Expose-Headers': 'Content-Length'
     }, supports_credentials=True)

app.secret_key = secrets.token_hex(16)


MYSQL_HOST = os.environ.get('MYSQL_HOST')

# Python이 실행될 때까지 대기
while True:
    try:
        db = pymysql.connect(host='192.168.56.101', # PUSH할때 MYSQL_HOST로 바꾸기
                             user='root',
                             password='docker',
                             db='docker',
                             cursorclass=pymysql.cursors.DictCursor)
        break
    except pymysql.err.OperationalError as e:
        print(e)
        time.sleep(10)


@app.route('/')
@cross_origin()
def home():
    return 'This is home!'

# 로그인
@app.route("/login", methods=["POST"])
@cross_origin()
def login():
    if request.method == 'POST':
        name = request.form['name']
        password = request.form['password']

        # 데이터베이스에서 사용자 정보 조회
        with db.cursor() as cursor:
            sql = "SELECT * FROM users WHERE name=%s AND password=%s"
            cursor.execute(sql, (name, password))
            user = cursor.fetchone()

        if user:
            session['user_id'] = user['id']
            session['username'] = user['name']
            return jsonify({'message': '로그인 성공', 'id': user['id'], 'name': user['name']}), 200
        else:
            return jsonify({'message': '아이디 또는 비밀번호가 잘못되었습니다.'}), 401

# 로그아웃    
# @app.route("/logout",  methods=['GET'])
# @cross_origin()
# def logout():
#     # 세션에서 사용자 정보 삭제
#     session.pop('user_id', None)
#     session.pop('username', None)
#     return jsonify({'message': '로그아웃 되었습니다.'}), 200

# 상태 확인
@app.route("/checkstatus", methods=["POST"])
@cross_origin()
def checkstatus():
    user_id = request.json.get('id') # 클라이언트에서 전달된 사용자 ID
    if user_id:
        with db.cursor() as cursor:
            sql = "SELECT name FROM users WHERE id = %s"
            cursor.execute(sql, (user_id,))
            user = cursor.fetchone()

        if user:
            name = request.json.get('name')
            date = datetime.now().date()
            
            # 오늘 날짜의 출석 기록 조회
            with db.cursor() as cursor:
                sql = "SELECT start_time FROM attendance WHERE name = %s AND date = %s"
                cursor.execute(sql, (name, date))
                attendance = cursor.fetchone()
            if attendance:
                start_time = attendance['start_time'].strftime("%Y-%m-%d %H:%M:%S")
                return jsonify({'message': '출석 기록이 있습니다.', 'start_time': start_time}), 200
            else:
                return jsonify({'message': '출석 기록이 없습니다.'}), 404
        else:
            return jsonify({'message': '사용자를 찾을 수 없습니다.'}), 404
    else:
        return jsonify({'message': '사용자 ID를 전달해야 합니다.'}), 400

# 출석 등록
@app.route("/checkin", methods=["POST"])
@cross_origin()
def checkin():
    user_id = request.json.get('id') # 클라이언트에서 전달된 사용자 ID
    if user_id:
        name = request.json.get('name')  # 클라이언트에서 전달된 사용자 이름
        date = datetime.now().date()
        start_time = datetime.now()
        
        with db.cursor() as cursor:
            sql = "INSERT INTO attendance (date, start_time, name) VALUES (%s, %s, %s)"
            cursor.execute(sql, (date, start_time, name))
            db.commit()
        return jsonify({'message': '출석 등록이 완료되었습니다.'}), 200
    else:
        return jsonify({'message': '로그인이 필요합니다.'}), 401

# 퇴근 등록
@app.route("/checkout", methods=["POST"])
@cross_origin()
def checkout():
    user_id = request.json.get('id')  # 클라이언트에서 전달된 사용자 ID
    if user_id:
        name = request.json.get('name')  # 클라이언트에서 전달된 사용자 이름
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

# 전체 출결 카운트 조회
@app.route('/attendance', methods=['POST'])
@cross_origin()
def get_attendance():
    user_id = request.json.get('id')  # 클라이언트에서 전달된 사용자 ID
    if user_id:
        with db.cursor() as cursor:
            sql = "SELECT name FROM users WHERE id = %s"
            cursor.execute(sql, (user_id,))
            user = cursor.fetchone()
            
        if user:
            name = request.json.get('name')

            # 로그인한 사용자의 출결 조회 쿼리 실행
            with db.cursor() as cursor:
                sql = """
                    SELECT 
                        SUM(CASE
                                WHEN start_time IS NULL OR end_time IS NULL OR TIMESTAMPDIFF(MINUTE, start_time, end_time) < 240 THEN 0 
                                ELSE CASE
                                        WHEN start_time > CAST(CONCAT(date, ' 09:10:00') AS DATETIME) THEN 1 
                                        ELSE 0 
                                    END
                            END) AS 지각,
                        SUM(CASE
                                WHEN start_time IS NULL OR end_time IS NULL OR TIMESTAMPDIFF(MINUTE, start_time, end_time) < 240 THEN 0 
                                ELSE CASE 
                                        WHEN start_time <= CAST(CONCAT(date, ' 09:10:00') AS DATETIME) AND end_time < CAST(CONCAT(date, ' 17:50:00') AS DATETIME) THEN 1 
                                        ELSE 0 
                                    END
                            END) AS 조퇴,
                        SUM(CASE
                                WHEN start_time IS NULL OR end_time IS NULL OR TIMESTAMPDIFF(MINUTE, start_time, end_time) < 240 THEN 0 
                                ELSE CASE 
                                        WHEN start_time <= CAST(CONCAT(date, ' 09:10:00') AS DATETIME) AND end_time >= CAST(CONCAT(date, ' 17:50:00') AS DATETIME) THEN 1 
                                        ELSE 0 
                                    END
                            END) AS 출석,
                        SUM(CASE
                                WHEN start_time IS NULL OR end_time IS NULL OR TIMESTAMPDIFF(MINUTE, start_time, end_time) < 240 THEN 1 
                                ELSE 0 
                            END) AS 결석
                    FROM attendance
                    WHERE name = %s;
                """
                cursor.execute(sql, (name,))
                result = cursor.fetchone()

            # 결과가 있으면 JSON 형태로 반환
            if result:
                return jsonify(result), 200
            else:
                return jsonify({'지각': 0, '조퇴': 0, '출석': 0, '결석': 0}), 404
        else:
            return jsonify({'message': '사용자를 찾을 수 없습니다.'}), 404
    else:
        return jsonify({'message': '로그인이 필요합니다.'}), 401

# 일자별 출결 조회
@app.route('/attendance/date', methods=['POST'])
@cross_origin()
def get_attendance_by_date():
    user_id = request.json.get('id')  # 클라이언트에서 전달된 사용자 ID
    if user_id:
        # 조회할 날짜
        date = request.json.get('date')

        # 사용자의 이름을 세션 ID를 사용하여 가져옴
        with db.cursor() as cursor:
            sql = "SELECT name FROM users WHERE id = %s"
            cursor.execute(sql, (user_id,))
            user = cursor.fetchone()
        
        if user:
            name = request.json.get('name')

            # 출결 조회 쿼리 실행
            with db.cursor() as cursor:
                sql = """
                    SELECT
                        start_time AS 출석시간,
                        end_time AS 퇴실시간,
                        SUM(CASE
                                WHEN start_time IS NULL OR end_time IS NULL OR TIMESTAMPDIFF(MINUTE, start_time, end_time) < 240 THEN 0 
                                ELSE CASE
                                        WHEN start_time > CAST(CONCAT(%s, ' 09:10:00') AS DATETIME) THEN 1 
                                        ELSE 0 
                                    END
                            END) AS 지각,
                        SUM(CASE
                                WHEN start_time IS NULL OR end_time IS NULL OR TIMESTAMPDIFF(MINUTE, start_time, end_time) < 240 THEN 0 
                                ELSE CASE 
                                        WHEN start_time <= CAST(CONCAT(%s, ' 09:10:00') AS DATETIME) AND end_time < CAST(CONCAT(%s, ' 17:50:00') AS DATETIME) THEN 1 
                                        ELSE 0 
                                    END
                            END) AS 조퇴,
                        SUM(CASE
                                WHEN start_time IS NULL OR end_time IS NULL OR TIMESTAMPDIFF(MINUTE, start_time, end_time) < 240 THEN 0 
                                ELSE CASE 
                                        WHEN start_time <= CAST(CONCAT(%s, ' 09:10:00') AS DATETIME) AND end_time >= CAST(CONCAT(%s, ' 17:50:00') AS DATETIME) THEN 1 
                                        ELSE 0 
                                    END
                            END) AS 출석,
                        SUM(CASE
                                WHEN start_time IS NULL OR end_time IS NULL OR TIMESTAMPDIFF(MINUTE, start_time, end_time) < 240 THEN 1 
                                ELSE 0 
                            END) AS 결석
                    FROM attendance
                    WHERE name = %s AND date = %s;
                """
                cursor.execute(sql, (date, date, date, date, date, name, date))
                result = cursor.fetchone()

            # 결과가 있으면 JSON 형태로 반환
            if result:
                return jsonify(result), 200
            else:
                return jsonify({'message': '해당 날짜에 대한 출결 기록이 없습니다.'}), 404
        else:
            return jsonify({'message': '사용자를 찾을 수 없습니다.'}), 404
    else:
        return jsonify({'message': '로그인이 필요합니다.'}), 401

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)