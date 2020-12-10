import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfigJson from "tailwind.config.js";

export const IS_BROWSER = typeof window !== 'undefined';
export const SITE_NAME = process.env.SITE_NAME;

export const tailwindConfig = resolveConfig(
  tailwindConfigJson
) as {
  theme: Record<string, any>;
};
