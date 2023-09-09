import OpenAI from 'openai'
import config from "config";

const CHATGPT_MODAL = 'gpt-3.5-turbo'

const openai = new OpenAI({
    apiKey: config.get('OPENAI_KEY'), // defaults to process.env["OPENAI_API_KEY"]
});

const ROLES = {
    ASSISTANT: 'assistant',
    SYSTEM: 'system',
    USER: 'user'
}

const getMessage = (m) => `
напиши на основании этих тезисов последовательную эмоциональную историю: ${m}

эти тезисы с описанием ключевых моментов дня.
необходимо в итоге получить такую историю, чтобы я запомнил этот день и 
и смог в последствии рассказать ее друзьям. Главное максимальная краткость, правильная последовательность и эмоции.
`

export async function chatGPT(message = ''){
    const messages = [
        {
            role: ROLES.SYSTEM,
            content: 'Ты опытный копирайтер, который пишет очень краткие эмоциональные истории для соц. сетей.'
        },
        {
            role: ROLES.USER,
            content: getMessage(message)
        }
    ]

    try {
        const completion = await openai.chat.completions.create({
            messages,
            model: CHATGPT_MODAL,
        });

        return completion.choices[0].message
    } catch (e) {
        console.error('Error while chat completion', e?.message)
    }
}
