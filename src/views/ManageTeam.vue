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
          <div v-for="(value, index) in tabs" v-bind:key="index">
              <b-tab
                :title="value.tabName"
                :title-link-class="linkClass(index)"
                lazy
              >
                <b-card-text>
                  <component :is="value.compName"></component
                ></b-card-text>
              </b-tab>
            </div>
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
import EditPlayer from "../components/EditPlayer.vue";
import EndSeason from "../components/EndSeason.vue";

export default {
  components: { NavigationBar, AddSkillChange, RemoveSkillChange, RemovePlayer, EditPlayer, EndSeason },
  data() {
    return {
      tabIndex: 0,
      tabs: [
        { tabName: "Edit Player", compName: "EditPlayer" },
        { tabName: "Delete Player", compName: "RemovePlayer" },
        { tabName: "Add Pop/Plop", compName: "AddSkillChange" },
        { tabName: "Delete Pop/Plop", compName: "RemoveSkillChange" },
        { tabName: "End Season", compName: "EndSeason" },
      ],
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
