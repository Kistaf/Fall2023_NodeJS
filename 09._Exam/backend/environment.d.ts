declare global {
  namespace Express {
    export interface Request {
      userId?: string;
    }
  }
  namespace NodeJS {
    export interface ProcessEnv {
      ALLOWED_URL: string;
      PORT: string;
    }
  }
}

export {};
