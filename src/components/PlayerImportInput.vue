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
                <b-overlay
                  :show="show"
                  variant="dark"
                  opacity="0.9"
                  spinner-small
                  spinner-variant="secondary"
                >
                  <b-button
                    block
                    class="mt-3"
                    variant="secondary"
                    type="submit"
                    :disabled="textEntered == 0"
                    >Extract Player Details</b-button
                  ></b-overlay
                >
              </b-col>
            </b-row>
          </b-container>
        </b-form>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PlayerImportInput",
  data() {
    return {
      textEntered: "",
      parseResult: "",
      show: false,
    };
  },
  methods: {
    async importPlayer() {
      this.show = true;
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$store.state.jwtToken,
      };
      await axios
        .post(
          process.env.VUE_APP_ROOT_API + "parsePlayer",
          this.textEntered.replace(/\n/g, " "),
          { headers: headers }
        )
        .then((response) => {
          this.parseResult = response.data;
          this.parseResult.team = {
            teamId: this.$store.state.currentTeam.teamId,
          };
        })
        .catch((response) => {
          this.$bvToast.toast(`Error while parsing player`, {
            title: "Parsing Failed",
            autoHideDelay: 5000,
            appendToast: true,
            noCloseButton: true,
            variant: "danger",
          });
        });
      this.$emit("parseResult", this.parseResult);
      this.show = false;
    },
  },
};
</script>
