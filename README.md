# ChatGPT-qq-bot

基于 [oicq](https://github.com/takayama-lily/oicq) 和 [chatgpt-api](https://github.com/transitive-bullshit/chatgpt-api) 实现的人工智障QQ机器人

## usage

在项目的根目录编写.env文件来指定环境变量

~~~env
# QQ号
ID = "123456"
# 密码
PASSWORD = ""
# apiKey
TOKEN = "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..DDDnAl1YdPv4Ls-P.09IgO207SHZTtFG9iv1SgtUJFfgKabD83CZ1WGFbECDSUXd4fEj73suQag_1qO2P_H_4PBHmpVA2OIQ"
# md代码块语法高亮主题
HIGHLIGHT_STYLE = "github-dark"
~~~

或者手动指定也可

APIKey 请自行前往 OpenAI 官网获取

运行

~~~bash
yarn start
~~~

第一次运行会要求解决滑行验证，直接浏览器抓包拿到ticket即可

### docker

反正Dockerfile我写好了，写好.env文件后自行构建镜像，建议先运行一次把滑行验证解决再构建镜像。