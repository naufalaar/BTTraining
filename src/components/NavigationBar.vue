<template>
  <b-navbar toggleable="lg" type="dark" variant="primary" sticky>
    <b-navbar-brand to="/">BT Training Tracker</b-navbar-brand>
    <b-nav-text><span class="text-secondary">({{currentTeam.teamName}} - S{{currentWeek.season}} W{{currentWeek.week}})</span></b-nav-text>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto main-nav">
        <b-nav-item
          to="/squad"
          exact
          exact-active-class="active"
          >Squad</b-nav-item
        >
        <b-nav-item
          to="/nets"
          exact
          exact-active-class="active"
          >Nets</b-nav-item
        >
        <!-- <b-nav-item
          to="/coachAnalysis"
          exact
          exact-active-class="active"
          >Coach Analysis</b-nav-item
        > -->
        
        <b-nav-item to="/importSquad" exact exact-active-class="active"
          >Import Squad</b-nav-item
        >
        <b-nav-item to="/importPlayer" exact exact-active-class="active"
          >Import Player</b-nav-item
        >
        <b-nav-item to="/manageTeam" exact exact-active-class="active"
          >Manage Team</b-nav-item
        >
        <b-nav-item v-if="hasFranchise()" v-on:click="switchTeam" 
          >Switch Team</b-nav-item
        >
        <b-nav-item v-on:click="logout()">Logout</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import router from "../router";
import axios from "axios";

export default {
  name: "NavigationBar",
  data(){
    return{
      show: false
    }
  },
  computed: {
    currentTeam(){
      return this.$store.state.currentTeam;
    },
    currentWeek(){
      return this.$store.state.currentWeek;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      sessionStorage.clear();
      router.push("/");
    },
    async switchTeam(){
      let team = this.currentTeam;
      if(this.currentTeam.type == "Main"){
        team = this.$store.state.contextManager.franchise;
        team["type"] = "Franchise";
      }else{
        team = this.$store.state.contextManager.mainTeam;
        team["type"] = "Main";
      }
      
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$store.state.jwtToken,
      };
      await axios
        .post(
          process.env.VUE_APP_ROOT_API + "teamPlayers",
          { teamId: team.teamId },
          { headers: headers }
        )
        .then((response) => {
          this.$store.dispatch("setTeam",team);
          this.$store.dispatch("setSquad", response.data);
          this.$router.go(this.$router.currentRoute);
        })
        .catch((response) => {
          this.$bvToast.toast(`Unable to connect to server`, {
            title: "Unable to Switch Teams ",
            autoHideDelay: 5000,
            appendToast: true,
            noCloseButton: true,
            variant: "danger",
          });
        });
      
    },
    hasFranchise(){
      return this.$store.state.contextManager.franchise != null
    }
  },
};
</script>

<style lang="scss" scoped>
.main-nav {
  font-size: 18px;
  padding-right: 0.75rem !important;
  padding-left: 0.75rem !important;
}
</style>