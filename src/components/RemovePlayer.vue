<template>
  <div>
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
            v-on:click="removePlayer()"
            :disabled="selectedChanges.length == 0"
          >
            Remove Selected
          </b-button></b-overlay
        ></b-col
      >
    </b-row>
    <b-table
      id="my-table"
      class="text-center capitalize mt-4"
      table-variant="dark"
      head-variant="light"
      small
      borderless
      dark
      :items="squad"
      :fields="fields"
      :per-page="perPage"
      :current-page="currentPage"
      select-mode="multi"
      selectable
      @row-selected="onRowSelected"
    >
      <template #cell(player)="data">
        {{ data.item.firstName }} {{ data.item.lastName }}
      </template>
      <template #cell(popHistory)="data">
        {{ data.item["playerSkillChanges"].length }}
      </template>
      <template #cell(netHistory)="data">
        {{ data.item["trainingSessions"].length }}
      </template>
    </b-table>
    <b-pagination
      class="customPagination"
      pills
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
      align="right"
      first-number
      last-number
    ></b-pagination>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RemovePlayer",
  data() {
    return {
      show: false,
      selectedChanges: [],
      currentPage: 1,
      perPage: 20,
      fields: [
        { key: "player", label: "Player" },
        "age",
        "stamina",
        "batting",
        "bowling",
        "concentration",
        "consistency",
        "fielding",
        { key: "netHistory", label: "Net Count" },
        { key: "popHistory", label: "Pop Count" },
        { key: "playerStatus", label: "Status" },
      ],
    };
  },
  computed: {
    rows() {
      return this.squad.length;
    },
    squad() {
      return this.$store.state.squad;
    },
  },
  methods: {
    onRowSelected(items) {
      this.selectedChanges = items;
    },
    isValid() {
      for (let player of this.selectedChanges) {
        if (player["trainingSessions"].length > 0 || player["playerSkillChanges"].length > 0){ 
          this.$bvToast.toast(`Cannot remove player as they have net and/or pop history `, {
              title: `Cannot Remove ${ player.firstName } ${ player.lastName }`,
              autoHideDelay: 5000,
              appendToast: true,
              noCloseButton: true,
              variant: "danger",
            });
          return false;
        }
      }
      return true;
    },
    async removePlayer() {
      this.show = true;
      if (this.isValid()) {
        this.selectedChanges.map(
          (o) => (o.team = { teamId: this.$store.state.currentTeam.teamId })
        );
        console.log(this.selectedChanges);
        const headers = {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.$store.state.jwtToken,
        };
        await axios
          .post(
            process.env.VUE_APP_ROOT_API + "removePlayers",
            this.selectedChanges,
            {
              headers: headers,
            }
          )
          .then((response) => {
            this.$store.dispatch("setSquad", response.data);
          })
          .catch((response) => {
            this.$bvToast.toast(`Error while removing player(s)`, {
              title: "Remove Failed",
              autoHideDelay: 5000,
              appendToast: true,
              noCloseButton: true,
              variant: "danger",
            });
          });
      }
      this.show = false;
    },
  },
};
</script>

<style scoped>
.capitalize {
  text-transform: capitalize;
}
</style>
