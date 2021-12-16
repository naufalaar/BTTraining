<template>
  <div>
    <NavigationBar />
    <b-container fluid>
      <b-row align-v="stretch">
        <b-col>
          <b-row align-v="stretch">
            <b-col><SquadInfoNumber v-bind:value="summary.players" title="Players" /> </b-col>
            <b-col><SquadInfoWage v-bind:value="summary.wages" title="Total Wages"/> </b-col>
            <b-col><SquadInfoNumber v-bind:value="summary.lhBatters" title="LH Batters" /> </b-col>
            <b-col><SquadInfoNumber v-bind:value="summary.rhBatters" title="RH Batters" /> </b-col>
            <b-col><SquadInfoNumber v-bind:value="summary.wicketKeepers" title="WK" /> </b-col>
          </b-row>
          <b-row align-v="stretch">
            <b-col><SquadInfoNumber v-bind:value="summary.bowlers" title="Bowlers" /> </b-col>
            <b-col><SquadInfoNumber v-bind:value="summary.fBowlers" title="Fast" /> </b-col>
            <b-col><SquadInfoNumber v-bind:value="summary.fmBowlers" title="Fast Medium" /> </b-col>
            <b-col><SquadInfoNumber v-bind:value="summary.mBowlers" title="Medium" /> </b-col>
            <b-col><SquadInfoNumber v-bind:value="summary.spinBowlers" title="Spin" /> </b-col>
          </b-row>
          <b-row align-v="stretch">
            <b-col><SquadInfoText v-bind:value="summary.avgBatting" title="Avg. Batting" /> </b-col>
            <b-col><SquadInfoText v-bind:value="summary.avgBowling" title="Avg. Bowling" /> </b-col>
            <b-col><SquadInfoText v-bind:value="summary.avgStamina" title="Avg. Stamina"  /> </b-col>
            <b-col><SquadInfoText v-bind:value="summary.avgFielding" title="Avg. Fielding"  /> </b-col>
            <b-col><SquadInfoText v-bind:value="summary.avgExperience" title="Avg. Exp." /> </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios';

import NavigationBar from "../components/NavigationBar.vue";
import SquadInfoNumber from "../components/SquadInfoNumber.vue";
import SquadInfoText from "../components/SquadInfoText.vue"
import SquadInfoWage from "../components/SquadInfoWage.vue"

export default {
  name: "Summary",
  components: { NavigationBar, SquadInfoNumber, SquadInfoText, SquadInfoWage },
  methods: {
    async getSummary(){
      const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.$store.state.jwtToken
    }
      axios.post(process.env.VUE_APP_ROOT_API + "teamSummary", {teamId: this.$store.state.currentTeam.teamId}, { headers: headers })
            .then(response => {
                this.summary = response.data;
                })
            .catch(response => {console.log(response)});
    }
    
  },
  mounted(){
    this.getSummary();
  },
  data(){
    return{
      summary: {},      
    }
  }
};
</script>
