<template>
  <div class='content'>
    <Game />
    <LeaderBoard v-if="!isMultiplayer"/>
  </div>
</template>

<script>

import Game from "../components/Game.vue";
import LeaderBoard from '../components/LeaderBoard.vue'

export default {
  name: "Main",
  components: {
    Game,
    LeaderBoard,
  },
  created() {
    this.$store.dispatch('getLeaderboard')
  },
  computed: {

    isMultiplayer() {
      return this.$store.state.mode === 'multiplayer'
    }
  }
};
</script>

<style>
.content {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  padding-top: 30px;
}
</style>
