import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateResourceInput } from './dto/create-resource.input';
import { UpdateResourceInput } from './dto/update-resource.input';
import { Resource } from './entities/resource.entity';

@Injectable()
export class ResourcesService {
  constructor(
    @InjectRepository(Resource)
    private readonly resourceRepo: Repository<Resource>,
  ) {}
  create(createResourceInput: CreateResourceInput) {
    const CREATE = this.resourceRepo.create(createResourceInput);
    return this.resourceRepo.save(CREATE);
  }

  findAll() {
    return this.resourceRepo.find();
  }

  findOne(id: number) {
    return this.resourceRepo.findOne(id);
  }

  update(id: number, updateResourceInput: UpdateResourceInput) {
    const UPDATE = this.resourceRepo.create(updateResourceInput);
    return this.resourceRepo.update(id, UPDATE);
  }

  remove(id: number) {
    return this.resourceRepo.delete(id);
  }
  findACount() {
    return this.resourceRepo.count({
      where: {
        statuscode: 'A',
      },
    });
  }
  findVCount() {
    return this.resourceRepo.count({
      where: {
        statuscode: 'V',
      },
    });
  }
  findBCount() {
    return this.resourceRepo.count({
      where: {
        statuscode: 'B',
      },
    });
  }
  findLCount() {
    return this.resourceRepo.count({
      where: {
        statuscode: 'L',
      },
    });
  }
}
