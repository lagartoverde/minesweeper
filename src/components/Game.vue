<template>
  <div class="container">
    <div class='selectGame'>
      <button @click='startGame("easy")' class="button">Easy</button>
      <button @click='startGame("medium")' class="button">Medium</button>
      <button @click='startGame("hard")' class="button">Hard</button>
      <button @click='startMultiplayerGame' class="button">Multiplayer</button>
    </div>
    <div class='boards'>
      <GameBoard class="gameBoard"/>
      <GameBoard v-if='isMultiplayer' :opponent='true' class="gameBoard opponentBoard" />
    </div>
    <div v-if='isMultiplayer && !(gameStarted)'>
      Looking for an opponent {{points}}
    </div>
    <div v-if='isMultiplayer && multiplayerResultPhrase'>
      <h2>
        {{multiplayerResultPhrase}}
      </h2>
    </div>
    <div v-if='!isMultiplayer'>
      <h2 v-if='finished' class="text">
        {{finishedPhrase}}
      </h2>
      <h2 v-else class="text">
        Time: {{timeCount}}
      </h2>
    </div>
  </div>
</template>

<script>
import GameBoard from "./GameBoard.vue";

export default {
  name: "app",
  components: {
    GameBoard
  },
  created() {
    setInterval(() => {
      if(this.points.length>2) {
        this.points = '.'
      } else {
        this.points += '.'
      }
    }, 1000)
  },
  data() {
    return {
      points: '.',
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
    isMultiplayer() {
      return this.$store.state.mode === 'multiplayer'
    },
    gameStarted() {
      return this.$store.state.board && this.$store.state.board.length >0
    },
    multiplayerResultPhrase() {
      const result = this.$store.state.multiplayerResult;
      if(result) {
        return result === 'victory' ? 'Congratulations, you won :)' : 'Sorry, you have lost'
      }
      return false;
    }
  },
  methods: {
    startGame(gameMode) {
      clearInterval(this.interval);
      this.$store.dispatch('newGame', gameMode)
      this.$store.commit('changeLeaderboard', gameMode);
      this.interval = setInterval(()=> {
        if(!this.finished) {
          this.$store.commit('incrementTimeCount')
        } else {
          clearInterval(this.interval)
        }
      }, 1000);
    },
    startMultiplayerGame() {
      this.$store.dispatch('newMultiplayerGame')
    }
  }
};
</script>

<style scoped>
.container {
  flex: 3;
}
.selectGame {
  margin-top: 15px;
  padding: 0 30px;
}
.boards {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.gameBoard {
  margin-top: 30px;
}
.opponentBoard {
  margin-left: 30px;
}
.text {
  margin-top: 20px;
  font-weight: normal;
}
.button {
  border: var(--button-border);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  background-color: var(--background-color);
  color: var(--primary-color);
  font-family: var(--font), Helvetica, Arial, sans-serif;
  padding: 15px 20px;
  margin: 10px;
  font-size: 1em;
}

@media screen and (max-width: 600px) {
  .opponentBoard {
    margin-left: 0;
  }
}
</style>
