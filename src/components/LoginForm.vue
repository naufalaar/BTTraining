<template>
  <div>
    <b-alert
      :show="validation.invalid"
      class="position-fixed fixed-top m-0 rounded-0"
      style="z-index: 2000"
      variant="danger"
    >Username and/or password incorrect. Please check your credentials</b-alert>
    <b-alert
      :show="validation.serverError"
      class="position-fixed fixed-top m-0 rounded-0"
      style="z-index: 2000"
      variant="danger"
    >
      There was an error connecting to the server
    </b-alert>
    <div class="py-4">
      <b-avatar
        rounded
        variant="secondary"
        text="BTT"
        class="mb-3"
        size="72px"
      ></b-avatar>
      <h1 class="text">BT Training Tracker</h1>
    </div>
    <b-form @submit.prevent="validateLogin" class="px-5 pb-5">
      <b-form-group id="input-group-1" label-for="input-1">
        <b-form-input
          v-model="credentials.username"
          id="input-1"
          type="text"
          placeholder="Enter Username"
          :state="validation.username"
        ></b-form-input>
        <b-form-invalid-feedback :state="validation.username">
          Please enter a username
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="input-group-2" label-for="input-2">
        <b-form-input
          v-model="credentials.password"
          id="input-2"
          type="password"
          placeholder="Enter Password"
          :state="validation.password"
        ></b-form-input>
        <b-form-invalid-feedback :state="validation.password">
          Please enter your password
        </b-form-invalid-feedback>
      </b-form-group>
      <b-button block type="submit" variant="secondary">Login</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router";

export default {
  name: "LoginForm",
  data() {
    return {
      credentials: {
        username: "",
        password: "",
      },
      validation: {
        username: undefined,
        password: undefined,
        invalid: false,
        serverError: false,
      },
    };
  },
  methods: {
    async validateLogin() {
      this.validation.invalid = false;
      this.validation.serverError = false;
      if (this.isValid()) {
        await axios
          .post(process.env.VUE_APP_ROOT_API + "login", this.credentials)
          .then((response) => {
            this.$store.dispatch(
              "setToken",
              response.headers.authorization.split(" ")[1]
            );
            const headers = {
              "Content-Type": "application/json",
              Authorization: response.headers.authorization,
            };
            axios
              .post(
                process.env.VUE_APP_ROOT_API + "getManagerByUsername",
                { username: this.credentials.username },
                { headers: headers }
              )
              .then((response) => {
                  response.data.password="",
                this.$store.dispatch(
                  "setManager",
                  response.data
                );
                let mainTeam = response.data.mainTeam;
                mainTeam["type"] = "Main";
                this.$store.dispatch(
                  "setTeam",
                  mainTeam
                );
              })
              .catch((error) => {
                if (String(error).indexOf("403") > -1)
                  this.validation.invalid = true;
                else this.validation.serverError = true;
              });
              axios
              .post(
                process.env.VUE_APP_ROOT_API + "getCurrentWeek",
                null,
                { headers: headers }
              )
              .then((response) => {
                this.$store.dispatch(
                  "setCurrentWeek",
                  {"season": response.data[0],"week": response.data[1]}
                );
                router.push("/summary");
              })
              .catch((error) => {
                if (String(error).indexOf("403") > -1)
                  this.validation.invalid = true;
                else this.validation.serverError = true;
              });
          })
          .catch((error) => {
            console.log(error);
            if (String(error).indexOf("403") > -1)
              this.validation.invalid = true;
            else this.validation.serverError = true;
          });
      }
    },
    isValid() {
      let userLength = this.credentials.username.length;
      let passLength = this.credentials.password.length;
      if (userLength == 0) this.validation.username = false;
      else this.validation.username = true;
      if (passLength == 0) this.validation.password = false;
      else this.validation.password = true;
      return userLength > 0 && passLength > 0;
    },
  },
};
</script>
