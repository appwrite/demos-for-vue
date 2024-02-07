<script setup>
const config = useRuntimeConfig();
</script>

<template>
  <div class="u-max-width-500 u-width-full-line">
    <h1 class="heading-level-2 u-margin-block-start-auto">Demo sign up</h1>
    <div class="u-margin-block-start-24">
      <form class="form common-section" method="POST" action="/api/signup">
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
            <label class="label is-required" for="name">Name</label>
            <div class="input-text-wrapper">
              <input
                id="name"
                name="name"
                placeholder="Your name"
                autocomplete="off"
                type="text"
                class="input-text"
              />
            </div>
          </li>
          <li class="form-item">
            <label class="label is-required" for="email">Email</label>
            <div class="input-text-wrapper">
              <input
                id="email"
                name="email"
                placeholder="Your email"
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
                placeholder="Your password"
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
            <button class="button is-full-width" type="submit">Sign up</button>
          </li>
          <span class="with-separators eyebrow-heading-3">or</span>
          <li class="form-item">
            <button
              class="button is-github is-full-width"
              type="button"
              @click="
                () =>
                  signInWithGithub(
                    config.public.appwriteEndpoint,
                    config.public.appwriteProjectId
                  )
              "
            >
              <span class="icon-github" aria-hidden="true" />
              <span class="text">Sign up with GitHub</span>
            </button>
          </li>
        </ul>
      </form>
    </div>
    <ul class="inline-links is-center is-with-sep u-margin-block-start-32">
      <li class="inline-links-item">
        <span class="text"
          >Already got an account?
          <a class="link" href="/signin">Sign in</a></span
        >
      </li>
    </ul>
  </div>
</template>
