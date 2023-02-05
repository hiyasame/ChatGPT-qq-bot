import dotenv from "dotenv"
import { createClient, Platform, segment } from "oicq"
import { resetThread, send } from "./conversation"
import renderMarkdown from "./md-render"

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
            if (msg.includes("reset thread")) {
                resetThread(event.group_id)
                event.reply("时间线已重置", true)
                return
            }
            const resp = (await send(event.group_id, msg)).text
            // 包含代码就渲染到图片上
            if (resp.includes("```")) {
                const respImage = segment.image(await renderMarkdown(resp))
                event.reply(respImage, true)
            } else {
                event.reply(resp, true)
            }
            console.log({ msg, resp })
        } catch (e) {
            event.reply(`异常: ${e}`, true)
            console.log(e)
        }
    }
})