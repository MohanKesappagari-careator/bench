import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Resource {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstname: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  middlename: string;

  @Field()
  @Column()
  lastname: string;

  @Field()
  @Column()
  skills: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  briefintro: string;

  @Field()
  @Column()
  personalemail: string;

  @Field()
  @Column()
  careatoremail: string;

  @Field()
  @Column()
  phone: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  education: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  totalexperience: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  projectreleasedate: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  location: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  billrate: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  releasereason: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  statuscode: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  comments: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  resumeid: number;

  @Column({
    nullable: false,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdat: Date;

  @Field()
  @Column({
    nullable: false,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP()',
    onUpdate: 'CURRENT_TIMESTAMP()',
  })
  updatedat: Date;

  @Field({ nullable: true })
  @Column({ nullable: true, default: 'ac', length: 50 })
  createdby: string;

  @Field({ nullable: true })
  @Column({ nullable: true, default: 'ac', length: 50 })
  updatedby: string;

  @Field({ nullable: true })
  @Column({ nullable: false, default: true })
  isactive: boolean;
}
