import { createAdminClient } from "~/server/lib/appwrite";

export default defineEventHandler(async (event) => {
  const { account } = createAdminClient();

  if (event.method == "POST") {
    const url = getRequestURL(event);

    const redirectUrl = await account.createOAuth2Token(
      "github",
      `${url.origin}/api/oauth`,
      `${url.origin}/signin`
    );

    await sendRedirect(event, redirectUrl);
  }

  const { userId, secret } = await getQuery(event);

  const session = await account.createSession(
    userId as string,
    secret as string
  );

  setCookie(event, "session", session.secret, {
    expires: new Date(session.expire),
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  await sendRedirect(event, "/account");
});
