<template>
  <div>
    <NavigationBar />
    <b-alert
      :show="endSeason"
      v-if="currentWeek.week == 1"
      class="position-fixed fixed-bottom m-0 rounded-0 text-center"
      style="z-index: 2000"
      variant="danger"
    >
      Have you ensured to end the season? Update your player wages and your player birthdays by navigating to Manage Team --> End Season
    </b-alert>
    <b-container fluid>
      <b-row align-v="stretch">
        <b-col>
          <b-row align-v="stretch">
            <b-col>
              <b-overlay
                :show="show"
                variant="dark"
                opacity="0.9"
                spinner-variant="secondary"
                ><SquadInfoNumber
                  v-bind:value="summary.players"
                  title="Players"
              /></b-overlay>
            </b-col>
            <b-col
              ><b-overlay
                :show="show"
                variant="dark"
                opacity="0.9"
                spinner-variant="secondary"
                ><SquadInfoWage
                  v-bind:value="summary.wages"
                  title="Total Wages"
              /></b-overlay>
            </b-col>
            <b-col
              ><b-overlay
                :show="show"
                variant="dark"
                opacity="0.9"
                spinner-variant="secondary"
                ><SquadInfoNumber
                  v-bind:value="summary.lhBatters"
                  title="LH Batters"
              /></b-overlay>
            </b-col>
            <b-col
              ><b-overlay
                :show="show"
                variant="dark"
                opacity="0.9"
                spinner-variant="secondary"
                ><SquadInfoNumber
                  v-bind:value="summary.rhBatters"
                  title="RH Batters"
              /></b-overlay>
            </b-col>
            <b-col
              ><b-overlay
                :show="show"
                variant="dark"
                opacity="0.9"
                spinner-variant="secondary"
                ><SquadInfoNumber
                  v-bind:value="summary.wicketKeepers"
                  title="WK"
              /></b-overlay>
            </b-col>
          </b-row>
          <b-row align-v="stretch">
            <b-col
              ><b-overlay
                :show="show"
                variant="dark"
                opacity="0.9"
                spinner-variant="secondary"
                ><SquadInfoNumber
                  v-bind:value="summary.bowlers"
                  title="Bowlers"
              /></b-overlay>
            </b-col>
            <b-col
              ><b-overlay
                :show="show"
                variant="dark"
                opacity="0.9"
                spinner-variant="secondary"
                ><SquadInfoNumber v-bind:value="summary.fBowlers" title="Fast"
              /></b-overlay>
            </b-col>
            <b-col
              ><b-overlay
                :show="show"
                variant="dark"
                opacity="0.9"
                spinner-variant="secondary"
                ><SquadInfoNumber
                  v-bind:value="summary.fmBowlers"
                  title="Fast Medium"
              /></b-overlay>
            </b-col>
            <b-col
              ><b-overlay
                :show="show"
                variant="dark"
                opacity="0.9"
                spinner-variant="secondary"
                ><SquadInfoNumber
                  v-bind:value="summary.mBowlers"
                  title="Medium"
              /></b-overlay>
            </b-col>
            <b-col
              ><b-overlay
                :show="show"
                variant="dark"
                opacity="0.9"
                spinner-variant="secondary"
                ><SquadInfoNumber
                  v-bind:value="summary.spinBowlers"
                  title="Spin"
              /></b-overlay>
            </b-col>
          </b-row>
          <b-row align-v="stretch">
            <b-col
              ><b-overlay
                :show="show"
                variant="dark"
                opacity="0.9"
                spinner-variant="secondary"
                ><SquadInfoText
                  v-bind:value="summary.avgBatting"
                  title="Avg. Batting"
              /></b-overlay>
            </b-col>
            <b-col
              ><b-overlay
                :show="show"
                variant="dark"
                opacity="0.9"
                spinner-variant="secondary"
                ><SquadInfoText
                  v-bind:value="summary.avgBowling"
                  title="Avg. Bowling"
              /></b-overlay>
            </b-col>
            <b-col
              ><b-overlay
                :show="show"
                variant="dark"
                opacity="0.9"
                spinner-variant="secondary"
                ><SquadInfoText
                  v-bind:value="summary.avgStamina"
                  title="Avg. Stamina"
              /></b-overlay>
            </b-col>
            <b-col
              ><b-overlay
                :show="show"
                variant="dark"
                opacity="0.9"
                spinner-variant="secondary"
                ><SquadInfoText
                  v-bind:value="summary.avgFielding"
                  title="Avg. Fielding"
              /></b-overlay>
            </b-col>
            <b-col
              ><b-overlay
                :show="show"
                variant="dark"
                opacity="0.9"
                spinner-variant="secondary"
                ><SquadInfoText
                  v-bind:value="summary.avgExperience"
                  title="Avg. Exp."
              /></b-overlay>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";

import NavigationBar from "../components/NavigationBar.vue";
import SquadInfoNumber from "../components/SquadInfoNumber.vue";
import SquadInfoText from "../components/SquadInfoText.vue";
import SquadInfoWage from "../components/SquadInfoWage.vue";

export default {
  name: "Summary",
  components: { NavigationBar, SquadInfoNumber, SquadInfoText, SquadInfoWage },
  methods: {
    async getSummary() {
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$store.state.jwtToken,
      };
      let valid = false;
      await axios
        .post(
          process.env.VUE_APP_ROOT_API + "teamSummary",
          { teamId: this.$store.state.currentTeam.teamId },
          { headers: headers }
        )
        .then((response) => {
          this.summaryResult = response.data;
          valid = true;
        })
        .catch((response) => {
          console.log(response);
        });
      if (valid){
        await axios
        .post(
          process.env.VUE_APP_ROOT_API + "teamPlayers",
          { teamId: this.$store.state.currentTeam.teamId },
          { headers: headers }
        )
        .then((response) => {
          this.$store.dispatch("setSquad", response.data);
          this.show = false;
        })
        .catch((response) => {
          console.log(response);
        });
      }
    },
  },
  mounted() {
    this.getSummary();
  },
  computed: {
    summary() {
      return this.summaryResult;
    },
    currentWeek(){
      return this.$store.state.currentWeek;
    }
  },
  data() {
    return {
      summaryResult: {},
      show: true,
      endSeason: true,
    };
  },
};
</script>
