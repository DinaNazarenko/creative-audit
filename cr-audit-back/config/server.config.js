import express from "express";
import cors from "cors";

export const serverConfig = (app) => {
  app.use(express.json());
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
};
