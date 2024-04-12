import { BaseRepository } from './base.repository';
import { GetAllInput } from './types/get-all.input';
import { GetAllOutput } from './types/get-all.output';

export class BaseService<T, DTO = T> {
  constructor(protected readonly repository: BaseRepository<T>) {}

  async create(item: DTO): Promise<T> {
    const domain: T = { ...item } as unknown as T;
    return await this.repository.create(domain);
  }

  async getAll({ page, limit }: GetAllInput): Promise<GetAllOutput<T>> {
    return this.repository.getAll({ page, limit });
  }

  async getById(id: string): Promise<T> {
    return await this.repository.getById(id);
  }

  async getByFilter(filtro: object) {
    return await this.repository.getByFilter(filtro);
  }

  async delete(id: string) {
    await this.repository.delete(id);
  }
}
