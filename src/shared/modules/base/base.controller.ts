import { Delete, Get, Param, Query } from '@nestjs/common';
import { BaseService } from './base.service';
import { GetAllDtoInput } from './dtos/get-all.dto.input';
import { GetAllDtoOutput } from './dtos/get-all.dto.output';

export class BaseController<T, DTO = T> {
  constructor(protected readonly service: BaseService<T, DTO>) {}

  @Get()
  public async getAll(
    @Query() query: GetAllDtoInput,
  ): Promise<GetAllDtoOutput<T>> {
    return await this.service.getAll(query);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<T> {
    return await this.service.getById(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.service.delete(id);
  }
}
