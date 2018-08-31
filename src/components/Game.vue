<template>
  <div class="container">
    <div class='selectGame'>
      <button @click='startGame(easyMode)'>Easy</button>
      <button @click='startGame(mediumMode)'>Medium</button>
      <button @click='startGame(hardMode)'>Hard</button>
    </div>
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
import GameBoard from "./GameBoard.vue";

export default {
  name: "app",
  components: {
    GameBoard
  },
  data() {
    return {
      easyMode: {
        size: 10,
        mines: 10
      },
      mediumMode: {
        size: 20,
        mines: 50
      },
      hardMode: {
        size: 30,
        mines: 100
      },
      interval: undefined
    };
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
    },
  },
  methods: {
    startGame({size, mines}) {
      clearInterval(this.interval);
      this.$store.commit('resetTimeCount')
      this.$store.commit('generateGameboard', size);
      this.$store.commit('poblateGameboard', mines);
      this.$store.commit('checkSurroundings');
      this.interval = setInterval(()=> {
        if(!this.finished) {
          this.$store.commit('incrementTimeCount')
        }
      }, 1000);
    }
  }
};
</script>

<style>
.container {
  height: 100%;
  width: 100%;
}
.selectGame {
  margin-top: 8%;
}
.board {
  height: 60%;
  width: 50%;
  margin:auto;
  margin-top: 2%;
}
body, html {
  height: 100%;
  width: 100%;
}
</style>
