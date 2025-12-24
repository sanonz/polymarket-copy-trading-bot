import axios from 'axios';
import { ENV } from '../config/env';

export const request = axios.create({
    proxy: {
        host: ENV.PROXY_HOST,
        port: ENV.PROXY_PORT,
        protocol: ENV.PROXY_PROTOCOL,
    },
});
