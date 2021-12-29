<template>
  <div>
    <b-alert
      :show="validation.invalid"
      class="position-fixed fixed-top m-0 rounded-0"
      style="z-index: 2000"
      variant="danger"
      >Username and / or Team ID already exists. Please try logging in.</b-alert
    >
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

    <b-form @submit.prevent="validateLogin" class="pb-5">
      <b-row>
        <b-col>
          <b-form-group id="input-group-1" label-for="input-1">
            <b-form-input
              v-model="manager.username"
              id="input-1"
              type="text"
              placeholder="Username"
              :state="validation.username"
            ></b-form-input>
            <b-form-invalid-feedback :state="validation.username">
              Invalid Username
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group id="input-group-2" label-for="input-2">
            <b-form-input
              v-model="manager.password"
              id="input-2"
              type="password"
              placeholder="Password"
              :state="validation.password"
            ></b-form-input>
            <b-form-invalid-feedback :state="validation.password">
              Invalid Password
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group id="input-group-3" label-for="input-3">
            <b-form-input
              v-model="manager.mainTeam.teamId"
              id="input-3"
              type="text"
              placeholder="Main Team ID"
              :state="validation.mainId"
            ></b-form-input>
            <b-form-invalid-feedback :state="validation.mainId">
              Invalid Team ID
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group id="input-group-4" label-for="input-4">
            <b-form-input
              v-model="manager.mainTeam.teamName"
              id="input-4"
              type="text"
              placeholder="Main Team Name"
              :state="validation.mainName"
            ></b-form-input>
            <b-form-invalid-feedback :state="validation.mainName">
              Invalid Team Name
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group id="input-group-5" label-for="input-5">
            <b-form-input
              v-model="manager.franchise.teamId"
              id="input-5"
              type="text"
              placeholder="Franchise Team ID"
              :state="validation.franchiseId"
            ></b-form-input>
            <b-form-invalid-feedback :state="validation.franchiseId">
              Invalid Team ID
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group id="input-group-6" label-for="input-6">
            <b-form-input
              v-model="manager.franchise.teamName"
              id="input-6"
              type="text"
              placeholder="Franchise Team Name"
              :state="validation.franchiseName"
            ></b-form-input>
            <b-form-invalid-feedback :state="validation.franchiseName">
              Invalid Team Name
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-row>
      <b-overlay
            :show="show"
            variant="dark"
            opacity="0.9"
            spinner-small
            spinner-variant="secondary"
          >
      <b-button block type="submit" variant="secondary">Register</b-button>
      </b-overlay>
    </b-form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Register",
  data() {
    return {
      show: false,
      manager: {
        username: "",
        password: "",
        mainTeam: {
          teamId: "",
          teamName: "",
        },
        franchise: {
          teamId: "",
          teamName: "",
        },
      },
      validation: {
        username: undefined,
        password: undefined,
        mainId: undefined,
        mainName: undefined,
        franchiseId: undefined,
        franchiseName: undefined,
        serverError: false,
        invalid: false,
      },
    };
  },
  methods: {
    async validateLogin() {
      this.show = true;
      this.validation.serverError = false;
      this.validation.invalid = false;
      if (this.isValid()) {
        await axios
          .post(process.env.VUE_APP_ROOT_API + "sign-up", this.manager)
          .then((response) => {
            this.$bvToast.toast(
              `Manager ${this.manager.username} registered successfully. Please login`,
              {
                title: "Registration Success",
                autoHideDelay: 5000,
                appendToast: true,
                noCloseButton: true,
                variant: "info",
              }
            );
            this.$emit("registered");
          })
          .catch((error) => {
            if (String(error).indexOf("500") > -1)
              this.validation.invalid = true;
            else this.validation.serverError = true;
          });
      }
      this.show = false;
    },
    isValid() {
      if (this.manager.username.length == 0) this.validation.username = false;
      else this.validation.username = true;

      if (this.manager.password.length == 0) this.validation.password = false;
      else this.validation.password = true;

      if (
        this.manager.mainTeam.teamId.length > 0 &&
        !isNaN(this.manager.mainTeam.teamId)
      )
        this.validation.mainId = true;
      else this.validation.mainId = false;

      if (this.manager.mainTeam.teamName.length == 0)
        this.validation.mainName = false;
      else this.validation.mainName = true;

      if (
        this.manager.franchise.teamName.length == 0 &&
        this.manager.franchise.teamId.length > 0
      )
        this.validation.franchiseName = false;
      else this.validation.franchiseName = true;

      if (
        (this.manager.franchise.teamId.length == 0 &&
          this.manager.franchise.teamName.length > 0) ||
        isNaN(this.manager.franchise.teamId)
      )
        this.validation.franchiseId = false;
      else this.validation.franchiseId = true;

      return (
        this.validation.username &&
        this.validation.password &&
        this.validation.mainId &&
        this.validation.mainName &&
        this.validation.franchiseId &&
        this.validation.franchiseName
      );
    },
  },
};
</script>
