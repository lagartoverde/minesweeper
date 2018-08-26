import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    board: [],
    openedCells: [],
    size: 0,
    finsihed: false
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
      state.openedCells = arrayOpened;
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
      if(state.board[x][y] === 'X') state.finished = true
      const copy = state.openedCells.slice(0);
      copy[x][y] = 1;
      state.openedCells = copy;
    }
  },
  actions: {}
});
