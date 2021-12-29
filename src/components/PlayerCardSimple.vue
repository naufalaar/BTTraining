<template>
  <div>
    <b-card bg-variant="primary" text-variant="light">
      <b-card-text>
        <h2 class="text-secondary">
          {{ player.firstName }} {{ player.lastName }} <b-badge pill variant="secondary" > {{ player.playerType }} </b-badge> <b-badge v-if="player.playerStatus != 'Active'" pill variant="warning"> {{ player.playerStatus }} </b-badge>
        </h2>
        <h5>
          <span class="text-secondary">{{ player.age }} Year Old </span>
          <span v-if="player.playerType == 'Batter'" class="capitalize"> {{ player.battingAggression }} {{ player.battingHand }} Batter</span>
          <span v-else-if="player.playerType == 'Bowler'" class="capitalize"> {{ player.bowlingAggression }} {{ player.bowlerType }} Bowler</span>
          <span v-else-if="player.playerType == 'All Rounder'" class="capitalize"> {{ player.battingAggression }} {{ player.battingHand }} Batter and {{ player.bowlingAggression }} {{ player.bowlerType }} Bowler</span>
          <span v-else-if="player.playerType == 'Wicket Keeper'" class="capitalize"> {{ player.battingAggression }} {{ player.battingHand }} Wicket Keeper Bat</span>
          <span v-else-if="player.playerType == 'Useless'" class="capitalize"> Useless Player</span>
        </h5>
        <h5>
          Wages:
          <span class="text-secondary"
            >£{{ player.wage.toLocaleString() }}</span
          >
          p/w
        </h5>
        <h5>
          Preference:
          <span class="text-secondary capitalize">{{ player.preference }}</span>
        </h5>
        <h5>
          Trait:
          <span class="text-secondary capitalize">{{ player.trait }}</span>
        </h5>
        <br />
        <b-row>
          <b-col> <h5 class="text-light text-right">Stamina:</h5></b-col>
          <b-col align-self="center"
            ><h5 class="text-secondary capitalize">
              {{ player.stamina }}
            </h5></b-col
          >
          <b-col> <h5 class="text-light text-right">Batting:</h5></b-col>
          <b-col align-self="center"
            ><h5 class="text-secondary capitalize">
              {{ player.batting }}
            </h5></b-col
          >
          <b-col> <h5 class="text-light text-right">Bowling:</h5></b-col>
          <b-col align-self="center"
            ><h5 class="text-secondary capitalize">
              {{ player.bowling }}
            </h5></b-col
          >
          <b-col> <h5 class="text-light text-right">Fielding:</h5></b-col>
          <b-col align-self="center"
            ><h5 class="text-secondary capitalize">
              {{ player.fielding }}
            </h5></b-col
          >
        </b-row>
        <b-row>
          <b-col></b-col>
          <b-col align-self="center"></b-col>
          <b-col> <h5 class="text-light text-right">Conc:</h5></b-col>
          <b-col align-self="center"
            ><h5 class="text-secondary capitalize">
              {{ player.concentration }}
            </h5></b-col
          >
          <b-col> <h5 class="text-light text-right">Cons:</h5></b-col>
          <b-col align-self="center"
            ><h5 class="text-secondary capitalize">
              {{ player.consistency }}
            </h5></b-col
          >
          <b-col> <h5 class="text-light text-right">Keeping:</h5></b-col>
          <b-col align-self="center"
            ><h5 class="text-secondary capitalize">
              {{ player.wicketKeeping }}
            </h5></b-col
          >
        </b-row>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "PlayerCardSimple",
  props: {
    player: Object,
  },
};
</script>

<style scoped>
.capitalize {
  text-transform: capitalize;
}
</style>