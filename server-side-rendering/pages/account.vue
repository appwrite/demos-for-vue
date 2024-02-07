<script setup>
const { context } = useEvent();
const { user } = context;

function getInitials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
}
</script>

<template>
  <div class="u-max-width-500 u-width-full-line">
    <h1 class="heading-level-2 u-margin-block-start-auto">Your account</h1>
    <div class="u-margin-block-start-24">
      <section class="card">
        <div class="user-profile">
          <span class="avatar">{{ getInitials(user.name) }}</span>
          <span class="user-profile-info">
            <span class="name">{{ user.email }}</span>
            <div class="interactive-text-output u-padding-inline-0">
              <span class="text">{{ user.$id }}</span>
              <div class="u-flex u-cross-child-start u-gap-8">
                <button
                  class="interactive-text-output-button"
                  aria-label="copy text"
                >
                  <span class="icon-duplicate" aria-hidden="true" />
                </button>
              </div>
            </div>
          </span>
          <span class="user-profile-sep" />
          <span class="user-profile-empty-column" />
          <span class="user-profile-info"
            ><span class="text">Welcome back, {{ user.name }}!</span></span
          >
        </div>
      </section>
      <form class="form common-section" method="POST" action="/api/signout">
        <ul class="form-list" style="--form-list-gap: 1.5rem">
          <li class="form-item">
            <button class="button is-secondary is-full-width" type="submit">
              Sign out
            </button>
          </li>
        </ul>
      </form>
    </div>
  </div>
</template>
