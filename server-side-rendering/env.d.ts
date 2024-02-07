import type { Models } from "luke-node-appwrite-ssr";

declare module "h3" {
  interface H3EventContext {
    user?: Models.User<Models.Preferences>;
  }
}
