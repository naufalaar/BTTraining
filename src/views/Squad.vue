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
          <b-card class="mt-4" bg-variant="primary" text-variant="danger"> 
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
import axios from "axios";

import NavigationBar from "../components/NavigationBar.vue";
import PlayerList from "../components/PlayerList.vue";
import PlayerCardSimple from "../components/PlayerCardSimple.vue";

export default {
  components: { NavigationBar, PlayerList, PlayerCardSimple },
  methods: {
    async getSquad() {
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$store.state.jwtToken,
      };
      await axios
        .post(
          process.env.VUE_APP_ROOT_API + "teamPlayers",
          { teamId: this.$store.state.currentTeam.teamId },
          { headers: headers }
        )
        .then((response) => {
          this.$store.dispatch("setSquad", response.data);
        })
        .catch((response) => {
          console.log(response);
        });
    },
  },
  mounted() {
    this.getSquad();
  },
  computed: {
    squad: function () {
      return this.$store.state.squad;
    },
  },
};
</script>

