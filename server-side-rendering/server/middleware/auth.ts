import { createSessionClient } from "../lib/appwrite";

export default defineEventHandler(async (event) => {
  const { account } = createSessionClient(event);

  try {
    event.context.user = await account.get();
  } catch {}
});
