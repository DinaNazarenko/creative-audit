import express from "express";
import cors from "cors";

export const serverConfig = (app) => {
  app.use(express.json());
  app.use(
    cors({
      origin: ["https://cr-audit-front.vercel.app"],
      methods: ["POST", "GET"],
      credentials: true,
    })
  );
  app.use(express.urlencoded({ extended: true }));
};
