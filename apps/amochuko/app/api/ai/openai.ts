import { OPENAI } from '@/lib/config';
import OpenAI from 'openai';

export const openai = new OpenAI({ apiKey: OPENAI.API_KEY });
