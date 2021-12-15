<template>
  <div>
    <NavigationBar />
    <b-container fluid>
      <PlayerImportInput @parseResult="parseResult($event)" />
      <PlayerImportDetail v-bind:player="player"/>
    </b-container>
  </div>
</template>

<script>
import NavigationBar from "../components/NavigationBar.vue";
import PlayerImportInput from "../components/PlayerImportInput.vue";
import PlayerImportDetail from "../components/PlayerImportDetail.vue";

export default {
  components: { NavigationBar, PlayerImportInput, PlayerImportDetail },
  data(){
    return{
      player: {},
    }
  },
  methods: {
    parseResult(parseResult){
      this.player = parseResult;
    }
  }
};
</script>

<style lang="scss"></style>
