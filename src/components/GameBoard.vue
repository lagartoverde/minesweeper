<template>
  <div class="container">
    <div v-for='(rowArray,indexX) in boardArray' :key='indexX'  class='row'>
      <div v-for='(element, indexY) in rowArray' :key='indexY' class='element'>
        <GameCell 
          :element='element' 
          :x='indexX' 
          :y='indexY' 
          :open='openedCells[indexX][indexY] === 1'
          @click.native='clickCell(indexX,indexY)'
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
  data() {
    return {
      openedCells: this.$store.state.openedCells,
    }
  },
  computed: {
    boardArray() {
      return this.$store.state.board;
    },
  },
  methods: {
    clickCell(x, y) {
      console.log(x,y)
      this.openCell(x, y);
      this.openedCells = this.$store.state.openedCells;
    },
    openCell(x,y) {
      if (this.$store.state.openedCells[x][y] === 1) return;
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
