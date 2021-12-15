import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.sessionStorage,
  })],
  state: {
    squad: "",
    jwtToken: "",
    currentTeam: "",
    contextManager: {},
    currentWeek: {},
    age: [
      17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34,
      35, 36, 37, 38, 39, 40
    ],
    battingHand: ["RH", "LH"],
    aggression: ["cautious", "defensive", "steady", "attacking", "destructive"],
    bowlerType: ["RF", "RFM", "RM", "RH finger spin", "RH wrist spin", "LF", "LFM", "LM", "LH finger spin", "LH wrist spin"],
    skills: [
      "worthless",
      "abysmal",
      "woeful",
      "feeble",
      "mediocre",
      "competent",
      "respectable",
      "proficient",
      "strong",
      "superb",
      "quality",
      "remarkable",
      "wonderful",
      "exceptional",
      "sensational",
      "exquisite",
      "masterful",
      "miraculous",
      "phenomenal",
      "elite",
      "elite +1",
      "elite +2",
      "elite +3",
      "elite +4",
      "elite +5",
      "elite +6",
      "elite +7",
      "elite +8",
      "elite +9",
      "elite +10",
    ],
    staminaSkills: [
      "worthless",
      "abysmal",
      "woeful",
      "feeble",
      "mediocre",
      "competent",
      "respectable",
      "proficient",
      "strong",
      "superb",
      "superb*",
    ],
    leadership: [
      "worthless",
      "abysmal",
      "woeful",
      "feeble",
      "mediocre",
      "competent",
      "respectable",
      "proficient",
      "strong",
      "superb",
    ],
    trait: [
      "no trait",
      "FC Specialist",
      "OD Specialist",
      "BT20 Specialist",
      "Strike Controller",
      "Good Eye",
      "Gap Finder",
      "Cheetah",
      "Finisher",
      "Killer Instinct",
      "Partnership Breaker",
      "Committed",
      "Lazy",
      "Quick Learner",
      "Mastermind",
      "Famous",
      "Loyal",
      "Party Animal",
    ],
    preference: [
      "no preference",
      "Right-Handed Bowlers",
      "Left-Handed Bowlers",
      "Right-Handed Batters",
      "Left-Handed Batters",
      "Fast Bowling",
      "Fast-Medium Bowling",
      "Medium Bowling",
      "Spin Bowling",
      "Green Pitches",
      "Flat Pitches",
      "Hard and Fast Pitches",
      "Slow Pitches",
      "Cracked Pitches",
      "Dusty Pitches",
      "Uneven Pitches",
    ]
  },
  mutations: {
    SET_TOKEN(state, jwtToken){
      state.jwtToken = jwtToken
    },
    SET_MANAGER(state, contextManager){
      state.contextManager = contextManager
    },
    SET_TEAM(state, team){
      state.currentTeam = team
    },
    SET_SQUAD(state, squad){
      state.squad = squad
    },
    SET_CURRENT_WEEK(state, currentWeek){
      state.currentWeek = currentWeek
    }
  },
  actions: {
    setToken({commit}, jwtToken){
      commit('SET_TOKEN', jwtToken)
    },
    setManager({commit}, contextManager){
      commit('SET_MANAGER', contextManager)
    },
    setTeam({commit}, team){
      commit('SET_TEAM', team)
    },
    setSquad({commit}, squad){
      commit('SET_SQUAD', squad)
    },
    setCurrentWeek({commit}, currentWeek){
      commit('SET_CURRENT_WEEK', currentWeek)
    },
  },
  modules: {},
  getters: {
    getAge: (state) => {
      return state.age;
    },
    getBattingHand: (state) => {
      return state.battingHand;
    },
    getAggression: (state) => {
      return state.aggression;
    },
    getBowlerType: (state) => {
      return state.bowlerType;
    },
    getSkills: (state) => {
      return state.skills;
    },
    getStaminaSkills: (state) => {
      return state.staminaSkills;
    },
    getLeadership: (state) => {
      return state.leadership;
    },
    getTrait: (state) => {
      return state.trait;
    },
    getPreference: (state) => {
      return state.preference;
    },
    getToken: state => {
      return state.jwtToken
    },
    getManager: state => {
      return state.contextManager
    },
    getTeam: state => {
      return state.currentTeam
    },
    getSquad: state => {
      return state.squad
    },
    getCurrentWeek: state => {
      return state.currentWeek
    }
  }
});
