import { User } from "../entity/User";
import {
  Arg,
  createUnionType,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Resolver,
} from "type-graphql";
import { hash, compare } from "bcrypt";
import { createAccessToken, sendRefreshToken } from "../helpers/auth";
import { SALT_ROUNDS } from "../helpers/env";
import { MyContext } from "src/helpers/types";

@InputType()
class RegisterInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

const AuthResult = createUnionType({
  name: "AuthResult",
  types: () => [AuthPayload, AuthError] as const,
});

@ObjectType()
class AuthPayload {
  constructor({ id, email, name, accessToken }: AuthPayload) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.accessToken = accessToken;
  }

  @Field()
  id!: Number;

  @Field()
  email!: String;

  @Field()
  name!: String;

  @Field()
  accessToken!: String;
}

@ObjectType()
class AuthError {
  constructor({ message }: AuthError) {
    this.message = message;
  }
  @Field({ nullable: false })
  message: String;
}

@InputType()
class LoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

@Resolver()
export class UserResolver {
  @Mutation(() => AuthResult)
  async register(
    @Ctx() { res }: MyContext,
    @Arg("input") input: RegisterInput
  ) {
    // validate input
    console.log(input);

    // check if exists
    try {
      const existingUser = await User.findOne({ email: input.email });
      console.log(existingUser);
      if (existingUser) {
        const error = new AuthError({
          message: "Email already exists.",
        });
        return error;
      }
    } catch (err) {
      console.error(err);
      throw new Error("Database Lookup Error");
    }

    // hash password
    const hashedPassword = await hash(input.password, SALT_ROUNDS ?? 10);

    // save user
    const newUser = User.create({
      name: input.name,
      email: input.email,
      password: hashedPassword,
    });

    await User.save(newUser);

    // jwt token
    const accessToken = createAccessToken(newUser);

    // TODO: Refresh token
    sendRefreshToken(res, newUser);

    // Return payload
    const payload = new AuthPayload({
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      accessToken: accessToken,
    });

    console.log(typeof payload);
    return payload;
  }

  @Mutation(() => AuthResult)
  async login(@Ctx() { res }: MyContext, @Arg("input") input: LoginInput) {
    // validate input
    console.log(input);

    // get from database
    const user = await User.findOne({ email: input.email });
    if (!user) {
      return new AuthError({
        message: "No account found.",
      });
    }

    // check password
    if (!(await compare(input.password, user.password))) {
      return new AuthError({
        message: "Incorrect Password.",
      });
    }

    // jwt token
    const accessToken = createAccessToken(user);

    // TODO: Refresh token
    sendRefreshToken(res, user);

    // return
    return new AuthPayload({
      id: user.id,
      name: user.name,
      email: user.email,
      accessToken: accessToken,
    });
  }
}
