<template>
  <div>
    <b-card bg-variant="primary" text-variant="light" class="mt-4">
      <b-card-text>
        <b-form>
        <b-row class="py-2">
          <b-col>
            <label for="playerId">First Name:</label>
            <b-form-input v-model="player.firstName"></b-form-input>
          </b-col>
          <b-col>
            <label for="playerId">Last Name:</label>
            <b-form-input v-model="player.lastName"></b-form-input>
          </b-col>
          <b-col>
            <label for="playerId">Age:</label>
            <b-form-select :options="age" v-model="player.age"></b-form-select>
          </b-col>
          <b-col>
            <label for="playerId">Wage:</label>
            <b-form-input v-model="player.wage"></b-form-input>
          </b-col>
          <b-col> 
          </b-col>
        </b-row>
        <b-row class="py-2">
          <b-col>
            <label for="playerId">Batting Hand:</label>
            <b-form-select v-model="player.battingHand" :options="battingHand"></b-form-select>
          </b-col>
          <b-col>
            <label for="playerId">Batting Aggression:</label>
            <b-form-select v-model="player.battingAggression" :options="aggression"></b-form-select>
          </b-col>
          <b-col>
            <label for="playerId">Bowler Type:</label>
            <b-form-select v-model="player.bowlerType" :options="bowlerType"></b-form-select>
          </b-col>
          <b-col>
            <label for="playerId">Bowler Aggression:</label>
            <b-form-select v-model="player.bowlingAggression" :options="aggression"></b-form-select>
          </b-col>
          <b-col> </b-col>
        </b-row>
        <b-row class="py-2">
          <b-col>
            <label for="playerId">Leadership:</label>
            <b-form-select v-model="player.leadership" :options="leadership"></b-form-select>
          </b-col>
          <b-col>
            <label for="playerId">Experience:</label>
            <b-form-select v-model="player.experience" :options="skills"></b-form-select>
          </b-col>
          <b-col>
            <label for="playerId">Preference:</label>
            <b-form-select v-model="player.preference" :options="preference"></b-form-select>
          </b-col>
          <b-col>
            <label for="playerId">Trait:</label>
            <b-form-select v-model="player.trait" :options="trait"></b-form-select>
          </b-col>
          <b-col> </b-col>
        </b-row>
        <b-row class="py-2">
          <b-col>
            <label for="playerId">Stamina:</label>
            <b-form-select v-model="player.stamina" :options="staminaSkills"></b-form-select>
          </b-col>
          <b-col>
            <label for="playerId">Batting:</label>
            <b-form-select v-model="player.batting" :options="skills"></b-form-select>
          </b-col>
          <b-col>
            <label for="playerId">Bowling:</label>
            <b-form-select v-model="player.bowling" :options="skills"></b-form-select>
          </b-col>
          <b-col>
            <label for="playerId">Wicket Keeping:</label>
            <b-form-select v-model="player.wicketKeeping" :options="skills"></b-form-select>
          </b-col>
          <b-col> </b-col>
        </b-row>
        <b-row class="py-2">
          <b-col> </b-col>
          <b-col>
            <label for="playerId">Concentration:</label>
            <b-form-select v-model="player.concentration" :options="skills"></b-form-select>
          </b-col>
          <b-col>
            <label for="playerId">Consistency:</label>
            <b-form-select v-model="player.consistency" :options="skills"></b-form-select>
          </b-col>
          <b-col>
            <label for="playerId">Fielding:</label>
            <b-form-select v-model="player.fielding" :options="skills"></b-form-select>
          </b-col>
          <b-col align-self="end"></b-col>
        </b-row>
        </b-form>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>

export default {
  name: "SquadImportDetail",
  props: {
      player: Object
    },
  computed: {
    age: function () {
      return this.$store.state.age;
    },
    battingHand: function () {
      return this.$store.state.battingHand;
    },
    aggression: function () {
      return this.$store.state.aggression;
    },
    bowlerType: function () {
      return this.$store.state.bowlerType;
    },
    skills: function () {
      return this.$store.state.skills;
    },
    leadership: function () {
      return this.$store.state.leadership;
    },
    staminaSkills: function () {
      return this.$store.state.staminaSkills;
    },
    preference: function () {
      return this.$store.state.preference;
    },
    trait: function () {
      return this.$store.state.trait;
    },
  },
};
</script>
