<template>
  <div class="background">
    <b-container class="middle">
      <b-row align-h="center" align-v="center">
        <b-col align-self="center" cols="6">
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
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import LoginForm from "../components/LoginForm.vue";
import Register from "../components/Register.vue";
import axios from "axios";

export default {
  name: "Login",
  components: { LoginForm, Register },
  data() {
    return {
      tabIndex: 0,
    };
  },
  mounted() {
    this.wakeup();
  },
  methods: {
    wakeup(){
      axios.post(process.env.VUE_APP_ROOT_API + "wakeup");
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
