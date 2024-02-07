<script setup>
import signInWithGithub from "~/utils/signInWithGitHub";

const config = useRuntimeConfig();
</script>

<template>
  <div class="u-max-width-500 u-width-full-line">
    <h1 class="heading-level-2 u-margin-block-start-auto">Demo sign in</h1>
    <div class="u-margin-block-start-24">
      <form class="form common-section" method="POST" action="/api/signin">
        <ul class="form-list" style="--form-list-gap: 1.5rem">
          <li class="form-item">
            <p>
              This is a demo project for
              <a href="https://appwrite.io">Appwrite</a> server side rendering.
              View the source code on the
              <a
                class="link"
                href="https://github.com/appwrite/demos-for-vue/tree/master/server-side-rendering"
                >GitHub repository</a
              >.
            </p>
          </li>
          <li class="form-item">
            <label class="label is-required" for="email">Email</label>
            <div class="input-text-wrapper">
              <input
                id="email"
                name="email"
                placeholder="Email"
                type="email"
                class="input-text"
                autocomplete="off"
              />
            </div>
          </li>
          <li class="form-item">
            <label class="label is-required" for="password">Password</label>
            <div class="input-text-wrapper" style="--amount-of-buttons: 1">
              <input
                id="password"
                name="password"
                placeholder="Password"
                minlength="8"
                type="password"
                class="input-text"
                autocomplete="off"
              />
              <button
                type="button"
                class="show-password-button"
                aria-label="show password"
              >
                <span aria-hidden="true" class="icon-eye" />
              </button>
            </div>
          </li>
          <li class="form-item">
            <button class="button is-full-width" type="submit">Sign in</button>
          </li>
          <span class="with-separators eyebrow-heading-3">or</span>
          <li class="form-item">
            <button
              class="button is-github is-full-width"
              @click="
                () =>
                  signInWithGithub(
                    config.public.appwriteEndpoint,
                    config.public.appwriteProjectId
                  )
              "
              type="button"
            >
              <span class="icon-github" aria-hidden="true" />
              <span class="text">Sign in with GitHub</span>
            </button>
          </li>
        </ul>
      </form>
    </div>
    <ul class="inline-links is-center is-with-sep u-margin-block-start-32">
      <li class="inline-links-item">
        <span class="text"
          >Don't have an account?
          <a class="link" href="/signup">Sign up</a></span
        >
      </li>
    </ul>
  </div>
</template>
