import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as seedrandom from 'seedrandom';
import { BaseService } from 'src/shared/modules/base/base.service';
import { CityRepository } from './city.repository';
import { City } from './city.schema';
import { GetDistanceDtoInput } from './dtos/get-distance.dto.input';

@Injectable()
export class CityService extends BaseService<City> {
  constructor(protected readonly repository: CityRepository) {
    super(repository);
  }

  async getDistance(query: GetDistanceDtoInput) {
    const city1 = await this.getCityofDay();
    const city2 = await this.getCityByName(query.city);

    const radius = 6371;
    const dLat = this.grausParaRadianos(
      city1.position.lat - city2.position.lat,
    );
    const dLon = this.grausParaRadianos(
      city1.position.lon - city2.position.lon,
    );

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.grausParaRadianos(city1.position.lat)) *
        Math.cos(this.grausParaRadianos(city2.position.lat)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distancia = radius * c; // Distância em quilômetros

    return Math.floor(distancia);
  }

  private grausParaRadianos(graus: number) {
    return (graus * Math.PI) / 180;
  }

  private async getCity(id: string) {
    const city = await this.repository.getById(id);
    if (!city)
      throw new HttpException(
        `Not found city by Id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    return city;
  }

  private async getCityByName(name: string) {
    const city = await this.repository.getByFilter({ name });
    if (!city)
      throw new HttpException(
        `Not found city by Name ${name}`,
        HttpStatus.NOT_FOUND,
      );
    return city;
  }

  private async getCityofDay() {
    const midnight = new Date();
    midnight.setHours(0, 0, 0, 0);
    const rng = seedrandom(midnight.toString());
    const index = Math.floor(rng() * 5272);
    return await this.repository.getCityByIndex(index);
  }
}
