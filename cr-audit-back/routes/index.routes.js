import { Router } from "express";
import { sendApiRoute } from "./api/send.routes.js";

export const router = new Router();

router.use("/api", sendApiRoute);
