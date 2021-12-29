<template>
  <div>
    <b-row>
      <b-col
        ><b-form-group id="input-player" label="Player:" label-for="player">
          <b-form-select
            id="player"
            :options="playerList"
            v-model="selectedPlayer"
          >
            <template #first>
              <b-form-select-option value="0"></b-form-select-option>
            </template>
          </b-form-select> </b-form-group
      ></b-col>
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
            v-on:click="removeSkillChange()"
            :disabled="selectedChanges.length == 0"
          >
            Remove Selected
          </b-button></b-overlay
        ></b-col
      >
    </b-row>
    <div v-if="selectedPlayer != 0">
      <b-table
        id="my-table"
        class="text-center capitalize"
        table-variant="dark"
        head-variant="light"
        small
        bordered
        borderless
        dark
        fixed
        :items="trainingHistory"
        :fields="fields"
        :per-page="perPage"
        :current-page="currentPage"
        select-mode="multi"
        selectable
        @row-selected="onRowSelected"
      >
        <template #cell(newLevel)="data">
          <span
            v-if="
              trainingHistory[data.index + (currentPage - 1) * perPage].type ===
              'plop'
            "
            class="text-danger capitalize"
            >{{ data.value }}</span
          >
          <span v-else class="text-secondary capitalize">{{ data.value }}</span>
        </template>
        <template #cell(season)="data"> Season {{ data.value }} </template>
        <template #cell(week)="data"> Week {{ data.value }} </template>
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
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RemoveSkillChange",
  data() {
    return {
      show: false,
      selectedPlayer: 0,
      selectedChanges: [],
      currentPage: 1,
      perPage: 20,
      fields: ["season", "week", "skill", "newLevel", "previousLevel"],
    };
  },
  computed: {
    rows() {
      return this.trainingHistory.length;
    },
    squad() {
      return this.$store.state.squad;
    },
    playerList() {
      return this.squad.map(function (player) {
        return {
          value: player.playerId,
          text: player.firstName + " " + player.lastName,
        };
      });
    },
    player() {
      for (let player of this.squad) {
        if (player.playerId == this.selectedPlayer) {
          return player;
        }
      }
      return null;
    },
    trainingHistory() {
      return this.sortBySession(this.player.playerSkillChanges);
    },
  },
  methods: {
    onRowSelected(items) {
      this.selectedChanges = items;
    },
    sortBySession(sortable) {
      return sortable.sort((a, b) =>
        a.season < b.season
          ? 1
          : a.season === b.season
          ? a.week < b.week
            ? 1
            : -1
          : -1
      );
    },
    async removeSkillChange() {
      this.show = true;
      this.selectedChanges[0]["playerSkillChanges"]={playerId: this.selectedPlayer};
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$store.state.jwtToken,
      };
      await axios
        .post(
          process.env.VUE_APP_ROOT_API + "removeSkillChange",
          this.selectedChanges,
          {
            headers: headers,
          }
        )
        .then((response) => {
          this.$store.dispatch("setSquad", response.data);
        })
        .catch((response) => {
          this.$bvToast.toast(`Error while removing pop / plop`, {
            title: "Remove Failed",
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

<style scoped>
.capitalize {
  text-transform: capitalize;
}
</style>
