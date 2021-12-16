<template>
  <div>
    <b-card bg-variant="primary" text-variant="light" class="mt-4">
      <b-card-text>
        <b-form @submit.prevent="importPlayer()">
          <b-container fluid>
            <b-row>
              <b-form-textarea
                id="textarea"
                v-model="textEntered"
                placeholder="Enter something..."
                rows="8"
                max-rows="20"
              ></b-form-textarea>
            </b-row>
            <b-row>
              <b-col></b-col>
              <b-col cols="2">
                <b-button block class="mt-3" variant="secondary" type="submit" :disabled="textEntered==0"
                  >Extract Player Details</b-button
                >
              </b-col>
            </b-row>
          </b-container>
        </b-form>
        {{ }}
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SquadImportInput",
  data() {
    return {
      textEntered: "",
      parseResult: "",
    };
  },
  methods: {
    async importPlayer() {
        const headers = {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.$store.state.jwtToken,
        };
        await axios
          .post(
            process.env.VUE_APP_ROOT_API + "parseSquad",
            this.textEntered.replace(/\n\n/g, "|").replace(/\n/g, " ").split("|"),
            { headers: headers }
          )
          .then((response) => {
            this.parseResult = response.data;
            this.parseResult.map(o=>(o.team={"teamId": this.$store.state.currentTeam.teamId }))
          })
          .catch((response) => {
            this.$bvToast.toast(`Error while parsing squad`, {
          title: 'Parsing Failed',
          autoHideDelay: 5000,
          appendToast: true,
          noCloseButton: true,
          variant: "danger"
        })
          });
        this.$emit("parseResult", this.parseResult);
    },
  },
};
</script>
