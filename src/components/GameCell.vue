<template>
  <div class="container" :class='{open: open}' >
    <img v-if='flagged' src='../assets/flag.svg' />
    <div v-if='open' class='center'>
      <img v-if='element === "X"' src='../assets/mine.svg' />
      <span v-else>{{element}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GameCell",
  props:{
    element: String,
    state: Number,
  },
  computed: {
    open() {
      return this.state === 1;
    },
    flagged() {
      return this.state === 2;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  background-color: gray;
  border: 1px solid black;
  height: 100%;
  width: 100%;
}
.open {
  background-color: white;
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
