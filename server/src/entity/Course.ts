import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Task } from "./Task";
import { User } from "./User";

@ObjectType()
@Entity()
export class Course extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: Number;

  @Field()
  @Column()
  courseName!: string;

  @Field(() => [Task], { nullable: true })
  @OneToMany(() => Task, (task) => task.user, { nullable: true })
  tasks: Task[];

  @ManyToOne(() => User, (user) => user.courses)
  user!: User;
}
