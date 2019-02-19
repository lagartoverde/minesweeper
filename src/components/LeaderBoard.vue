<template>
  <table class='leaderBoard'>
    <tr>
      <th>Name</th>
      <th>Seconds</th>
    </tr>
    <tr v-for="row in leaderBoard" :key='row.id'>
      <td>{{row.name}}</td>
      <td>{{row.seconds}}</td>
    </tr>
  </table>
</template>

<script>
export default {
  name: "app",
  computed: {
    leaderBoard() {
      return this.$store.state.actualLeaderboard;
    }
  }
}
</script>

<style scoped lang="scss">
  .leaderBoard {
    margin-top: 30%;
    border: 1px solid black;
    border-collapse: collapse;
    border-spacing: 0;
    td, th {
      border: 1px solid black;
      padding: 10px;
    }
  }
</style>
