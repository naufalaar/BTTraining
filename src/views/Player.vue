<template>
  <div>
    <NavigationBar />
    <b-container fluid>
      <b-row align-v="stretch">
        <b-col>
          <b-row>
            <b-col class="mt-4">
              <PlayerCard v-bind:player="player" />
            </b-col>
          </b-row>
          <b-row>
            <b-col class="mt-4">
              <PopHistory v-bind:trainingHistory="trainingHistory" />
            </b-col>
          </b-row>
          <b-row>
            <b-col class="mt-4">
              <NetsHistory v-bind:netHistory="netHistory" />
            </b-col>
          </b-row>
        </b-col>
        <b-col cols="2">
          <PlayerListCondensed v-bind:player="player.playerId" v-bind:squad="squad" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import NavigationBar from "../components/NavigationBar.vue";
import PlayerListCondensed from "../components/PlayerListCondensed.vue";
import PlayerCard from "../components/PlayerCard.vue";
import PopHistory from "../components/PopHistory.vue";
import NetsHistory from "../components/NetsHistory.vue";
import router from "../router";

export default {
  components: {
    NavigationBar,
    PlayerListCondensed,
    PlayerCard,
    PopHistory,
    NetsHistory,
  },
  computed: {
    squad () {
      return this.$store.state.squad
    },
    player(){
      for(let player of this.squad){
        if (player.playerId == this.$route.params.id){
          if(player.team != this.$store.state.currentTeam.teamId)
            router.push("/summary");
          else
            return player;
        }
      }
      router.push("/summary");
      return null;
    },
    netHistory(){
      return this.sortBySession(this.player.trainingSessions)
    },
    trainingHistory(){
      return this.sortBySession(this.player.playerSkillChanges)
    },
  },
  methods: {
    sortBySession(sortable){
      return sortable.sort((a, b) => (a.season < b.season) ? 1 : (a.season === b.season) ? ((a.week < b.week) ? 1 : -1) : -1 )
    }
  }
};
</script>
