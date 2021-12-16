<template>
  <div>
    <NavigationBar />
    <b-container fluid>
      <SquadImportInput @parseResult="parseResult($event)" />
      <b-row v-if="players.length > 0" class="mt-4">
          <b-col align-self="end"><b-button block variant="secondary" v-on:click="saveSquad()"
                    >Import Squad</b-button
                  ></b-col>
          <b-col> </b-col>
          <b-col></b-col>
          <b-col></b-col>
          <b-col></b-col>
        </b-row>
      <div v-for="(player,index) in players" v-bind:key="index">
      <SquadImportDetail v-bind:player="player" />
      </div>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
import NavigationBar from "../components/NavigationBar.vue";
import SquadImportInput from "../components/SquadImportInput.vue";
import SquadImportDetail from "../components/SquadImportDetail.vue";

export default {
  components: { NavigationBar, SquadImportInput, SquadImportDetail },
  data(){
    return{
      players: [],
    }
  },
  methods: {
    parseResult(parseResult){
      this.players = parseResult;
    },
    async saveSquad() {
      const headers = {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + this.$store.state.jwtToken
      };
      await axios
        .post(
          process.env.VUE_APP_ROOT_API + "saveSquad",
          this.players,
          { headers: headers }
        )
        .then((response) => {
          this.$bvToast.toast(`Squad imported successfully`, {
          title: 'Import Success',
          autoHideDelay: 5000,
          appendToast: true,
          noCloseButton: true,
          variant: "info"
        })
          this.player = response.data;
        })
        .catch((response) => {
          console.log(response);
          this.$bvToast.toast(`Error while importing squad`, {
          title: 'Import Failed',
          autoHideDelay: 5000,
          appendToast: true,
          noCloseButton: true,
          variant: "danger"
        })
        });
    },
  }
};
</script>

<style lang="scss"></style>
