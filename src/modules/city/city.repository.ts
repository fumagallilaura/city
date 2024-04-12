import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/shared/modules/base/base.repository';
import { City } from './city.schema';

@Injectable()
export class CityRepository extends BaseRepository<City> {
  constructor(@InjectModel(City.name) model: Model<City>) {
    super(model);
  }

  async getCityByIndex(index: number): Promise<City> {
    const cities = await this.model.find().skip(index).limit(1).exec();
    return cities.at(0);
  }
}
