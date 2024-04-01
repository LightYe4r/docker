# 이미지 설정
FROM node:18 AS build

# 작업 디렉토리 설정
WORKDIR /app

# 소스 코드 복사
COPY . .

# 패키지 설치
RUN npm install

# Next.js 앱 빌드
RUN chmod +x /app/node_modules/.bin/next && npm run build

# Nginx 이미지 가져오기
FROM nginx:latest

# 커스텀 Nginx 설정 파일 복사
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 빌드한 Next.js 앱 복사
COPY --from=build /app/.next /usr/share/nginx/html

# 포트 5555 노출
EXPOSE 5555

# 컨테이너 실행 시 Nginx 시작
CMD ["nginx", "-g", "daemon off;"]
