import type { Request, Response } from "express";

type LoginRequestBody = {
  email: string;
  password: string;
};

export const loginController = async (
  _req: Request<Record<string, unknown>, unknown, LoginRequestBody>,
  _res: Response,
) => {};
