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
  constructor({ field, message }: AuthError) {
    this.message = message;
    this.field = field;
  }
  @Field()
  field: "Email" | "Name" | "Password";

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
  async register(@Arg("input") input: RegisterInput) {
    // validate input
    console.log(input);

    // hash password
    const hashedPassword = await hash(input.password, SALT_ROUNDS ?? 10);

    // save user
    const newUser = User.create({
      name: input.name,
      email: input.email,
      password: hashedPassword,
    });
    try {
      await User.save(newUser);
    } catch (err) {
      if (err.code === "23505") {
        return new AuthError({
          field: "Email",
          message: "Email already exists",
        });
      }
      console.error(err);
      throw new Error("An error was encountered");
    }

    // jwt token
    const accessToken = createAccessToken(newUser);

    // TODO: Refresh token

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
  async login(@Arg("input") input: LoginInput, @Ctx() { res }: MyContext) {
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
