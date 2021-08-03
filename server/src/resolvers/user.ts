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
import JWT from "jsonwebtoken";
import { createAccessToken, sendRefreshToken } from "../utils/auth";
import config from "../config";
import { MyContext } from "../utils/types";
import { isAuth } from "../middlewares/isAuth";
import {
  getAuthPayload,
  getAuthUrl,
  googleAuthAction,
  scopes,
  setGoogleTokens,
  stateParams,
} from "../utils/googelApi";
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
  field: "Email" | "Password" | "Name" | "Google";

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

@InputType()
class GoogleAuthInput {
  @Field()
  state: string;

  @Field()
  code: string;
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
        return new AuthError({
          field: "Email",
          message: "Email already exists.",
        });
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
      authType: "password",
    });

    await User.insert(newUser);

    // jwt token
    const accessToken = createAccessToken(newUser);
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
    const user = await User.findByEmail(input.email);
    if (!user) {
      return new AuthError({
        field: "Email",
        message: "No account found.",
      });
    }

    if (user.authType != "password") {
      // authtype is google
      return new AuthError({
        field: "Password",
        message: "Please sign in with google.",
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

    // Refresh token
    sendRefreshToken(res, user);

    // return
    return new AuthPayload({
      id: user.id,
      name: user.name,
      email: user.email,
      accessToken: accessToken,
    });
  }

  @Query(() => String)
  getGoogleAuthUrl(@Arg("action") action: googleAuthAction) {
    return getAuthUrl(action, [scopes.email, scopes.profile]);
  }

  @Mutation(() => AuthResult)
  async googleAuth(
    @Ctx() { res }: MyContext,
    @Arg("input") input: GoogleAuthInput
  ) {
    console.log(input);

    // Check state
    let statePayload: stateParams;
    try {
      statePayload = JWT.verify(
        input.state,
        config.GOOGLE_STATE_SECRET
      ) as stateParams;

      if (!statePayload.action) {
        throw new Error("Invalid JWT - no action property");
      }
    } catch (err) {
      console.error(err);
      throw new AuthError({
        field: "Google",
        message: "Invalid Token",
      });
    }

    const tokens = await setGoogleTokens(input.code);
    if (!tokens || !tokens.id_token) {
      return new AuthError({
        field: "Google",
        message: "Token error",
      });
    }

    const payload = await getAuthPayload(tokens.id_token);
    if (!payload) {
      return new AuthError({
        field: "Google",
        message: "User payload error",
      });
    }

    // get from database
    let user = await User.findOne({ email: payload.email });

    // register or signin
    switch (statePayload.action) {
      case "signIn":
        if (!user) {
          return new AuthError({
            field: "Email",
            message: "No account found.",
          });
        }
        break;

      case "signUp":
        if (user) {
          return new AuthError({
            field: "Email",
            message: "User already exists.",
          });
        }

        if (!payload.email || !payload.name) {
          return new AuthError({
            field: "Google",
            message: "Google account cannot be used",
          });
        }

        user = User.create({
          name: payload.name,
          email: payload.email,
          authType: "google",
        });

        await User.insert(user);

        break;
    }

    // tokens
    const accessToken = createAccessToken(user);
    sendRefreshToken(res, user);

    // return
    return new AuthPayload({
      id: user.id,
      name: user.name,
      email: user.email,
      accessToken,
    });
  }
}
