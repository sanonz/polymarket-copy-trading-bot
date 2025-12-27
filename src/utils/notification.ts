import { request } from './request';
import { ENV } from '../config/env';

export async function sendMessageToTelegram(text: string) {
    const api = ENV.TELEGRAM_API;
    const token = ENV.TELEGRAM_TOKEN;
    const chatId = ENV.TELEGRAM_CHAT_ID;

    if (!api || !token || !chatId) {
        return null;
    }

    const rsp = await request.post(`${api}bot${token}/sendMessage`, {
        chat_id: chatId,
        text,
        parse_mode: 'MarkdownV2',
    });

    return rsp;
}

export function addEscape(str: string) {
    return String(str).replace(
        /(\x21|\x23|[\x28-\x2B]|[\x2D-\x2E]|[\x3D-\x3E]|\x5B|\x5D|[\x5F-\x60]|[\x7B-\x7E])/g,
        (match) => '\\' + match
    );
}
