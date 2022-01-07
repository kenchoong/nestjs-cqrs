interface webEnvType {
  API_URL: string;
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string;
}

const WEB_ENV: webEnvType = {
  API_URL: process.env.NEXT_PUBLIC_API_URL!,
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
};

const getEnvVars = () => {
  return WEB_ENV;
};

export default getEnvVars;
