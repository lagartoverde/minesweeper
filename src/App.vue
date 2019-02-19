<template>
  <div id="app">
    <h1>Minesweeper</h1>
    <div class='content'>
        <Game />
        <LeaderBoard />
    </div>
  </div>
</template>

<script>
import Game from "./components/Game.vue";
import LeaderBoard from './components/LeaderBoard.vue'
export default {
  name: "app",
  components: {
    Game,
    LeaderBoard
  },
  created() {
    this.$store.dispatch('getLeaderboard')
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  height: 100%;
}
body, html {
  height: 100%;
  width: 98%;
}
.content {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 70% 30%;
  grid-template-rows: 100%;
}
</style>
