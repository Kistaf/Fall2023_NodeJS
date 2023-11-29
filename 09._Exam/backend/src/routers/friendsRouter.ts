import { Router, Request, Response } from "express";
import friendsService from "../services/friendsService.ts";
import { isAuth } from "../middleware/http-auth.ts";

const router: Router = Router();

router.get("/friends", isAuth, (req: Request, res: Response) => {
  return friendsService.getFriends(req, res);
});

router.post("/friends", isAuth, async (req: Request, res: Response) => {
  return await friendsService.requestFriend(req, res);
});

export default router;
