import { SESSION_COOKIE, createAppwriteClient } from "~/server/lib/appwrite";

export default defineEventHandler(async (event) => {
  const { account } = createAppwriteClient(event);

  await account.deleteSession("current");
  deleteCookie(event, SESSION_COOKIE);

  await sendRedirect(event, "/signin");
});
