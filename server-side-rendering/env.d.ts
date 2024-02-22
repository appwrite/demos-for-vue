import type { Models } from "node-appwrite";

declare module "h3" {
  interface H3EventContext {
    user?: Models.User<Models.Preferences>;
  }
}
