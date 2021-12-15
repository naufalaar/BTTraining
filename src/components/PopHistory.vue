<template>
  <div>
    <b-card bg-variant="primary" text-variant="light">
      <b-card-text>
        <h1 class="text-secondary">Skill Change History</h1>
        <br />
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
        >
          <template #cell(newLevel)="data">
            <span
              v-if="
                trainingHistory[data.index + (currentPage - 1) * perPage]
                  .type === 'plop'
              "
              class="text-danger capitalize"
              >{{ data.value }}</span
            >
            <span v-else class="text-secondary capitalize">{{
              data.value
            }}</span>
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
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "PopHistory",
  computed: {
    rows() {
      return this.trainingHistory.length;
    },
  },
  props: {
    trainingHistory: Array,
  },
  data() {
    return {
      currentPage: 1,
      perPage: 5,
      fields: ["season", "week", "skill", "newLevel", "previousLevel"],
    };
  },
};
</script>

<style scoped>
.capitalize {
  text-transform: capitalize;
}
</style>