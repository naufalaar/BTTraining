<template>
  <div>
    <NavigationBar />
    <b-container fluid>
      <b-card bg-variant="primary" text-variant="light" class="mt-4">
        <b-card-text>
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
        </b-card-text>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import NavigationBar from "../components/NavigationBar.vue";
import SummaryHelp from "../components/help/SummaryHelp.vue";
import SquadHelp from "../components/help/SquadHelp.vue";
import NetHelp from "../components/help/NetHelp.vue";
import ImportSquadHelp from "../components/help/ImportSquadHelp.vue";
import ImportPlayerHelp from "../components/help/ImportPlayerHelp.vue";
import EditPlayerHelp from "../components/help/EditPlayerHelp.vue";
import DeletePlayerHelp from "../components/help/DeletePlayerHelp.vue";
import DeleteSkillChangeHelp from "../components/help/DeleteSkillChangeHelp.vue";
import AddSkillChangeHelp from "../components/help/AddSkillChangeHelp.vue";

export default {
  name: "Help",
  components: {
    NavigationBar,
    SummaryHelp,
    SquadHelp,
    NetHelp,
    ImportSquadHelp,
    ImportPlayerHelp,
    EditPlayerHelp,
    DeletePlayerHelp,
    DeleteSkillChangeHelp,
    AddSkillChangeHelp
  },
  data() {
    return {
      comp: "SummaryHelp",
      tabIndex: 0,
      tabs: [
        { tabName: "Summary", compName: "SummaryHelp" },
        { tabName: "Squad", compName: "SquadHelp" },
        { tabName: "Nets", compName: "NetHelp" },
        { tabName: "Squad Import", compName: "ImportSquadHelp" },
        { tabName: "Player Import", compName: "ImportPlayerHelp" },
        { tabName: "Edit Player", compName: "EditPlayerHelp" },
        { tabName: "Delete Player", compName: "DeletePlayerHelp" },
        { tabName: "Add Pop/Plop", compName: "AddSkillChangeHelp" },
        { tabName: "Delete Pop/Plop", compName: "DeleteSkillChangeHelp" },
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
