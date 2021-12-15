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
          :items="netHistory"
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
        </b-table>
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="my-table"
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
  name: "NetsHistory",
  props: {
    netHistory: Array
  },
  computed:{
    rows() {
      return this.netHistory.length;
    },
  },
  data() {
    return {
      currentPage: 1,
      perPage: 5,
      fields: [
        "season",
        "week",
        "net",
        "quantity",
      ],
    };
  },
};
</script>