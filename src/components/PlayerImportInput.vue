<template>
  <div>
    <b-alert
      :show="validation.content"
      class="position-fixed fixed-top m-0 rounded-0"
      style="z-index: 2000"
      variant="danger"
    >
      Please enter player details
    </b-alert>
    <b-alert
      :show="validation.server"
      class="position-fixed fixed-top m-0 rounded-0"
      style="z-index: 2000"
      variant="danger"
    >
      There was an error connecting to the server
    </b-alert>
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
                <b-button block class="mt-3" variant="secondary" type="submit"
                  >Extract Player Details</b-button
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
      validation: {
        content: false,
        server: false
      }
    };
  },
  methods: {
    async importPlayer() {
      this.validation.server = false;
      this.validation.content = false;
      if (this.isValid()) {
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
            console.log(response);
            this.parseResult = response.data;
            this.parseResult.team = { teamId: "20045" };
          })
          .catch((response) => {
            console.log(response);
          });
        this.$emit("parseResult", this.parseResult);
      }
    },
    isValid() {
      if (this.textEntered.length == 0) this.validation.content = true;

      return this.validation;
    },
  },
};
</script>
