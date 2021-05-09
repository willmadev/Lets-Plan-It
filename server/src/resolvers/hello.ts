import { isAuth } from "../middlewares/isAuth";
import { Query, Resolver, UseMiddleware } from "type-graphql";

@Resolver()
export class HelloResolver {
  @Query(() => String)
  hello() {
    return "hello world";
  }

  @UseMiddleware(isAuth)
  @Query(() => String)
  testAuth() {
    return "authenticated";
  }
}
