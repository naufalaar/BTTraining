<template>
  <b-card bg-variant="primary" text-variant="light">
    <b-card-text>
      <h1 class="text-secondary">Last Recorded Nets</h1>
      <b-row>
        <b-col>
          <b-form-group id="input-group-1" label="Season:" label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="selectedSeason"
              :options="seasons"
              disabled
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group id="input-group-1" label="Week:" label-for="input-1">
            <b-form-input
              v-model="selectedWeek"
              :options="weeks"
              disabled
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col align-self="center"></b-col>
        <b-col align-self="center"></b-col>
      </b-row>
      <b-row v-for="index in 10" :key="index" class="pt-2">
        <b-col cols="2" align-self="center">
          <h5 class="text-light text-right">Net {{ index }}:</h5>
        </b-col>
        <b-col>
          <b-form-select
            v-model="selectedTraining[index - 1].skill"
            :options="trainingSkills"
            disabled
          ></b-form-select>
        </b-col>
        <b-col>
          <b-form-select
            v-model="selectedTraining[index - 1].player"
            :options="players"
            disabled
          ></b-form-select>
        </b-col>
        <b-col cols="1"> </b-col>
      </b-row>
    </b-card-text>
  </b-card>
</template>

<script>
export default {
  name: "LastNets",
  data() {
    return {
      selectedSeason: "53",
      selectedWeek: "16",
      selectedTraining: [
        {
          skill: "",
          player: "",
        },
        {
          skill: "",
          player: "",
        },
        {
          skill: "",
          player: "",
        },
        {
          skill: "",
          player: "",
        },
        {
          skill: "",
          player: "",
        },
        {
          skill: "",
          player: "",
        },
        {
          skill: "",
          player: "",
        },
        {
          skill: "",
          player: "",
        },
        {
          skill: "",
          player: "",
        },
        {
          skill: "",
          player: "",
        },
      ],
      players: ["Teddy", "Nicky"],
      trainingSkills: [
        "Stamina",
        "Batting",
        "Bowling",
        "Fielding",
        "Wicket Keeping",
      ],
      seasons: [
        { value: "53", text: "Season 53" },
        { value: "52", text: "Season 52" },
      ],
      weeks: [
        { value: "16", text: "Week 16" },
        { value: "15", text: "Week 15" },
      ],
    };
  },
};
</script>

