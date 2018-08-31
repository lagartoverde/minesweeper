<template>
  <div class="container">
    <div v-for='(rowArray,indexX) in boardArray' :key='indexX'  class='row'>
      <div v-for='(element, indexY) in rowArray' :key='indexY' class='element'>
        <GameCell 
          :element='element' 
          :x='indexX' 
          :y='indexY' 
          :state='boardState[indexX][indexY]'
          @click.native.left='rigthClickCell(indexX,indexY)'
          @click.native.right.prevent='flagCell(indexX,indexY)'
        />
      </div>
    </div>
  </div>
</template>

<script>
import GameCell from './GameCell.vue'
export default {
  name: "HelloWorld",
  components: {
    GameCell
  },
  computed: {
    boardArray() {
      return this.$store.state.board;
    },
    boardState() {
      return this.$store.state.boardState;
    }
  },
  methods: {
    rigthClickCell(x, y) {
      this.openCell(x, y);
      this.boardState = this.$store.state.boardState;
    },
    openCell(x,y) {
      if (this.$store.state.boardState[x][y] !== 0) return;
      this.$store.commit('openCell',{ x, y });
      const maxIndex = this.$store.state.size - 1;
      if (this.$store.state.board[x][y] === '0') {
        if(x > 0) this.openCell(x-1,y);
        if(x < maxIndex) this.openCell(x+1,y);
        if(y > 0) this.openCell(x,y-1);
        if(y < maxIndex) this.openCell(x,y+1);
        if(x > 0 && y > 0) this.openCell(x-1,y-1);
        if(x < maxIndex && y > 0) this.openCell(x+1,y-1);
        if(x > 0 && y < maxIndex) this.openCell(x-1,y+1);
        if(x < maxIndex && y < maxIndex) this.openCell(x+1,y+1);
      }
    },
    flagCell(x,y){
      this.$store.commit('flagCell', {x,y})
      this.boardState = this.$store.state.boardState;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  display: flex;
  flex-direction: column;
}
.row {
  display: flex;
  flex-direction: row;
  height: 100%;
}
.element {
  height: 100%;
  width: 100%;
}
</style>
