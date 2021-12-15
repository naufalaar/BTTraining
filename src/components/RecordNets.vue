<template>
  <b-card bg-variant="primary" text-variant="light">
    <b-card-text>
      <!-- <h3 class="text-secondary">Nets</h3> -->

      <h1 class="text-secondary">Training Session</h1>
      <b-row>
        <b-col>
          <b-form-group id="input-season" label="Season:" label-for="season">
            <b-form-select
              id="season"
              v-model="selectedSeason"
              :options="seasons"
            ></b-form-select>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group id="input-week" label="Week:" label-for="week">
            <b-form-select
              id="week"
              v-model="selectedWeek"
              :options="weeks"
            ></b-form-select>
          </b-form-group>
        </b-col>
        <b-col></b-col>
        <b-col align-self="center"
          ><b-button
            v-on:click="addPlayer"
            block
            type="submit"
            variant="secondary"
            >Add Player</b-button
          ></b-col
        >
        <b-col align-self="center"
          ><b-button block type="submit" variant="secondary"
            >Copy Previous</b-button
          ></b-col
        >
        <b-col align-self="center"
          ><b-button v-on:click="saveTrainingSessions()" block type="submit" variant="secondary"
            >Save Nets</b-button
          ></b-col
        >
      </b-row>
      <b-row v-if="selectedSession.length == 0">
        <b-col class="text-danger">
          No nets available, Click on Add Player to add training sessions
        </b-col>
      </b-row>
      <b-row v-for="(training, index) in selectedSession" :key="index.id">
        <b-col>
          <b-form-group id="input-player" label="Player:" label-for="player">
            <b-form-select
              id="player"
              :options="playerList"
              v-model="training.player"
            ></b-form-select>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group id="input-net" label="Net:" label-for="net">
            <b-form-select
              id="net"
              :options="trainingSkills"
              v-model="training.net"
            ></b-form-select>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group
            id="quantity-net"
            label="Quantity:"
            label-for="quantity"
          >
            <b-form-input
              id="quantity"
              v-model="training.quantity"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col align-self="center">
          <b-button v-on:click="removePlayer(index)" variant="secondary" class="mb-2">
            <b-icon icon="trash" aria-hidden="true"></b-icon> Delete
          </b-button></b-col
        >
        <b-col> </b-col>
        <b-col> </b-col>
      </b-row>
    </b-card-text>
  </b-card>
</template>

<script>
import axios from 'axios';

export default {
  name: "RecordNets",
  props: {
    selectedSeason: Number,
    selectedWeek: Number,
    seasons: Array,
    trainingHistory: Array,
    squad: Array,
  },
  computed: {
    playerList() {
      return this.squad.map(function (player) {
        return {
          value: player.playerId,
          text: player.firstName + " " + player.lastName,
        };
      });
    },
    formattedSessions() {
      let trainingSeason = {};
      for (let season of this.seasons) {
        let trainingWeek = {};
        for (let week of this.weeks) {
          let filtered = this.trainingHistory.filter(function (item) {
            return item.season == season && item.week == week;
          });
          let arr = filtered.map(function (item) {
            return {
              id: item.id,
              net: item.net,
              player: item.player,
              quantity: item.quantity,
            };
          });
          trainingWeek[week] = arr;
        }
        trainingSeason[season] = trainingWeek;
      }
      return trainingSeason;
    },
  },
  watch: {
    formattedSessions: function (value) {
      this.selectedSession = value[this.selectedSeason][this.selectedWeek];
    },
    selectedSeason: function (value) {
      this.selectedSession = this.formattedSessions[value][this.selectedWeek];
      console.log(this.selectedSession);
    },
    selectedWeek: function (value) {
      this.selectedSession = this.formattedSessions[this.selectedSeason][value];
      console.log(this.selectedSession);
    },
  },
  methods: {
    getFormattedSessions() {},
    addPlayer() {
      this.selectedSession.push({ id: "", net: "", player: "", quantity: "" });
    },
    removePlayer(index) {
      this.selectedSession.splice(index,1);
    },
    async saveTrainingSessions(){
      let sessionsList = [];
      for(let session of this.selectedSession){
        let tempSession = {};
        tempSession["id"] = session.id;
        tempSession["net"] = session.net;
        tempSession["player"] = {"playerId":session.player};
        tempSession["quantity"] = session.quantity;
        tempSession["season"] = this.selectedSeason;
        tempSession["week"] = this.selectedWeek;
        sessionsList.push(tempSession);
      }
      const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.$store.state.jwtToken
    }
      await axios.post("https://bttraining-api-test.herokuapp.com/saveMultipleSessions", sessionsList , { headers: headers })
            .then(response => {
                console.log("Sessions saved");
                })
            .catch(response => {console.log(response)});
    }
  },
  data() {
    return {
      selectedSession: [],
      weeks: [16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
      trainingSkills: [
        "Stamina",
        "Batting",
        "Bowling",
        "Fielding",
        "Wicket Keeping",
      ],
    };
  },
};
</script>

