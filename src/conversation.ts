import { ChatGPTAPI, ChatGPTConversation } from 'chatgpt';
import { config } from 'dotenv';

config()

// store conversation
const memory = new Map<string, ChatGPTConversation>();

const api = new ChatGPTAPI({
  sessionToken: process.env.TOKEN!,
});

const check = () => {
  return api.ensureAuth();
};

/**
 * send message to chatGPT
 */
export const send = async (id: number | string, context: string) => {
  const sId = id.toString();
  let conversation = memory.get(sId);

  if (!conversation) {
    conversation = await create(sId);
  }

  return conversation.sendMessage(context, { timeoutMs: 2 * 60 * 1000 });
};


export const resetThread = async (id: number | string) => {
    memory.delete(id.toString())
}

/**
 * create a new conversation
 */
export const create = async (id: number | string) => {
  const sId = id.toString();
  const conversation = api.getConversation();
  await check();
  memory.set(sId, conversation);
  return conversation;
};