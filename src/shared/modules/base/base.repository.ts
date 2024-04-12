import { NotFoundException } from '@nestjs/common';
import { FilterQuery, Model } from 'mongoose';
import { GetAllWhereInput } from './types/get-all.input';
import { GetAllOutput } from './types/get-all.output';

export class BaseRepository<T> {
  constructor(protected model: Model<T>) {}

  async create(item: T): Promise<T> {
    const domain = await this.model.create(item);
    await domain.save();
    return domain.toObject() as T;
  }

  async getAll({
    page,
    limit,
    where,
  }: GetAllWhereInput): Promise<GetAllOutput<T>> {
    const data = await this.model
      .find()
      .skip((page - 1) * limit)
      .limit(limit ?? Infinity)
      .where({ ...where });
    const totalItems = await this.model.where({ ...where }).countDocuments();
    return {
      data,
      page,
      limit,
      totalItems,
    };
  }

  async getById(id: string): Promise<T> {
    return await this.model.findById(id);
  }

  async getByFilter(filtro: object) {
    return await this.model.findOne(filtro);
  }

  async delete(id: string) {
    const filter = { _id: id } as FilterQuery<T>;
    const update = { deleted: true };
    const existingRecord = await this.model.findOneAndUpdate(filter, update);

    if (!existingRecord) {
      throw new NotFoundException(`Registro com ID ${id} não encontrado.`);
    }
  }
}
