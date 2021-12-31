<template>
  <div class="background">
    <b-alert
      :show="serverError"
      class="position-fixed fixed-top m-0 rounded-0 text-center"
      style="z-index: 2000"
      variant="danger"
    >
      There was an error connecting to the server
    </b-alert>
    <b-container class="middle">
      <b-row align-h="center" align-v="center">
        <b-col align-self="center" cols="6">
          <b-overlay
            :show="show"
            variant="dark"
            opacity="0.9"
            spinner-variant="secondary"
          >
            <template #overlay>
              <div class="text-center">
                <h1 class="text-secondary">Loading app</h1>
                <h3 class="text-secondary">Please wait</h3>
              </div>
            </template>
            <b-card-group deck>
              <b-card
                bg-variant="primary"
                text-variant="white"
                class="text-center"
              >
                <b-card-text>
                  <b-tabs v-model="tabIndex" card fill end>
                    <b-tab title="Login" :title-link-class="linkClass(0)" active
                      ><b-card-text><LoginForm /></b-card-text
                    ></b-tab>
                    <b-tab title="Register" :title-link-class="linkClass(1)"
                      ><b-card-text
                        ><Register @registered="registered()" /></b-card-text
                    ></b-tab>
                  </b-tabs>
                </b-card-text>
              </b-card>
            </b-card-group>
          </b-overlay>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import LoginForm from "../components/LoginForm.vue";
import Register from "../components/Register.vue";
import axios from "axios";
import axiosRetry from "axios-retry";

export default {
  name: "Login",
  components: { LoginForm, Register },
  data() {
    return {
      show: true,
      tabIndex: 0,
      serverError: false,
    };
  },
  mounted() {
    this.wakeup();
  },
  methods: {
    async wakeup() {
      this.serverError = false;
      axiosRetry(axios, {
        retries: 3, // number of retries
        retryDelay: (retryCount) => {
          console.log(`retry attempt: ${retryCount}`);
          return retryCount * 2000; // time interval between retries
        },
        retryCondition: (error) => {
          return true;
        },
      });
      await axios.post(process.env.VUE_APP_ROOT_API + "wakeup").then((response) => {
        this.show = false;
      }).catch(
        (response) => {
          this.serverError = true;
        }
      );
    },
    linkClass(idx) {
      if (this.tabIndex === idx) {
        return ["bg-dark", "text-secondary"];
      } else {
        return ["bg-primary", "text-light"];
      }
    },
    registered() {
      this.tabIndex = 0;
    },
  },
};
</script>

<style scoped>
.background {
  position: fixed;
  padding: 0;
  margin: 0;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
}

.middle {
  position: relative;
  top: 12%;
  bottom: 12%;
}
</style>
