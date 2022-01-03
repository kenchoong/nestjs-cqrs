interface webEnvType {
  API_URL: string;
}

const WEB_ENV: webEnvType = {
  API_URL: process.env.NEXT_PUBLIC_API_URL!,
};

const getEnvVars = () => {
  return WEB_ENV;
};

export default getEnvVars;
