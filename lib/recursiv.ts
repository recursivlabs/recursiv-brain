import { Recursiv } from '@recursiv/sdk';

export const BASE_URL =
  process.env.EXPO_PUBLIC_RECURSIV_API_URL ||
  'https://api.recursiv.io/api/v1';

export const ORG_ID = process.env.EXPO_PUBLIC_RECURSIV_ORG_ID || '';
export const PROJECT_ID = process.env.EXPO_PUBLIC_RECURSIV_PROJECT_ID || '';

// The canonical Recursiv Brain agent. Pinned because the recursiv org has 100+
// agents and the old `agents.list({ limit: 50 })` lookup could miss it, then
// try to create a duplicate (username collision throws → grants fail). Always
// target this exact agent. Override via env if the agent is ever recreated.
export const BRAIN_AGENT_ID =
  process.env.EXPO_PUBLIC_BRAIN_AGENT_ID || '1b1f0da8-ea7f-4031-a91c-eed6d59c6ad4';

export function createAuthedSdk(apiKey: string): Recursiv {
  return new Recursiv({
    apiKey,
    baseUrl: BASE_URL,
    timeout: 120_000,
  });
}

// Anonymous SDK for sign-in (no API key needed)
export const anonSdk = new Recursiv({
  apiKey: 'anonymous',
  baseUrl: BASE_URL,
  timeout: 30_000,
} as any);
