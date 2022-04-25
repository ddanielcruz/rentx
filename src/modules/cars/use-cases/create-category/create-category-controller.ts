import { Request, Response } from "express";

import { CreateCategoryUseCase } from "./create-category-use-case";

class CreateCategoryController {
  constructor(private readonly useCase: CreateCategoryUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name, description } = request.body;
      const category = await this.useCase.execute({
        name,
        description,
      });

      return response.status(201).json(category);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export { CreateCategoryController };
