import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resource } from './entities/resource.entity';
import { ResourcesResolver } from './resources.resolver';
import { ResourcesService } from './resources.service';

@Module({
  imports: [TypeOrmModule.forFeature([Resource])],
  providers: [ResourcesResolver, ResourcesService],
})
export class ResourcesModule {}
