import type { Request, Response } from "express";
import { Router } from "express";
import { authService } from "../services/authService.ts";
import { isAuth } from "../middleware/http-auth.ts";

const router: Router = Router();

router.get("/auth/checkSession", isAuth, (_, response: Response) => {
  response.send("Authorized");
});

router.post(
  "/auth/sessionLogin",
  async (request: Request, response: Response) => {
    return authService.sessionLogin(request, response);
  }
);

router.post(
  "/auth/sessionLogout",
  isAuth,
  async (request: Request, response: Response) => {
    return authService.sessionLogout(request, response);
  }
);

export default router;
