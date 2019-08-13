<template>
  <div class="leaderboard">
    <table class='table'>
      <tr>
        <th>Name</th>
        <th>Seconds</th>
      </tr>
      <tr v-for="row in leaderBoard" :key='row.id'>
        <td>{{row.username}}</td>
        <td>{{row.seconds}}</td>
      </tr>
    </table>
  </div>
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
  .leaderboard {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .table {
    width: 200px;
    margin-top: 45px;
    margin-bottom: 50px;
    border-collapse: collapse;
    border-spacing: 0;
    td, th {
      font-weight: normal;
      padding: 10px;
    }
  }
</style>
