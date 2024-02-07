import { Client, Account } from "luke-node-appwrite-ssr";

export const SESSION_COOKIE = "my-custom-session";

export function createAppwriteClient(
  event: Parameters<Parameters<typeof defineEventHandler>[0]>[0]
) {
  const client = new Client()
    .setEndpoint(import.meta.env.PUBLIC_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.PUBLIC_APPWRITE_PROJECT_ID);

  // Set the API key for the client, bypassing rate limiting and enabling
  // Appwrite to return the `secret` property in the sessions objects.
  client.setKey(import.meta.env.APPWRITE_KEY);

  // Optional step: set the forwarded headers to record the user's IP address
  // and user agent.
  const origin = event.headers.get("x-forwarded-for");
  if (origin) {
    client.setForwardedFor(origin);
  }
  const userAgent = event.headers.get("user-agent");
  if (userAgent) {
    client.setForwardedUserAgent(userAgent);
  }

  // Extract the session from cookies and use it for the client
  const session = getCookie(event, SESSION_COOKIE);
  if (session) {
    client.setSession(session);
  }

  return {
    get account() {
      return new Account(client);
    },
  };
}
