import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const gameModes = {
  easy: {
    size: 10,
    mines: 10
  },
  medium: {
    size: 20,
    mines: 50
  },
  hard: {
    size: 30,
    mines: 100
  },
}

export default new Vuex.Store({
  state: {
    board: [],
    boardState: [],
    size: 0,
    finished: false,
    flagsRemaining: 0,
    won: undefined,
    cellsOpened: 0,
    mines: 0,
    timeCount: 0,
    leaderBoard: [
      {id: 1, name: 'AAA', seconds: 13},
      {id: 2, name: 'BBB', seconds: 15},
      {id: 3, name: 'CCC', seconds: 19},
      {id: 4, name: 'DDD', seconds: 21},
      {id: 5, name: 'EEE', seconds: 23},
      {id: 6, name: 'FFF', seconds: 24},
      {id: 7, name: 'GGG', seconds: 26},
      {id: 8, name: 'HHH', seconds: 30},
    ],
    actualLeaderboard : []
  },
  mutations: {
    generateGameboard(state, gameMode) {
      const size = gameModes[gameMode].size
      const arrayBoard = [];
      const arrayOpened = [];
      for (let i = 0; i < size; i++) {
        const innerArrayBoard = [];
        const innerArrayOpened = [];
        for (let j = 0; j < size; j++) {
          innerArrayBoard.push(0);
          innerArrayOpened.push(0);
        }
        arrayBoard.push(innerArrayBoard);
        arrayOpened.push(innerArrayOpened);
      }
      state.board = arrayBoard;
      state.boardState = arrayOpened;
      state.size = size;
      state.finished = false;
      state.won = undefined;
      state.cellsOpened = 0;
      state.timeCount = 0;
    },
    poblateGameboard(state, gameMode) {
      const mines = gameModes[gameMode].mines
      for (let i = 0; i < mines; i++) {
        let placed = false;
        while (!placed) {
          let x = Math.floor(Math.random() * (state.size - 1));
          let y = Math.floor(Math.random() * (state.size - 1));
          if (state.board[x][y] !== "X") {
            state.board[x][y] = "X";
            placed = true;
          }
        }
      }
      state.mines = mines
      state.flagsRemaining = mines;
    },
    checkSurroundings(state) {
      for (let i = 0; i < state.size; i++) {
        for (let j = 0; j < state.size; j++) {
          if (state.board[i][j] === "X") continue;
          let minesAround = 0;
          if (i > 0 && state.board[i-1][j] === "X") minesAround++;
          if (i < state.size - 1 && state.board[i+1][j] === "X") minesAround++;
          if (j > 0 && state.board[i][j-1] === "X") minesAround++;
          if (j < state.size - 1 && state.board[i][j+1] === "X") minesAround++;
          if (i > 0 && j > 0 && state.board[i-1][j-1] === "X") minesAround++;
          if (i < state.size - 1 && j < state.size - 1 && state.board[i+1][j+1] === "X") minesAround++;
          if (i > 0 && j < state.size - 1 && state.board[i-1][j+1] === "X") minesAround++;
          if (i < state.size - 1 && j > 0 && state.board[i+1][j-1] === "X") minesAround++;
          state.board[i][j] = '' + minesAround
        }
      }
    },
    openCell(state,{x, y}) {
      if(state.finished) return
      if(state.board[x][y] === 'X'){
        state.finished = true;
        state.won = false;
      }
      const copy = state.boardState.slice(0);
      copy[x][y] = 1;
      state.boardState = copy;
      state.cellsOpened ++;
      if(state.cellsOpened === (state.size * state.size) - state.mines){
        state.finished = true;
        state.won = true;
      }
    },
    flagCell(state, {x,y}) {
      if(state.finished) return;
      if(state.boardState[x][y] === 0) {
        if(state.flagsRemaining === 0) return;
        const copy = state.boardState.slice(0);
        copy[x][y] = 2;
        state.boardState = copy;
        state.flagsRemaining -= 1
      } else if(state.boardState[x][y] === 2){
        const copy = state.boardState.slice(0);
        copy[x][y] = 0;
        state.boardState = copy;
        state.flagsRemaining += 1
      }
    },
    incrementTimeCount(state) {
      state.timeCount++;
    },
    resetTimeCount(state){
      state.timeCount = 0
    },
    setLeaderboard(state, leaderBoard) {
      state.leaderBoard = leaderBoard
      state.actualLeaderboard = leaderBoard['easy']
    },
    changeLeaderboard(state, gameMode) {
      state.actualLeaderboard = state.leaderBoard[gameMode]
    }
  },
  actions: {
    getLeaderboard({commit}) {
      fetch('https://minesweeper-leaderboard.herokuapp.com/getLeaderboard', {
        method: 'GET',
        mode: 'cors'
      }).then((response) => response.json())
        .then((leaderboard) => commit('setLeaderboard', leaderboard))
    },
    submitScore({commit, dispatch}, score) {
      fetch('https://minesweeper-leaderboard.herokuapp.com/newScore', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(score)
      }).then(() => dispatch('getLeaderboard'))
      
    }
  }
});
