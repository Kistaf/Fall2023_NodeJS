import { Request, Response, Router } from "express";
import { isAuth } from "../middleware/http-auth.ts";
import conversationService from "../services/conversationService.ts";

const router: Router = Router();

router.get("/conversations", isAuth, async (req: Request, res: Response) => {
  return await conversationService.getConversations(req, res);
});

router.get(
  "/conversations/:id",
  isAuth,
  async (req: Request, res: Response) => {
    return await conversationService.getConversation(req, res);
  }
);

router.post("/conversations", isAuth, async (req: Request, res: Response) => {
  return await conversationService.createConversation(req, res);
});

router.patch(
  "/conversations/:id",
  isAuth,
  async (req: Request, res: Response) => {
    return await conversationService.editConvName(req, res);
  }
);

export default router;
