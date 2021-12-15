<template>
  <div>
    <b-jumbotron
      class="py-2 text-center mt-4 mb-0"
      bg-variant="primary"
      text-variant="light"
      text-center
      :lead="title"
    >
      <h1 v-if="value" class="py-1">{{ value }}</h1>
      <h1 v-else class="py-1">0</h1>
    </b-jumbotron>
  </div>
</template>

<script>
export default {
  name: "SquadInfoNumber",
  data() {
    return {};
  },
  props: {
    value: Number,
    title: String
  },
};
</script>

<style scoped>
</style>
