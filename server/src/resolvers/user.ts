import { User } from "../entity/User";
import {
  Arg,
  createUnionType,
  Ctx,
  Field,
  ID,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { hash, compare } from "bcrypt";
import { createAccessToken, sendRefreshToken } from "../utils/auth";
import config from "../config";
import { MyContext } from "../utils/types";
import { isAuth } from "../middlewares/isAuth";

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

  @Field(() => ID)
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
  constructor({ field, message }: AuthError) {
    this.field = field;
    this.message = message;
  }
  @Field()
  field: "Email" | "Password" | "Name";

  @Field()
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
  @UseMiddleware(isAuth)
  @Query(() => User)
  async getUser(@Ctx() { user }: MyContext) {
    return user;
  }

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
          field: "Email",
          message: "Email already exists.",
        });
        return error;
      }
    } catch (err) {
      console.error(err);
      throw new Error("Database Lookup Error");
    }

    // hash password
    const hashedPassword = await hash(input.password, config.SALT_ROUNDS ?? 10);

    // save user
    const newUser = User.create({
      name: input.name,
      email: input.email,
      password: hashedPassword,
    });

    await User.insert(newUser);

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
        field: "Email",
        message: "No account found.",
      });
    }

    // check password
    if (!(await compare(input.password, user.password))) {
      return new AuthError({
        field: "Password",
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
