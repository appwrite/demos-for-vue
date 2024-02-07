import { createAppwriteClient } from "../lib/appwrite";

export default defineEventHandler(async (event) => {
  const { account } = createAppwriteClient(event);

  try {
    const user = await account.get();
    event.context.user = user && user.$id ? user : undefined;
  } catch (error) {}
});
