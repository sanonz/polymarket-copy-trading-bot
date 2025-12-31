import { convert } from 'telegram-markdown-v2';
import { request } from './request';
import { ENV } from '../config/env';

export async function sendMessageToTelegram(text: string) {
    const api = ENV.TELEGRAM_API;
    const token = ENV.TELEGRAM_TOKEN;
    const chatId = ENV.TELEGRAM_CHAT_ID;

    if (!api || !token || !chatId) {
        return null;
    }

    const rsp = await request.post(`${api}/bot${token}/sendMessage`, {
        chat_id: chatId,
        text: convert(text),
        parse_mode: 'MarkdownV2',
    });

    return rsp;
}
