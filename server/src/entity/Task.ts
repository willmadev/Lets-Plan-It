import { Field, ID, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
} from "typeorm";
import { Course } from "./Course";
import { User } from "./User";

@ObjectType()
@Entity()
export class Task extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  title!: string;

  @Field(() => Course)
  @ManyToOne(() => Course, (course) => course.tasks)
  course!: Course;

  @Field({ nullable: true })
  @Column({ type: "text", nullable: true })
  description: string;

  @Field({ defaultValue: false })
  @Column()
  completed: boolean;

  @Field(() => String)
  @Column()
  due!: Date;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}
