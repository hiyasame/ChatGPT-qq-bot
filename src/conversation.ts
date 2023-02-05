import { ChatGPTAPI, ChatMessage } from 'chatgpt';
import { config } from 'dotenv';

config()

// store conversation
const memory = new Map<string, ChatMessage>();

const api = new ChatGPTAPI({
  apiKey: process.env.TOKEN!,
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