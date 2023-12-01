import { Request, Response, Router } from "express";
import { isAuth } from "../middleware/http-auth.ts";
import conversationService from "../services/conversationService.ts";

const router: Router = Router();

router.get("/conversations", isAuth, async (req: Request, res: Response) => {
  return await conversationService.getConversations(req, res);
});

export default router;
