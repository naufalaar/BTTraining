<template>
  <div>
    <NavigationBar />
    <b-container fluid class="mt-4">
      <b-card no-body bg-variant="primary" text-variant="light">
        <b-tabs
          v-model="tabIndex"
          pills
          card
          vertical
          end
          nav-wrapper-class="w-25"
        >
          <b-tab title="Edit Player" :title-link-class="linkClass(0)" lazy>
            <b-card-text>Cryptix hasn't implemented me yet</b-card-text>
          </b-tab>
          <b-tab title="Delete Player" :title-link-class="linkClass(1)" lazy>
            <b-card-text><RemovePlayer /></b-card-text>
          </b-tab>
          <b-tab title="Add Pop/Plop" :title-link-class="linkClass(2)" lazy>
            <b-card-text><AddSkillChange /></b-card-text>
          </b-tab>
          <b-tab title="Delete Pop/Plop" :title-link-class="linkClass(3)" lazy>
            <b-card-text><RemoveSkillChange /></b-card-text>
          </b-tab>
          <b-tab title="End Season" :title-link-class="linkClass(4)" lazy>
            <b-card-text>Cryptix hasn't implemented me yet</b-card-text>
          </b-tab>
        </b-tabs>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import NavigationBar from "../components/NavigationBar.vue";
import AddSkillChange from "../components/AddSkillChange.vue";
import RemoveSkillChange from "../components/RemoveSkillChange.vue";
import RemovePlayer from "../components/RemovePlayer.vue";

export default {
  components: { NavigationBar, AddSkillChange, RemoveSkillChange, RemovePlayer },
  data() {
    return {
      tabIndex: 0,
    };
  },
  methods: {
    linkClass(idx) {
      if (this.tabIndex === idx) {
        return ["bg-dark", "text-secondary"];
      } else {
        return ["bg-primary", "text-light"];
      }
    },
  },
};
</script>

<style lang="scss"></style>
