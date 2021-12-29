<template>
  <div>
    <NavigationBar />
    <b-container fluid>
      <b-row v-if="squad.length != 0" align-v="stretch">
        <b-col>
          <b-row v-for="player in squad" :key="player.playerId">
            <b-col class="mt-4">
              <PlayerCardSimple v-bind:player="player" />
            </b-col>
          </b-row>
        </b-col>
        <b-col cols="2">
          <PlayerList />
        </b-col>
      </b-row>
      <b-row v-else>
        <b-col>
          <b-card class="mt-4" bg-variant="primary" text-variant="secondary">
            <b-card-text class="text-center">
              <h4>No players found - Please import players.</h4>
            </b-card-text>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import NavigationBar from "../components/NavigationBar.vue";
import PlayerList from "../components/PlayerList.vue";
import PlayerCardSimple from "../components/PlayerCardSimple.vue";

export default {
  components: { NavigationBar, PlayerList, PlayerCardSimple },
  computed: {
    squad() {
      return this.$store.state.squad;
    },
  },
};
</script>

