<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>


<style lang="scss">
@import "./styles/app.scss";
body {
  background: var(--dark) !important;
}
.form-control {
  background-color: var(--dark) !important;
  border-color: var(--secondary) !important;
  color: var(--secondary) !important;
}
.custom-select {
  background-color: var(--dark) !important;
  border-color: var(--secondary) !important;
  color: var(--secondary) !important;
}
.form-control:disabled {
  background-color: var(--dark) !important;
  border-color: var(--dark) !important;
}
.form-control:disabled::placeholder {
  color: var(--secondary) !important;
}
</style>
