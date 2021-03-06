import { ICreateCarDTO } from "@modules/cars/dtos/create-car-dto";
import { Car } from "@modules/cars/infra/typeorm/entities/car";

import { ICarsRepository } from "../cars-repository";

export class MemoryCarsRepository implements ICarsRepository {
  public readonly cars: Car[] = [];

  async create(data: ICreateCarDTO): Promise<Car> {
    const car = new Car();
    Object.assign(car, data);
    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(licensePlate: string): Promise<Car> {
    return this.cars.find((car) => car.licensePlate === licensePlate);
  }

  async findAvailable(
    categoryId?: string,
    name?: string,
    brand?: string
  ): Promise<Car[]> {
    return this.cars
      .filter((car) => car.available)
      .filter((car) => {
        return (
          (categoryId && car.categoryId === categoryId) ||
          (name && name === car.name) ||
          (brand && car.brand === brand)
        );
      });
  }
}
