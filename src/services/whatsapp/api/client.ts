import axios from 'axios';
import { whatsappConfig } from '../config';
import { DEFAULT_HEADERS } from '../constants';

export const whatsappClient = axios.create({
  baseURL: whatsappConfig.baseUrl,
  headers: {
    ...DEFAULT_HEADERS,
    'Token': whatsappConfig.token
  }
});