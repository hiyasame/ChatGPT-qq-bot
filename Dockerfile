FROM node:19-alpine3.15

COPY ./ chatgpt-qq-bot/

WORKDIR /chatgpt-qq-bot

# 换源 & 下载依赖
RUN npm config set registry https://registry.npmmirror.com/ && npm install

CMD ["npm", "run", "start"]