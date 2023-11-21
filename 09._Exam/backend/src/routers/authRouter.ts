import { Router, Request, Response } from "express";
import { authService } from "../services/authService.ts";
import { isAuth } from "../middleware/http-auth.ts";

const router: Router = Router();

router.get(
  "/auth/checkSession",
  isAuth,
  (request: Request, response: Response) => {
    return authService.checkSession(request, response);
  }
);

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
