<template>
  <div class="container" :class='{open: open}' >
    <div v-if='open' class='elementContainer'>
      {{element}}
    </div>
  </div>
</template>

<script>
export default {
  name: "GameCell",
  props:{
    element: String,
    open: Boolean,
  },
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
.elementContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}
</style>
