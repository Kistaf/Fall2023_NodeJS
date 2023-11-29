declare global {
  namespace Express {
    export interface Request {
      userId: string;
    }
  }
  namespace NodeJS {
    export interface ProcessEnv {
      DATABASE_URL: string;
      ALLOWED_URL: string;
      PORT: string;
      REDIS_URL: string;
    }
  }
}

export {};
