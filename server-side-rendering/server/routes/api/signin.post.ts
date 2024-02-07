import { SESSION_COOKIE, createAppwriteClient } from "~/server/lib/appwrite";

export default defineEventHandler(async (event) => {
  const formData = await readFormData(event);

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { account } = createAppwriteClient(event);

  const session = await account.createEmailPasswordSession(email, password);

  setCookie(event, SESSION_COOKIE, session.secret, {
    expires: new Date(session.expire),
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  await sendRedirect(event, "/account");
});
