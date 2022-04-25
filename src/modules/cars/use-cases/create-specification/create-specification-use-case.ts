import { inject, injectable } from "tsyringe";

import { Specification } from "../../entities/specification";
import { ISpecificationsRepository } from "../../repositories/specifications-repository";

interface IRequest {
  name: string;
  description: string;
}
@injectable()
export class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private readonly repository: ISpecificationsRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<Specification> {
    const alreadyExists = await this.repository.findByName(name);
    if (alreadyExists) {
      throw new Error("Specification already exists.");
    }

    return this.repository.create({ name, description });
  }
}
