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
              ><b-form-select-option :value="null"></b-form-select-option
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
        <b-col align-self="center">
          <!-- <b-button block type="submit" variant="secondary"
            >Copy Previous</b-button
          > -->
        </b-col>
        <b-col align-self="center"
          ><b-button
            v-on:click="addPlayer"
            block
            type="submit"
            variant="secondary"
            :disabled="!isValidNets()"
            >Add Player</b-button
          ></b-col
        >
        <b-col align-self="center"
          ><b-button
            v-on:click="saveTrainingSessions()"
            block
            type="submit"
            variant="secondary"
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
              :disabled="training.id != ''"
              ><template #first>
                <b-form-select-option
                  value=""
                ></b-form-select-option> </template
            ></b-form-select>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group id="input-net" label="Net:" label-for="net">
            <b-form-select
              id="net"
              :options="trainingSkills"
              v-model="training.net"
              :disabled="training.id != ''"
              ><template #first>
                <b-form-select-option
                  value=""
                ></b-form-select-option> </template
            ></b-form-select>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group
            id="quantity-net"
            label="Quantity:"
            label-for="quantity"
          >
            <b-form-select
              id="quantity"
              v-model="training.quantity"
              :options="netQuantity"
            ></b-form-select>
          </b-form-group>
        </b-col>
        <b-col align-self="center">
          <b-button block size="sm" v-if="
              training.player == '' &&
              training.quantity == 0 &&
              training.net == ''
            "
            v-on:click="removePlayer(index)"
            variant="outline-secondary"
            class="mt-2"
          >
            <b-icon icon="trash" aria-hidden="true"></b-icon> Delete Row
          </b-button></b-col
        >
        <b-col> </b-col>
        <b-col> </b-col>
      </b-row>
    </b-card-text>
  </b-card>
</template>

<script>
import axios from "axios";

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
              team: item.team
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
      this.selectedSession.push({ id: "", net: "", player: "", quantity: 0 });
    },
    removePlayer(index) {
      this.selectedSession.splice(index, 1);
    },
    async saveTrainingSessions() {
      if(!this.canSave()){
        this.$bvToast.toast(`Please enter proper net details`, {
          title: 'Invalid Nets',
          autoHideDelay: 5000,
          appendToast: true,
          noCloseButton: true,
          variant: "danger"
        })
      }else{
      let sessionsList = [];
      for (let session of this.selectedSession) {
        let tempSession = {};
        tempSession["id"] = session.id;
        tempSession["net"] = session.net;
        tempSession["player"] = { playerId: session.player };
        tempSession["quantity"] = session.quantity;
        tempSession["season"] = this.selectedSeason;
        tempSession["week"] = this.selectedWeek;
        tempSession["team"] = session.team != null ? session.team : { teamId: this.$store.state.currentTeam.teamId };
        sessionsList.push(tempSession);
      }
      console.log(sessionsList);
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$store.state.jwtToken,
      };
      await axios
        .post(
          process.env.VUE_APP_ROOT_API + "saveMultipleSessions",
          sessionsList,
          { headers: headers }
        )
        .then((response) => {
          this.$bvToast.toast(`Nets saved successfully`, {
          title: 'Save Success',
          autoHideDelay: 5000,
          appendToast: true,
          noCloseButton: true,
          variant: "info"
        })
          this.$emit("newHistory", response.data);
        })
        .catch((response) => {
          this.$bvToast.toast(`Error while saving nets`, {
          title: 'Save Failed',
          autoHideDelay: 5000,
          appendToast: true,
          noCloseButton: true,
          variant: "danger"
        })
        });
      }
    },
    isValidNets(){
      let quantity = 0;
      for (let session of this.selectedSession){
        quantity += session.quantity;
        if (quantity > 10)
          return false;
      }
      return true;
    },
    isValidSession(){
      for (let session of this.selectedSession){
        if (session.id == '' && session.quantity == 0)
          return false;
        if (session.player == '' || session.net == '' )
          return false;
      } 
      return true;
    },
    canSave(){
      return this.isValidNets() && this.isValidSession();
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
        {value:"WicketKeeping", text:"Wicket Keeping"},
      ],
      netQuantity: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    };
  },
};
</script>

