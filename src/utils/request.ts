import axios, { AxiosProxyConfig } from 'axios';
import { ENV } from '../config/env';

const proxyUrl =
    process.env.https_proxy ||
    process.env.HTTPS_PROXY ||
    process.env.http_proxy ||
    process.env.HTTP_PROXY;

let proxy: AxiosProxyConfig | false = false;

if (proxyUrl) {
    const url = new URL(proxyUrl);
    proxy = {
        host: url.hostname,
        port: Number(url.port),
        protocol: url.protocol.replace(':', ''),
    };
}

export const request = axios.create({
    proxy,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    },
});
