FROM node:19-alpine3.15

COPY ./ chatgpt-qq-bot/

WORKDIR /chatgpt-qq-bot

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD="true"

# 下载puppeteer所需依赖
RUN apk add --no-cache \
    udev \
    ttf-freefont \
    chromium

# 换源 & 下载依赖
RUN npm config set registry https://registry.npmmirror.com/ && npm install

CMD ["npm", "run", "start"]