import { Field, ID, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
  Generated,
  OneToOne,
} from "typeorm";
import { Course } from "./Course";
import GoogleUser from "./GoogleUser";
import { Task } from "./Task";

type authType = "password" | "google";

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

  @Column({ nullable: true })
  password: string;

  @Column()
  @Generated("increment")
  refreshTokenVersion!: number;

  @Column()
  authType: authType;

  @OneToMany(() => Course, (course) => course.user)
  courses: Course[];

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  @OneToOne(() => GoogleUser, (googleUser) => googleUser.user)
  googleUser: GoogleUser;

  static findByEmail(email: string) {
    return User.findOne({ email });
  }
}
