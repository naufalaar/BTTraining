<template>
  <div>
    <NavigationBar />
    <b-container fluid>
      <b-row class="mt-4">
        <b-col>
          <RecordNets v-if="trainingHistory" @newHistory="updateHistory($event)" v-bind:trainingHistory="trainingHistory" v-bind:seasons="seasons" v-bind:squad="squad" v-bind:selectedSeason="currentSeason" v-bind:selectedWeek="currentWeek"/>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="mt-4">
           <b-overlay
            :show="show"
            variant="dark"
            opacity="0.9"
            spinner-variant="secondary"
          >
          <SquadNetsHistory v-if="trainingHistory" v-bind:trainingHistory="trainingHistory" v-bind:squad="squad" />
           </b-overlay>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import NavigationBar from "../components/NavigationBar.vue";
import RecordNets from "../components/RecordNets.vue";
import SquadNetsHistory from "../components/SquadNetsHistory.vue";
import axios from 'axios';

export default {
  components: { NavigationBar, RecordNets, SquadNetsHistory },
  data() {
    return {
      trainingHistory: undefined,
      show: true
    };
  },
  computed:{
    currentSeason(){
      return this.$store.state.currentWeek.season;
    },
    currentWeek(){
      return this.$store.state.currentWeek.week;
    },
    seasons(){
        return Array.from(new Array(this.$store.state.currentWeek.season-51), (x, i) => i + 52);
    },
    squad() {
      return this.$store.state.squad;
    },
  },
  mounted(){
    this.getTrainingHistory();
  },
  methods:{
    async getTrainingHistory(){
      const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.$store.state.jwtToken
    }
      await axios.post(process.env.VUE_APP_ROOT_API + "getAllTrainingSession", {"teamId": this.$store.state.currentTeam.teamId} , { headers: headers })
            .then(response => {
                this.trainingHistory = response.data;
                this.show = false;
                })
            .catch(response => {console.log(response)});
    },
    updateHistory(newHistory){
      this.trainingHistory = newHistory;
    }
  }
};
</script>

<style lang="scss"></style>
