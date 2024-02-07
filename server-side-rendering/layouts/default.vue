<script setup>
import "@appwrite.io/pink";
import "@appwrite.io/pink-icons";
import LoginDarkMode from "assets/login-dark-mode.png";

useHead({
  bodyAttrs: {
    class: "theme-dark",
  },
});
</script>
<template>
  <main class="grid-1-1 is-full-page" id="main">
    <section
      class="u-flex u-flex-vertical"
      :style="{ backgroundImage: `url(${LoginDarkMode})` }"
    >
      <div class="tag-line is-not-mobile">
        <p>Server side rendering<span class="underscore">_</span></p>
      </div>
      <div class="u-flex u-stretch"></div>
      <div class="logo u-flex u-gap-16">
        <nuxt-link to="/">
          <img
            src="~/assets/appwrite-logo-dark.svg"
            width="160"
            class="u-block"
            alt="Appwrite Logo"
          />
        </nuxt-link>
      </div>
    </section>
    <section
      class="grid-1-1-col-2 u-flex u-main-center u-cross-center _u-padding-16-mobile"
    >
      <div
        class="container u-flex u-flex-vertical u-cross-center u-main-center"
      >
        <slot></slot>
      </div>
    </section>
  </main>
</template>

<style>
#main section:first-child {
  padding-block-start: 2.25rem;
  padding-block-end: 2rem;
}

#main section:first-child div {
  padding-inline-start: 1rem;
  padding-inline-end: 1rem;
  padding-block-end: 1rem;
}

#main section:first-child .tag-line {
  font-size: 4rem;
  font-style: normal;
  font-weight: 400;
  line-height: 100%; /* 80px */
  letter-spacing: -1.6px;
  backdrop-filter: blur(0.5rem);
}

#main section:first-child .tag-line .underscore {
  -webkit-text-fill-color: #f02e65;
}

@media (min-width: 768px) {
  #main section:first-child {
    background: var(--url);
    background-repeat: no-repeat;
    background-position: top;
    background-size: cover;
    padding-block-start: 6.25rem;
    padding-block-end: 6.875rem;
  }

  #main section:first-child div {
    padding-inline-start: 2.625rem;
    padding-inline-end: 2rem;
  }
}

@media (min-width: 1199px) {
  #main section:first-child div {
    padding-inline-start: 5.625rem;
    padding-inline-end: 5rem;
  }

  #main section:first-child .tag-line {
    font-size: 5rem;
  }
}

.tag-line {
  background: linear-gradient(45deg, white, white 60%, #fd376f);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>

<style global>
.with-separators {
  display: flex;
  align-items: center;
  gap: 1rem;
  text-transform: uppercase;
  width: 100%;
  color: var(--separator-text);
  --separator-color: hsl(var(--color-neutral-85));
  --separator-text: hsl(var(--color-neutral-60));
}

.with-separators:before,
.with-separators:after {
  content: "";
  flex: 1;
  height: 1px;
  background: var(--separator-color);
}
</style>
