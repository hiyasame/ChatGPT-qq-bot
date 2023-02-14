import { ChatGPTAPI, ChatMessage } from 'chatgpt';
import { config } from 'dotenv';

config()

// store conversation
const memory = new Map<string, ChatMessage>();

const api = new ChatGPTAPI({
  apiKey: process.env.TOKEN!,
  apiReverseProxyUrl: 'https://chatgpt.pawan.krd/api/completions',
  completionParams: {
    // override this depending on the ChatGPT model you want to use
    // NOTE: if you are on a paid plan, you can't use the free model and vice-versa
    // model: 'text-davinci-002-render' // free, default model
    model: 'text-davinci-002-render-paid' // paid, default model
    // model: 'text-davinci-002-render-sha' // paid, turbo model
  },
  debug: false
});

/**
 * send message to chatGPT
 */
export const send = async (id: number | string, context: string) => {
  const sId = id.toString();
  let lastConversation = memory.get(sId);

  let res = await api.sendMessage(context, { 
    timeoutMs: 2 * 60 * 1000,
    conversationId: lastConversation?.conversationId,
    parentMessageId: lastConversation?.id
   });

   memory.set(sId, res)

  return res;
};


export const resetThread = async (id: number | string) => {
    memory.delete(id.toString())
}