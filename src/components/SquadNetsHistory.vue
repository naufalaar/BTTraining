<template>
  <div>
    <b-card bg-variant="primary" text-variant="light">
      <b-card-text>
        <h1 class="text-secondary">Net History</h1>
        <br />
        <b-table
          id="my-table"
          class="text-center"
          table-variant="dark"
          head-variant="light"
          small
          bordered
          borderless
          dark
          fixed
          :items="trainingSessions"
          :fields="fields"
          :per-page="perPage"
          :current-page="currentPage"
        >
          <template #cell(season)="data">
            Season {{ data.value }}
          </template>
          <template #cell(week)="data">
            Week {{ data.value }}
          </template>
          <template #cell(player)="data">
            {{ getPlayerName(data.value) }}
          </template>
        </b-table>
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="my-table"
          size="sm"
          pills
          align="right"
          first-number
          last-number
        ></b-pagination>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "SquadNetsHistory",
  computed: {
    rows() {
      return this.trainingHistory.length;
    },
    trainingSessions(){
      return this.sortBySession(this.trainingHistory);
    }
  },
  props:{
    trainingHistory: Array,
    squad: Array
  },
  methods: {
    getPlayerName(playerId){
      let player = this.squad.find(p => p.playerId === playerId);
      return player.firstName + " " + player.lastName;
    },
    sortBySession(sortable){
      return sortable.sort((a, b) => (a.season < b.season) ? 1 : (a.season === b.season) ? ((a.week < b.week) ? 1 : -1) : -1 )
    }
  },
  data() {
    return {
      currentPage: 1,
      perPage: 15,
      fields: [
        "season",
        "week",
        "player",
        "net",
        "quantity",
      ],
    };
  },
};
</script>