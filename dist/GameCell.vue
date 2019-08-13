<template>
  <div class="cell" :class='{open: element !== "?" && element !== "F"}' >
    <img v-if='element === "F"' :src='flag' />
    <div v-if='element !== "?" && element !== "F"' class='center'>
      <img v-if='element === "X"' :src='mine' />
      <span v-else>{{element}}</span>
    </div>
  </div>
</template>

<script>
import Themes from '../themes.json'
export default {
  name: "GameCell",
  props:{
    element: String,
    state: Number,
  },
  computed: {
    flag() {
      const theme = this.$store.state.theme;
      if(theme) {
        if(Themes[theme] && Themes[theme].icons && Themes[theme].icons.flag) {
          return Themes[theme].icons.flag;
        } else {
          return Themes.default.icons.flag
        }
      }
      return Themes.default.icons.flag
    },
    mine() {
      const theme = this.$store.state.theme;
      if(theme) {
        if(Themes[theme] && Themes[theme].icons && Themes[theme].icons.mine) {
          return Themes[theme].icons.mine;
        } else {
          return Themes.default.icons.mine
        }
      }
      return Themes.default.icons.mine
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cell {
  display: flex;
  flex-direction: column;
  background-color: var(--background-color);
  border: 1px solid var(--primary-color);
  color: var(--primary-color);
  height: 100%;
  width: 100%;
  user-select: none; 
  -webkit-user-select: none !important;
}
.open {
  background-color: var(--primary-color);
  border-color: var(--background-color);
  color: var(--background-color);
}
.center{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}
img {
  height: 50%;
  width: 50%;
  margin: auto;
}
</style>
