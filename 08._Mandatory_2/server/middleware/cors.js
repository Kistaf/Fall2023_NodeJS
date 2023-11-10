import cors from "cors";

export const specificURLCORS = cors({
  origin: process.env.ALLOWED_URL,
  methods: ["GET", "POST"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
});
