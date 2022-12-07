import { ChatGPTAPI } from "chatgpt"
import dotenv from "dotenv"
import { createClient, Platform } from "oicq"

dotenv.config()

const ID = parseInt(process.env.ID!)
const PASSWORD = process.env.PASSWORD!
const api = new ChatGPTAPI({ sessionToken: process.env.TOKEN! })

const bot = createClient(ID, {
    platform: Platform.iPad
})

bot.on("system.login.slider", function (e) {
    console.log("输入ticket：")
    process.stdin.once("data", ticket => this.submitSlider(String(ticket).trim()))
}).login(PASSWORD)

bot.on("message.group", async function (event) {
    if (event.atme) {
        const msg = event.toString().replace(`{at:${this.uin}}`, "")
        const resp = await api.sendMessage(msg)
        event.reply(resp, true)
        console.log({ msg, resp })
    }
})