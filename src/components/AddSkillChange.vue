<template>
  <div>
    <b-row>
      <b-col
        ><b-form-group id="input-player" label="Player:" label-for="player">
          <b-form-select
            id="player"
            :options="playerList"
            v-model="selectedPlayer"
          >
            <template #first>
              <b-form-select-option value="0"></b-form-select-option>
            </template>
          </b-form-select> </b-form-group
      ></b-col>
      <b-col></b-col>
      <b-col></b-col>
      <b-col></b-col>
      <b-col align-self="center">
        <b-overlay
            :show="show"
            variant="dark"
            opacity="0.9"
            spinner-small
            spinner-variant="secondary"
          >
        <b-button
          block
          variant="secondary"
          class="mt-2"
          v-on:click="addSkillChange()"
          :disabled="selectedPlayer == 0"
        >
          Add Skill Change
        </b-button></b-overlay></b-col>
    </b-row>
    <b-row v-if="selectedPlayer != 0">
      <b-col
        ><b-form-group id="input-season" label="Season:" label-for="season">
          <b-form-select
            id="season"
            :options="seasons"
            v-model="selectedSeason"
          ></b-form-select> </b-form-group
      ></b-col>
      <b-col
        ><b-form-group id="input-week" label="Week:" label-for="week">
          <b-form-select
            id="week"
            :options="week"
            v-model="selectedWeek"
          ></b-form-select> </b-form-group
      ></b-col>
      <b-col
        ><b-form-group id="input-skill" label="Skill:" label-for="skill">
          <b-form-select
            id="skill"
            :options="playerSkills"
            v-model="selectedSkill"
          ></b-form-select> </b-form-group
      ></b-col>
      <b-col
        ><b-form-group
          id="input-previous"
          label="Previous Skill:"
          label-for="previous"
        >
         <b-form-select
            id="previous"
            :options="staminaSkills"
            v-model="selectedPreviousSkill"
            v-if="selectedSkill == 'stamina'"
          ></b-form-select>
          <b-form-select
            id="previous"
            :options="skills"
            v-model="selectedPreviousSkill"
            v-else
          ></b-form-select> </b-form-group
      ></b-col>
      <b-col
        ><b-form-group id="input-new" label="New Skill:" label-for="new">
          <b-form-select
            id="new"
            :options="staminaSkills"
            v-model="selectedNewSkill"
            v-if="selectedSkill == 'stamina'"
          ></b-form-select>
          <b-form-select
            id="new"
            :options="skills"
            v-model="selectedNewSkill"
            v-else
          ></b-form-select> </b-form-group
      ></b-col>
      <b-col
        ><b-form-group id="input-type" label="Type:" label-for="type">
          <b-form-select
            id="type"
            :options="type"
            v-model="selectedType"
          ></b-form-select> </b-form-group
      ></b-col>
    </b-row>
    <div class="border-0">
      <PopHistory
        v-if="selectedPlayer != 0"
        v-bind:trainingHistory="trainingHistory"
      />
    </div>
  </div>
</template>

<script>
import PopHistory from "./PopHistory.vue";
import axios from "axios";

export default {
  name: "AddSkillChange",
  components: { PopHistory },
  data() {
    return {
      show: false,
      selectedPlayer: 0,
      selectedSkill: "stamina",
      selectedSeason: this.$store.state.currentWeek.season,
      selectedWeek: this.$store.state.currentWeek.week,
      selectedPreviousSkill: "worthless",
      selectedNewSkill: "abysmal",
      selectedType: "pop",
      type: ["pop", "plop"],
      week: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
      playerSkills: [
        "stamina",
        "batting",
        "concentration",
        "bowling",
        "consistency",
        "fielding",
        "wicketKeeping",
      ],
    };
  },
  computed: {
    squad() {
      return this.$store.state.squad;
    },
    skills() {
      return this.$store.state.skills;
    },
    staminaSkills() {
      return this.$store.state.staminaSkills;
    },
    playerList() {
      return this.squad.map(function (player) {
        return {
          value: player.playerId,
          text: player.firstName + " " + player.lastName,
        };
      });
    },
    player() {
      for (let player of this.squad) {
        if (player.playerId == this.selectedPlayer) {
          return player;
        }
      }
      return null;
    },
    trainingHistory() {
      return this.sortBySession(this.player.playerSkillChanges);
    },
    seasons() {
      return Array.from(
        new Array(this.$store.state.currentWeek.season - 51),
        (x, i) => i + 52
      );
    },
  },
  methods: {
    sortBySession(sortable) {
      return sortable.sort((a, b) =>
        a.season < b.season
          ? 1
          : a.season === b.season
          ? a.week < b.week
            ? 1
            : -1
          : -1
      );
    },
    async addSkillChange() {
      this.show = true;
      if (this.isValid()) {
        const headers = {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.$store.state.jwtToken,
        };
        const skillChange = {
          previousLevel: this.selectedPreviousSkill,
          newLevel: this.selectedNewSkill,
          type: this.selectedType,
          season: this.selectedSeason,
          week: this.selectedWeek,
          playerSkillChanges: { playerId: this.selectedPlayer },
          teamSkillChanges: { teamId: this.$store.state.currentTeam.teamId },
          skill: this.selectedSkill,
        };
        await axios
          .post(process.env.VUE_APP_ROOT_API + "saveHistoricSkillChange", skillChange, {
            headers: headers,
          })
          .then((response) => {
            this.$store.dispatch("setSquad", response.data);
          })
          .catch((response) => {
            this.$bvToast.toast(`Error while saving ` + this.selectedType, {
              title: "Save Failed",
              autoHideDelay: 5000,
              appendToast: true,
              noCloseButton: true,
              variant: "danger",
            });
          });
      }
      this.show = false;
    },
    isValid() {
      if (
        this.selectedSeason >= this.$store.state.currentWeek.season &&
        this.selectedWeek >= this.$store.state.currentWeek.week
      ) {
        this.$bvToast.toast(
          `Season and Week combo cannot be for current or future week`,
          {
            title: "Invalid Session",
            autoHideDelay: 5000,
            appendToast: true,
            noCloseButton: true,
            variant: "danger",
          }
        );
        return false;
      }
      if (this.selectedSkill == "stamina") {
        if (
          Math.abs(
            this.getStaminaSkillIndex(this.selectedNewSkill) -
              this.getStaminaSkillIndex(this.selectedPreviousSkill)
          ) != 1
        ) {
          this.$bvToast.toast(`Please check Previous and New Level`, {
            title: "Invalid Record",
            autoHideDelay: 5000,
            appendToast: true,
            noCloseButton: true,
            variant: "danger",
          });
          return false;
        }
        if (
          this.selectedType == "pop" &&
          this.getStaminaSkillIndex(this.selectedNewSkill) <
            this.getStaminaSkillIndex(this.selectedPreviousSkill)
        ) {
          this.$bvToast.toast(
            `Previous Level cannot be higher than New Level`,
            {
              title: "Invalid Record",
              autoHideDelay: 5000,
              appendToast: true,
              noCloseButton: true,
              variant: "danger",
            }
          );
          return false;
        }
        if (
          this.selectedType == "plop" &&
          this.getStaminaSkillIndex(this.selectedNewSkill) >
            this.getStaminaSkillIndex(this.selectedPreviousSkill)
        ) {
          this.$bvToast.toast(`Previous Level cannot be lower than New Level`, {
            title: "Invalid Record",
            autoHideDelay: 5000,
            appendToast: true,
            noCloseButton: true,
            variant: "danger",
          });
          return false;
        }
      } else {
        if (
          Math.abs(
            this.getSkillIndex(this.selectedNewSkill) -
              this.getSkillIndex(this.selectedPreviousSkill)
          ) != 1
        ) {
          this.$bvToast.toast(`Please check Previous and New Level`, {
            title: "Invalid Record",
            autoHideDelay: 5000,
            appendToast: true,
            noCloseButton: true,
            variant: "danger",
          });
          return false;
        }
        if (
          this.selectedType == "pop" &&
          this.getSkillIndex(this.selectedNewSkill) <
            this.getSkillIndex(this.selectedPreviousSkill)
        ) {
          this.$bvToast.toast(
            `Previous Level cannot be higher than New Level`,
            {
              title: "Invalid Record",
              autoHideDelay: 5000,
              appendToast: true,
              noCloseButton: true,
              variant: "danger",
            }
          );
          return false;
        }
        if (
          this.selectedType == "plop" &&
          this.getSkillIndex(this.selectedNewSkill) >
            this.getSkillIndex(this.selectedPreviousSkill)
        ) {
          this.$bvToast.toast(`Previous Level cannot be lower than New Level`, {
            title: "Invalid Record",
            autoHideDelay: 5000,
            appendToast: true,
            noCloseButton: true,
            variant: "danger",
          });
          return false;
        }
      }
      return true;
    },
    getSkillIndex(skill) {
      return this.skills.findIndex((o) => o == skill);
    },
    getStaminaSkillIndex(skill) {
      return this.staminaSkills.findIndex((o) => o == skill);
    },
  },
};
</script>

<style>
</style>
