<template>
  <div>
    <b-modal
      title="Confirm End Season"
      v-model="confirmShow"
      cancel-variant="danger"
      ok-variant="secondary"
      text-variant="secondary"
      @ok="endSeason"
      >Are you sure that you want to end the season? This process is
      irreversible.</b-modal
    >
    <b-row>
      <b-col></b-col>
      <b-col></b-col>
      <b-col></b-col>
      <b-col></b-col>
      <b-col align-self="center">
        <b-overlay
          :show="show"
          variant="dark"
          opacity="0.9"
          spinner-small
          spinner-variant="secondary"
        >
          <b-button
            block
            variant="secondary"
            class="mt-2"
            v-on:click="confirmEndSeason()"
            :disabled="!isValid()"
          >
            End Season
          </b-button></b-overlay
        ></b-col
      >
    </b-row>
    <b-row class="py-3 text-center">
      <b-col><h5 class="text-secondary">Player Name</h5></b-col>
      <b-col><h5 class="text-secondary">New Wage</h5></b-col>
      <b-col><h5 class="text-secondary">New Age</h5></b-col>
      <b-col></b-col>
    </b-row>
    <b-row v-for="player in players" :key="player.playerId" class="py-1">
      <b-col
        ><h5>{{ player.firstName }} {{ player.lastName }}</h5></b-col
      >
      <b-col><b-form-input v-model.number="player.wage"></b-form-input></b-col>
      <b-col
        ><h5 class="text-center">{{ player.age }}</h5></b-col
      >
      <b-col></b-col>
    </b-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "EndSeason",
  data() {
    return {
      show: false,
      players: [],
      confirmShow: false,
    };
  },
  computed: {
    currentWeek() {
      return this.$store.state.currentWeek;
    },
  },
  mounted() {
    this.players = this.$store.state.squad
      .filter((a) => { return a.playerStatus == 'Active'})
      .map((a) => {
        return { ...a };
      });
    for (let player of this.players) {
      player.age++;
      player.trainingSessions = [];
      player.playerSkillChanges = [];
    }
  },
  methods: {
    isValid() {
      if (this.currentWeek.week != 1) return false;
      for (let player of this.players) {
        if (player["wage"] < 250 || isNaN(player["wage"])) {
          return false;
        }
      }
      return true;
    },
    confirmEndSeason() {
      this.confirmShow = true;
    },
    async endSeason() {
      this.show = true;
      this.players.map(
        (o) => (o.team = { teamId: this.$store.state.currentTeam.teamId })
      );
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$store.state.jwtToken,
      };
      await axios
        .post(process.env.VUE_APP_ROOT_API + "endSeason", this.players, {
          headers: headers,
        })
        .then((response) => {
          this.$store.dispatch("setSquad", response.data);
        })
        .catch((response) => {
          this.$bvToast.toast(`Error while Ending Season`, {
            title: "Season End Fail",
            autoHideDelay: 5000,
            appendToast: true,
            noCloseButton: true,
            variant: "danger",
          });
        });
      this.show = false;
    },
  },
};
</script>