<template>
  <div>
    <h3 class="text-secondary">Page Summary</h3>
    <h5>
      The Squad page will list all your players and display their basic details. Clicking on a player name allows you to view Pop History, Net History and Record Pops and Plops.
    </h5>
    <h5 class="mt-4 text-secondary">
      I have just registered and I cannot see any of my players
    </h5>
    <p>
      You will need to import your squad using the "Import Squad" or "Import
      Player" options.
    </p>
    <h5 class="text-secondary">Can I sort my squad?</h5>
    <p>
      In a future release, you will have the option to sort your squad based on
      different parameters.
    </p>
    <h5 class="text-secondary">
      Can I view my Batters and Bowlers in different groups?
    </h5>
    <p>
      In a future release, you will be able to group players based on their
      roles.
    </p>
    <h5 class="text-secondary">
      My Player is not a Wicket Keeper / All Rounder
    </h5>
    <p>
      Player roles are assigned based on their primary skills. If your palyer
      has a minimum of Mediocre in Batting and Bowling, they will be an All
      Rounder. Likewise, if your player is at least Mediocre in Batting and
      Wicket Keeping, then they will be marked as a Wicket Keeper.
    </p>
    <h5 class="text-secondary">
      How do I add previous pop / plop details for my player?
    </h5>
    <p>
      You can add historic pop / plop details under Manage Team > Add Pop / Plop.
    </p>
    <h5 class="text-secondary">
      I made an error while recording pop / plop.
    </h5>
    <p>
      You can remove pop / plop details under Manage Team > Delete Pop / Plop.
    </p>
    <h5 class="text-secondary">
      How do I add previous net details for my player?
    </h5>
    <p>
      You can add historic net details under "Nets" in the navigation bar. 
    </p>
  </div>
</template>

<script>
export default {
  name: "SquadHelp",
};
</script>
