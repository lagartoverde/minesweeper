import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

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
    timeCount: 0
  },
  mutations: {
    generateGameboard(state, size) {
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
    },
    poblateGameboard(state, mines) {
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
    }
  },
  actions: {}
});
