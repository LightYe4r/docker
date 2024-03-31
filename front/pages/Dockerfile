# Node.js를 기반으로 하는 이미지 사용
FROM node:latest

# 작업 디렉토리 생성 및 설정
WORKDIR /app

# 소스 코드를 Docker 이미지로 복사
COPY . .

# 패키지 설치
RUN npm install

# 포트 설정
EXPOSE 5555

# 애플리케이션 실행
CMD ["npm", "start"]
