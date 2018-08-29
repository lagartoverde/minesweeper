<template>
  <div id="app">
    <h1> MineSweeper</h1>
    <GameBoard class="board"/>
    <h2 v-if='finished'>
      {{finishedPhrase}}
    </h2>
    <h2 v-else>
      Time: {{timeCount}}
    </h2>
  </div>
</template>

<script>
import GameBoard from "./components/GameBoard.vue";

export default {
  name: "app",
  components: {
    GameBoard
  },
  created() {
    this.$store.commit('generateGameboard', 10);
    this.$store.commit('poblateGameboard', 10);
    this.$store.commit('checkSurroundings');
    setInterval(()=> {
      if(!this.finished) {
        this.$store.commit('incrementTimeCount')
      }
    }, 1000);
  },
  computed: {
    finished() {
      return this.$store.state.finished;
    },
    finishedPhrase() {
      return this.$store.state.won ? `Congratulations, you won :) Time: ${this.timeCount}s` : 'Sorry, you have lost'
    },
    timeCount() {
      return this.$store.state.timeCount;
    }
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
.board {
  height: 50%;
  width: 50%;
  margin:auto;
  margin-top: 10%;
}
body, html {
  height: 100%;
  width: 100%;
}
</style>
