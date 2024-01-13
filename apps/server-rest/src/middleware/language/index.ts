import { NextFunction, Request, Response } from "express";

export const LanguageCtrl = () => {
  languageHeader: (req: Request, res: Response, next: NextFunction) => {
    next();
  };
  default_lang: async (req: Request, res: Response, next: NextFunction) => {
    next();
  };
};
