# 기본 이미지 설정
FROM node:18-alpine AS base

# 의존성 설치
WORKDIR /app
COPY package.json yarn.lock* ./
RUN yarn install --frozen-lockfile

# 소스 코드 복사 및 빌드
COPY . .
RUN yarn build

# 프로덕션을 위한 설정
FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=base /app/.next ./.next
COPY --from=base /app/public ./public
COPY --from=base /app/node_modules ./node_modules

# 사용자 및 권한 설정
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs \
    && chown nextjs:nodejs .next
USER nextjs

# 환경변수 및 포트 설정
ENV NODE_ENV production
EXPOSE 3000

# 실행 명령어
CMD ["node", ".next/server/pages/index.js"]
