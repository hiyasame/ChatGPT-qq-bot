import dotenv from "dotenv"
import { createClient, Platform } from "oicq"
import { send } from "./conversation"

dotenv.config()

const ID = parseInt(process.env.ID!)
const PASSWORD = process.env.PASSWORD!

const bot = createClient(ID, {
    platform: Platform.iPad
})

bot.on("system.login.slider", function (e) {
    console.log("输入ticket：")
    process.stdin.once("data", ticket => this.submitSlider(String(ticket).trim()))
}).login(PASSWORD)

bot.on("message.group", async function (event) {
    if (event.atme) {
        try {
            const msg = event.toString().replace(`{at:${this.uin}}`, "")
            const resp = await send(event.group_id, msg)
            event.reply(resp, true)
            console.log({ msg, resp })
        } catch (e) {
            event.reply(`异常: ${e}`)
            console.log(e)
        }
    }
})