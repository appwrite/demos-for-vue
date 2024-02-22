import { SESSION_COOKIE, createSessionClient } from "~/server/lib/appwrite";

export default defineEventHandler(async (event) => {
  const { account } = createSessionClient(event);

  await account.deleteSession("current");
  deleteCookie(event, SESSION_COOKIE);

  await sendRedirect(event, "/signin");
});
