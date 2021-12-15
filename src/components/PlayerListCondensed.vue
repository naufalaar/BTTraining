<template>
  <div class="">
    <b-card class="mt-4" bg-variant="primary" text-variant="light">
      <b-card-text>
        <!-- <h3 class="text-secondary">View Player</h3> -->
        <b-form>
          <b-row class="pt-2">
            <b-col>
              <b-form-select v-model="player">
                <b-form-select-option :value="null" disabled
                  >Select Player</b-form-select-option
                >
                <b-form-select-option
                  v-for="player in squad"
                  :key="player.playerId"
                  :value="player.playerId"
                  >{{ player.firstName }}
                  {{ player.lastName }}</b-form-select-option
                > </b-form-select
              ><br />
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col align="right">
              <b-button type="submit" :to="{path: '/player/' + player}" variant="secondary">View Player</b-button>
            </b-col>
          </b-row>
        </b-form>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "PlayerListCondensed",
  props: {
    player: Number,
    squad: Array,
  },
};
</script>

