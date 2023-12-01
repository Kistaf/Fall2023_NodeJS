import { Router, Request, Response } from "express";
import { isAuth } from "../middleware/http-auth.ts";
import messageService from "../services/messageService.ts";

const router: Router = Router();

router.post("/messages", isAuth, async (req: Request, res: Response) => {
  return messageService.saveMessage(req, res);
});

export default router;
