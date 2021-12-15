<template>
  <div>
    <b-jumbotron
      class="py-4 text-center mt-4 mb-0"
      bg-variant="primary"
      text-variant="light"
      text-center
      :lead="title"
    >
      <h4 v-if="value" class="py-1 capitalize" >{{ value }}</h4>
      <h4 v-else class="py-1 capitalize" >Useless</h4>
    </b-jumbotron>
  </div>
</template>

<script>
export default {
  name: "SquadInfoText",
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
.capitalize {
  text-transform: capitalize;
}
</style>
