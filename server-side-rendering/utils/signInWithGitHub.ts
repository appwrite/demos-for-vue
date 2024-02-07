export default function signInWithGithub(endpoint: string, projectId: string) {
  if (typeof window === "undefined") return;

  const url = new URL(`${endpoint}/account/sessions/oauth2/github`);

  url.searchParams.set("project", projectId);
  url.searchParams.set("success", `${window.location.origin}/auth`);
  url.searchParams.set("failure", `${window.location.origin}/`);
  // Critical: Set token to true to get a auth token in the success URL
  url.searchParams.set("token", `true`);

  window.location.href = url.toString();
}
