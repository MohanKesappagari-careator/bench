import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateResourceInput {
  @Field({ nullable: true })
  firstname?: string;

  @Field({ nullable: true })
  middlename?: string;

  @Field({ nullable: true })
  lastname?: string;

  @Field({ nullable: true })
  skills?: string;

  @Field({ nullable: true })
  briefintro?: string;

  @Field({ nullable: true })
  personalemail?: string;

  @Field({ nullable: true })
  careatoremail?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  education?: string;

  @Field({ nullable: true })
  totalexperience?: string;

  @Field({ nullable: true })
  projectreleasedate?: string;

  @Field({ nullable: true })
  location?: string;

  @Field({ nullable: true })
  billrate?: string;

  @Field({ nullable: true })
  releasereason?: string;

  @Field({ nullable: true })
  statuscode?: string;

  @Field({ nullable: true })
  comments?: string;

  @Field({ nullable: true })
  resumeid?: number;

  @Field({ nullable: true })
  createdby?: string;

  @Field({ nullable: true })
  updatedby?: string;

  @Field({ nullable: true })
  isactive?: boolean;
}
