<template>
  <div class="container">
    <div class='selectGame'>
      <button @click='startGame("easy")'>Easy</button>
      <button @click='startGame("medium")'>Medium</button>
      <button @click='startGame("hard")'>Hard</button>
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
    startGame(gameMode) {
      clearInterval(this.interval);
      this.$store.commit('resetTimeCount')
      this.$store.commit('generateGameboard', gameMode);
      this.$store.commit('poblateGameboard', gameMode);
      this.$store.commit('changeLeaderboard', gameMode);
      this.$store.commit('checkSurroundings');
      this.interval = setInterval(()=> {
        if(!this.finished) {
          this.$store.commit('incrementTimeCount')
        } else {
          if(this.$store.state.won) {
            let name = prompt('Please Enter your name (3 letters)')
            name = name.split('').slice(0,3).join('').toUpperCase()
            if(name) {
              const score = {
                name,
                seconds: this.$store.state.timeCount,
                mode: gameMode
              }
              this.$store.dispatch('submitScore', score)
            }
          }
          clearInterval(this.interval)
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
