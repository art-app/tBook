import { Telegraf } from 'telegraf'
import { message } from "telegraf/filters";
import config from 'config'
import {chatGPT} from "./chatgpt.js";
import {create} from "./notion.js";
import {Loader} from "./loader.js";

const bot = new Telegraf(config.get("TELEGRAM_TOKEN"), {handlerTimeout: Infinity})

bot.command('start', ctx => {
    ctx.reply('Hello')
})

bot.on(message('text'), async ctx => {

    try {
        const text = ctx.message.text
        if(!text.trim()){
            return ctx.reply('Текст не может быть пустым')
        }

        const loader = new Loader(ctx)

        // loader.show()


        // const response = await chatGPT(text)
        //
        // if(!response){
        //     return ctx.reply('Ошибка API')
        // }

        const notionResponse = await create(text)

        if(notionResponse){
            ctx.answerCbQuery('Задача создана')
        }

        // ctx.reply(`${text} \n \n ${notionResponse.url}`)
        // ctx.reply(response.content)
    }catch (e) {
        console.error('error processing text', e?.message)
    }

})

bot.launch()
