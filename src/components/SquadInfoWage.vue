<template>
  <div>
    <b-jumbotron
      class="py-2 text-center mt-4 mb-0"
      bg-variant="primary"
      text-variant="light"
      text-center
      :lead="title"
    >

      <h2 v-if="value" class="py-2">£ {{ value.toLocaleString() }}</h2>
      <h2 v-else class="py-2">£ 0</h2>
    </b-jumbotron>
  </div>
</template>

<script>
export default {
  name: "SquadInfoWage",
  data() {
    return {};
  },
  props: {
    value: "",
    title: "",
  },
};
</script>

<style scoped>
</style>
