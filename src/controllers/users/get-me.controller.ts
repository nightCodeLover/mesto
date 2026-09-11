import type { Request, Response } from "express";
import { User } from "../../models";
import { userErrors } from "../../errors";

export const getMeController = (req: Request, res: Response) => {
  if (req.user?._id) {
    const user = User.findById(req.user._id);

    if (!user) {
      const { code, message } = userErrors.noUser;

      res.status(code).send({ message });

      return;
    }

    res.send(user);
  }
};
