<template>
    <div>
        <h3 class="text-secondary">Page Summary</h3>
        <h5>The Summary page will show you totals and averages of your squad for all the Active players.</h5>
        <h5 class="mt-4 text-secondary">Why does my average batting / bowling differ from Battrick?</h5>
        <p>A player is counted towards the average only if their primary is Mediocre or above.</p>
        <h5 class="text-secondary">Why does the total number of Batters, WK and Bowlers exceed my squad total?</h5>
        <p>A player who is a WK, will be counted as a WK and a Batter.</p>
        <h5 class="text-secondary">I have a strong team and do not want mediocre players to count towards my summary</h5>
        <p>In a future release, you will be able to change the base level for the summary screen.</p>
    </div>
</template>

<script>
export default{
    name: "SummaryHelp"
}
</script>
