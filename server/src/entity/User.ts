import { Field, ID, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
  Generated,
} from "typeorm";
import { Task } from "./Task";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column()
  @Generated("increment")
  refreshTokenVersion!: number;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
