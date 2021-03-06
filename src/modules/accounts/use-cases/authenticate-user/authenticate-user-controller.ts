import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateUserUseCase } from "./authenticate-user-use-case";

export class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const useCase = container.resolve(AuthenticateUserUseCase);
    const session = await useCase.execute({ email, password });

    return response.json(session);
  }
}
