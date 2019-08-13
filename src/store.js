import Vue from "vue";
import Vuex from "vuex";
import io from 'socket.io-client';

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
    finished: false,
    won: undefined,
    started: null,
    timeCount: 0,
    leaderBoard: [],
    actualLeaderboard : [],
    gameId: undefined,
    theme: 'default',
    mode: 'easy',
    opponentBoard: [],
    multiplayerResult: undefined,
    playerInfo: undefined,
    opponentInfo: undefined
  },
  mutations: {
    incrementTimeCount(state) {
      const actualDate = new Date();
      const diff = actualDate.getTime() - state.started.getTime();
      const diffSeconds = Math.floor(diff/1000)
      state.timeCount = diffSeconds
    },
    resetTimeCount(state){
      state.timeCount = 0
    },
    setLeaderboard(state, leaderBoard) {
      state.leaderBoard = leaderBoard
      state.actualLeaderboard = leaderBoard[state.mode]
    },
    changeLeaderboard(state, gameMode) {
      state.actualLeaderboard = state.leaderBoard[gameMode]
    },
    setNewGame(state,game) {
      state.gameId = game.id
      state.board= game.board
      state.started = new Date(game.started)
      state.finished = false;
      state.won = undefined
      
    },
    updateBoard(state, {boardState, finished, won}) {
      
      state.board = boardState;
      state.finished = finished;
      state.won = won;
    },
    updatePlayerBoard(state, playerBoard) {
      state.board = playerBoard;
    },
    updateOpponentBoard(state, opponentBoard) {
      state.opponentBoard = opponentBoard;
    },
    changeTheme(state, theme) {
      state.theme = theme
    },
    setSocket(state,socket) {
      state.socket = socket
    },
    setGameMode(state, gameMode) {
      if(state.socket ) {
        state.socket.disconnect()
      }
      state.mode = gameMode
    },
    setMultiplayerResult(state, victory) {
      if(victory) {
        state.multiplayerResult = 'victory'
      } else {
        state.multiplayerResult = 'defeat'
      }
    },
    resetGameData(state){
      state.board= [];
      state.finished = false;
      state.won = undefined;
      state.started = null;
      state.timeCount = 0;
      state.gameId = undefined;
      state.opponentBoard = [];
      state.multiplayerResult = undefined;
    },
    updatePlayerInfo(state, playerInfo) {
      state.playerInfo = playerInfo
    },
    resetOpponentInfo(state) {
      state.opponentInfo = undefined
    },
    setOpponentInfo(state, opponentInfo) {
      console.log(opponentInfo)
      state.opponentInfo = opponentInfo;
    }
  },
  actions: {
    newGame({commit}, gameMode) {
      const data = {mode: gameMode}
      commit('setGameMode', gameMode)
      fetch(`${process.env.VUE_APP_BACKEND}/game/new`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then((response) => response.json())
        .then((json) => commit('setNewGame', json))
    },
    openCell({commit,state, dispatch}, position) {
      if(state.mode === 'multiplayer') {
        return state.socket.emit('openCell', position)
      }
      let data = {...position};
      if(state.playerInfo && state.playerInfo.token) {
        data.token = state.playerInfo.token;
      }
      fetch(`${process.env.VUE_APP_BACKEND}/game/${state.gameId}/open`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': state.playerInfo && state.playerInfo.token ? `JWT ${state.playerInfo.token}` : 'none'
        },
        body: JSON.stringify(data)
      }).then((response) => response.json())
        .then((json) => {
          commit('updateBoard', json)
          if(json.won) {
            dispatch('getLeaderboard')
          }
          if(json.playerInfo) {
            commit('updatePlayerInfo', json.playerInfo)
          }
        } )
    },
    flagCell({commit,state}, position) {
      if(state.mode === 'multiplayer') {
        return state.socket.emit('flagCell', position)
      }
      fetch(`${process.env.VUE_APP_BACKEND}/game/${state.gameId}/flag`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(position)
      }).then((response) => response.json())
        .then((json) => commit('updateBoard', json))
    },
    getLeaderboard({commit}) {
      
      fetch(`${process.env.VUE_APP_BACKEND}/leaderboard`, {
        method: 'GET',
        mode: 'cors'
      }).then((response) => response.json())
        .then((leaderboard) => commit('setLeaderboard', leaderboard))
    },
    submitScore({commit, dispatch, state}, name) {
      const data = {name}
      fetch(`${process.env.VUE_APP_BACKEND}/game/${state.gameId}/submitScore`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(() => dispatch('getLeaderboard'))
      
    },
    newMultiplayerGame({commit, state}) {
      commit('resetGameData');
      commit('resetOpponentInfo');
      commit('setGameMode', 'multiplayer')
      const socket = io.connect(process.env.VUE_APP_SOCKET, {forceNew: true});
      commit('setSocket', socket)
      socket.on('startGame', ({playerBoard, opponentBoard})=> {
        if(state.playerInfo && state.playerInfo.token) {
          socket.emit('loggedPlayer', state.playerInfo.token)
        } else {
          socket.emit('unloggedPlayer')
        }
        commit('updatePlayerBoard', playerBoard)
        commit('updateOpponentBoard', opponentBoard)
      })
      socket.on('updatePlayerBoard', board => {
        commit('updatePlayerBoard', board)
      })
      socket.on('updateOpponentBoard', board => {
        console.log(board)
        commit('updateOpponentBoard', board)
      })
      socket.on('gameFinished', ({victory}) => {
        commit('setMultiplayerResult', victory)
      })
      socket.on('opponentInfo', (opponentInfo) => {
        commit('setOpponentInfo', opponentInfo)
      })
    },
    login({commit}, username) {
      const data = {username}
      fetch(`${process.env.VUE_APP_BACKEND}/login`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then((response) => response.json())
        .then((json) => commit('updatePlayerInfo', json))
    }
  }
});
