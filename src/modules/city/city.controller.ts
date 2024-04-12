import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/shared/modules/base/base.controller';
import { City } from './city.schema';
import { CityService } from './city.service';
import { GetDistanceDtoInput } from './dtos/get-distance.dto.input';

@ApiTags('City')
@Controller('v1/city')
export class CityController extends BaseController<City> {
  constructor(protected readonly service: CityService) {
    super(service);
  }

  @Post()
  async post(@Body() model: City): Promise<City> {
    return await this.service.create(model);
  }

  @Get('distance')
  async getDistance(@Query() query: GetDistanceDtoInput) {
    return this.service.getDistance(query);
  }
}
