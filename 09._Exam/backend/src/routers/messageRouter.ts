import { Router, Request, Response } from "express";
import { isAuth } from "../middleware/http-auth.ts";
import messageService from "../services/messageService.ts";

const router: Router = Router();

router.get("/messages/:chatId", isAuth, async (req: Request, res: Response) => {
  return messageService.getMessagesByChatId(req, res);
});

export default router;
