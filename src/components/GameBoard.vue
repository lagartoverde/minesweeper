<template>
  <div class="boardContainer">
    <div class="board" :class="{filled: board.length >0}">
      <div v-for='(rowArray,indexX) in board' :key='indexX'  class='row'>
        <div v-for='(element, indexY) in rowArray' :key='indexY' class='element' :class='{open: element !== "?" && element !== "F"}'>
          <GameCell 
            :element='element' 
            :x='indexX' 
            :y='indexY' 
            v-longclick="() => flagCellMobile(indexX, indexY)"
            @click.native.left='openCell(indexX,indexY)'
            @click.native.right.prevent='flagCell(indexX,indexY)'

          />
        </div>
      </div>
    </div>
    <div class='multiplayerInfo' v-if="multiplayerInfo && gameStarted">
      <p class="username">{{multiplayerInfo.username}}</p>
      <span class="level" v-if="multiplayerInfo.lvl">lvl {{multiplayerInfo.lvl}}</span>
    </div>
  </div>
</template>

<script>
import GameCell from './GameCell.vue'
import { isMobile } from 'mobile-device-detect';
export default {
  name: "HelloWorld",
  components: {
    GameCell
  },
  props: {
    opponent: Boolean
  },
  computed: {
    board() {
      if(this.opponent) {
        return this.$store.state.opponentBoard
      }
      return this.$store.state.board
    },
    multiplayerInfo() {
      if(this.$store.state.mode === 'multiplayer') {
        if(this.opponent) {
          return this.$store.state.opponentInfo;
        } else {
          return this.$store.state.playerInfo;
        }
      } else {
        return undefined;
      }
    },
    gameStarted() {
      return this.$store.state.board && this.$store.state.board.length >0
    }
  },
  methods: {
    openCell(x,y) {
      if(this.opponent) return;
      this.$store.dispatch('openCell', {x,y})
    },
    flagCellMobile(x,y) {
      if(this.opponent) return;
      if(isMobile) {
        this.$store.dispatch('flagCell', {x,y})
      }
    },
    flagCell(x,y){
      if(this.opponent) return;
      this.$store.dispatch('flagCell', {x,y})
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>

.boardContainer {
  width: 400px;
}
.board {
  height: 400px;
  display: flex;
  flex-direction: column;
}
.filled {
  border: var(--gameOuterBorder);
}
.row {
  display: flex;
  flex-direction: row;
  height: 100%;
}
.element {
  cursor: pointer;
  height: 100%;
  width: 100%;
  border-right: 1px solid var(--cellBorderColor);
  border-bottom: 1px solid var(--cellBorderColor);
  box-sizing: border-box;
}
.element:first-child {
  border-left: 1px solid var(--cellBorderColor);
}
.row:first-child .element{
  border-top: 1px solid var(--cellBorderColor);
}
.open {
  border-color: var(--cellBorderColorOpen);
}
.multiplayerInfo {
  display: flex;
  justify-content: center;
  align-items: center;
  .username {
    margin-right: 5px;
  }
  .level {
    font-weight: bold;
  }
}
</style>
