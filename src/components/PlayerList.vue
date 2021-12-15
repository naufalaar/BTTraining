<template>
  <div class="">
    <b-card class="mt-4" bg-variant="primary" text-variant="light">
      <b-card-text>
        <h3 class="text-secondary">Squad</h3>
        <b-link
          v-for="player in squad"
          :key="player.playerId"
          class="text-light text-decoration-none"
          active-class="active"
          variant="link"
          :to="{ path: '/player/' + player.playerId }"
          >{{ player.firstName }} {{ player.lastName }}<br
        /></b-link>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "PlayerList",
  computed: {
    squad: function () {
      return this.$store.state.squad;
    },
    player: function () {
      for (player in this.squad) {
        if (player.playerId == $route.params.id) {
          return player;
        }
      }
    },
  },
};
</script>

<style scoped>
.btn-link:active {
  color: var(--secondary);
}
</style>

