import getConfig from 'next/config';
import { createClient } from '@supabase/supabase-js';

const { serverRuntimeConfig } = getConfig();

const CookieStorage = (() => {
  const getAll = () => document.cookie.split(';');

  const setItem = (name, val, exdays = 365) => {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${val};expires=${d.toUTCString()};path=/`;
  };

  const removeItem = (name) => setItem(name, '', -30);

  const clear = () => getAll().forEach(c => removeItem(c.split('=')?.[0] ?? ''));

  const getItem = (name) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match?.[2] ?? '';
  }

  return {
    get length() {
      return getAll().length;
    },
    key: (key) => getAll()?.[key] ?? null,
    clear,
    getItem,
    setItem,
    removeItem,
  }
})();

export const supabase = (() => {
  let publicClient: ReturnType<typeof createClient> = null;
  let privateClient: ReturnType<typeof createClient> = null;

  return {
    get public() {
      if (!publicClient) {
        publicClient = createClient(
          process.env.SUPABASE_API_URL,
          process.env.SUPABASE_CLIENT_KEY,
          { autoRefreshToken: true, localStorage: CookieStorage }
        );
      }
      return publicClient;
    },
    get private() {
      if (!serverRuntimeConfig.SUPABASE_SERVICE_KEY) {
        throw new Error('No service key, maybe you are not in server mode?')
      }

      if (!privateClient) privateClient = createClient(
        process.env.SUPABASE_API_URL,
        serverRuntimeConfig.SUPABASE_SERVICE_KEY
      );
      return privateClient;
    }
  };
})();
