import Vue from "vue";
import VueRouter from "vue-router";
import Summary from "../views/Summary.vue";
import Squad from "../views/Squad.vue";
import Player from "../views/Player.vue";
import Nets from "../views/Nets.vue";
import ImportSquad from "../views/ImportSquad.vue";
import ImportPlayer from "../views/ImportPlayer.vue";
import CoachAnalysis from "../views/CoachAnalysis.vue";
import ManageTeam from "../views/ManageTeam.vue";
import Login from "../views/Login.vue";

import store from '../store/index.js';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/summary",
    name: "Summary",
    component: Summary,
  },
  {
    path: "/squad",
    name: "Squad",
    component: Squad,
  },
  {
    path: "/player/:id",
    name: "Player",
    component: Player,
  },
  {
    path: "/nets",
    name: "Nets",
    component: Nets,
  },
  {
    path: "/importSquad",
    name: "ImportSquad",
    component: ImportSquad,
  },
  {
    path: "/importPlayer",
    name: "ImportPlayer",
    component: ImportPlayer,
  },
  {
    path: "/coachAnalysis",
    name: "CoachAnalysis",
    component: CoachAnalysis,
  },
  {
    path: "/manageTeam",
    name: "ManageTeam",
    component: ManageTeam,
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && store.state.jwtToken === '') next({ name: 'Login' })
  else if (to.name === 'Login' && store.state.jwtToken !== '') next({ name: 'Summary' })
  next()
})

export default router;
