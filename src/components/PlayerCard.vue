<template>
  <div>
    <b-card bg-variant="primary" text-variant="light">
      <b-card-text>
        <h1 class="text-secondary">
          {{ player.firstName }} {{ player.lastName }}
          <b-badge pill variant="secondary"> {{ player.playerType }} </b-badge>
        </h1>
        <h5>
          <span class="text-secondary">{{ player.age }} Year Old </span>
          <span v-if="player.playerType == 'Batter'" class="capitalize">
            {{ player.battingAggression }} {{ player.battingHand }} Batter</span
          >
          <span v-else-if="player.playerType == 'Bowler'" class="capitalize">
            {{ player.bowlingAggression }} {{ player.bowlerType }} Bowler</span
          >
          <span
            v-else-if="player.playerType == 'All Rounder'"
            class="capitalize"
          >
            {{ player.battingAggression }} {{ player.battingHand }} Batter and
            {{ player.bowlingAggression }} {{ player.bowlerType }} Bowler</span
          >
          <span
            v-else-if="player.playerType == 'Wicket Keeper'"
            class="capitalize"
          >
            {{ player.battingAggression }} {{ player.battingHand }} Wicket
            Keeper Bat</span
          >
          <span v-else-if="player.playerType == 'Useless'" class="capitalize">
            Useless Player</span
          >
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
        <b-row
          v-for="skill in playerSkills"
          v-bind:key="skill.skillName"
          align-v="center"
        >
          <b-col>
            <h5 class="text-light text-right">{{ skill }}:</h5></b-col
          >
          <b-col align-self="center"
            ><h5 class="text-secondary capitalize">
              {{ player[camelCase(skill)] }}
            </h5></b-col
          >
          <b-col align-self="center" class="text-center">
            <h6 v-if="previousChanges[camelCase(skill)]" > 
              <span :class="previousChanges[camelCase(skill)].type == 'pop' ? 'text-secondary' : 'text-danger'">S{{ previousChanges[camelCase(skill)].season }} W{{ previousChanges[camelCase(skill)].week }}</span>
            </h6>
            <h6 v-else class="text-info">No Pop / Plop History</h6>
          </b-col>
          <b-col align-self="center"
            ><b-button
              v-on:click="recordChange(skill, 'pop')"
              :disabled="isMaxSkill(skill)"
              size="sm"
              block
              type="submit"
              variant="outline-secondary"
              >Pop!</b-button
            >
          </b-col>
          <b-col align-self="center"
            ><b-button
              v-on:click="recordChange(skill, 'plop')"
              :disabled="isMinSkill(skill)"
              size="sm"
              block
              type="submit"
              variant="outline-danger"
              >Plop!</b-button
            ></b-col
          >
          <b-col></b-col>
        </b-row>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PlayerCard",
  props: {
    player: Object,
  },
  data() {
    return {
      playerSkills: [
        "Stamina",
        "Batting",
        "Concentration",
        "Bowling",
        "Consistency",
        "Fielding",
        "Wicket Keeping",
      ],
    };
  },
  computed: {
    skills() {
      return this.$store.state.skills;
    },
    staminaSkills() {
      return this.$store.state.staminaSkills;
    },
    previousChanges() {
      return this.findLastPops();
    },
  },
  methods: {
    findLastPops(){
      let results = {};
      for (let skill of this.playerSkills) {
        skill = this.camelCase(skill);
        let result = this.player.playerSkillChanges.filter(function (a) {
          return a["skill"] == skill ? true : false;
        });
        if (result[0] != undefined)
          results[result[0].skill] = result[0];
      }
      return results;
    },
    isMaxSkill(skill) {
      if (skill == "Stamina" && this.player[this.camelCase(skill)] == "superb*")
        return true;
      else if (this.player[this.camelCase(skill)] == "elite +10") return true;
      else return false;
    },
    isMinSkill(skill) {
      if (this.player[this.camelCase(skill)] == "worthless") return true;
      else return false;
    },
    camelCase(str) {
      return str
        .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
          return index == 0 ? word.toLowerCase() : word.toUpperCase();
        })
        .replace(/\s+/g, "");
    },
    async recordChange(skill, type) {
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$store.state.jwtToken,
      };
      let newLevel = "";
      if (type == "pop") {
        newLevel =
          this.skills[
            this.skills.indexOf(this.player[this.camelCase(skill)]) + 1
          ];
      } else {
        newLevel =
          this.skills[
            this.skills.indexOf(this.player[this.camelCase(skill)]) - 1
          ];
      }
      const skillChange = {
        previousLevel: this.player[this.camelCase(skill)],
        newLevel: newLevel,
        type: type,
        season: this.$store.state.currentWeek.season,
        week: this.$store.state.currentWeek.week,
        playerSkillChanges: { playerId: this.player.playerId },
        teamSkillChanges: { teamId: this.$store.state.currentTeam.teamId },
        skill: this.camelCase(skill),
      };
      await axios
        .post(process.env.VUE_APP_ROOT_API + "saveSkillChange", skillChange, {
          headers: headers,
        })
        .then((response) => {
           this.$store.dispatch("setSquad", response.data);
        })
        .catch((response) => {
          console.log(response);
        });
    },
  },
};
</script>

<style scoped>
.capitalize {
  text-transform: capitalize;
}
</style>