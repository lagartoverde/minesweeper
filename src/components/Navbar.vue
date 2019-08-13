<template>
  <div class="navbar">
    <router-link :to="{ name: 'Main'}" class="brand">
      <div class="icon">
        <svg viewBox="0 0 512 512">
          <defs
            id="defs8" />
          <path
            id="path2"
            d="M336.174 80c-49.132 0-93.305-32-161.913-32-31.301 0-58.303 6.482-80.721 15.168a48.04 48.04 0 0 0 2.142-20.727C93.067 19.575 74.167 1.594 51.201.104 23.242-1.71 0 20.431 0 48c0 17.764 9.657 33.262 24 41.562V496c0 8.837 7.163 16 16 16h16c8.837 0 16-7.163 16-16v-83.443C109.869 395.28 143.259 384 199.826 384c49.132 0 93.305 32 161.913 32 58.479 0 101.972-22.617 128.548-39.981C503.846 367.161 512 352.051 512 335.855V95.937c0-34.459-35.264-57.768-66.904-44.117C409.193 67.309 371.641 80 336.174 80zM464 336c-21.783 15.412-60.824 32-102.261 32-59.945 0-102.002-32-161.913-32-43.361 0-96.379 9.403-127.826 24V128c21.784-15.412 60.824-32 102.261-32 59.945 0 102.002 32 161.913 32 43.271 0 96.32-17.366 127.826-32v240z"
            fill="currentColor" />
          <path
            style="line-height:normal;text-indent:0;text-align:start;text-decoration:none;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:currenColor;text-transform:none;isolation:auto;mix-blend-mode:normal;stroke-width:4.34515285"
            d="m 211.33423,140.17545 a 4.345594,4.3455811 60 0 0 -1.50188,5.95311 l 8.79639,15.23578 c -15.34342,10.02707 -26.06615,24.63999 -31.40834,41.00574 l -17.04163,-4.56636 a 4.345594,4.3455811 60 0 0 -3.35503,0.41813 4.345594,4.3455811 60 0 0 1.1061,7.97519 l 17.01843,4.56009 c -3.50306,16.83875 -1.5382,34.87812 6.72819,51.21824 l -15.24312,8.80062 a 4.345594,4.3455811 60 1 0 4.34517,7.52605 l 15.24312,-8.80062 c 10.01775,15.32894 24.65786,26.05024 40.99219,31.43588 l -4.56007,17.01843 a 4.345594,4.3455811 60 1 0 8.39328,2.24901 l 4.56624,-17.04166 c 16.84426,3.55643 34.86078,1.57672 51.21619,-6.69753 l 8.7964,15.23582 a 4.345594,4.3455811 60 1 0 7.52599,-4.34514 l -8.7964,-15.23581 c 15.34343,-10.02709 26.06615,-24.63999 31.40832,-41.00575 l 17.04165,4.56634 a 4.345594,4.3455811 60 1 0 2.24893,-8.3933 l -17.01843,-4.56007 c 3.50306,-16.83877 1.5382,-34.87812 -6.72818,-51.21822 l 15.24311,-8.80062 a 4.345594,4.3455811 60 1 0 -4.34516,-7.52605 l -15.24311,8.80062 C 316.74481,168.6544 302.10469,157.9331 285.77037,152.54746 l 4.56007,-17.01844 a 4.345594,4.3455811 60 0 0 -6.46393,-4.88184 4.345594,4.3455811 60 0 0 -1.92935,2.6328 l -4.56626,17.04168 c -16.84424,-3.5564 -34.86075,-1.57671 -51.21617,6.69755 l -8.79638,-15.23579 a 4.345594,4.3455811 60 0 0 -6.02412,-1.60797 z m 11.39854,58.71334 c 11.43203,-6.60028 26.04542,-2.6846 32.64572,8.74746 6.6003,11.43204 2.68469,26.04547 -8.74734,32.64575 -11.43201,6.60028 -26.04542,2.68459 -32.64572,-8.74746 -6.6003,-11.43205 -2.68467,-26.04547 8.74734,-32.64575 z"
            id="path80" />
        </svg>
      </div>
      <h1 class="title">Minesweeper</h1>
    </router-link>
    <div class="links">
      <router-link :to="{ name: 'Profile'}" class="navLink">Profile</router-link>
      <router-link :to="{ name: 'Leaderboard'}" class="navLink">Leaderboard</router-link>
    </div>
    <div class="username" v-responsive="'hidden-xs'">
      <div v-if='playerInfo' class="playerInfo">
        <h3 class="playerName">{{playerInfo.username}}</h3>
        <span class="playerLevel">lvl {{playerInfo.lvl}}</span>
        <div class="meter">
          <span :style="meterWidth"></span>
        </div>
      </div>
      
      <div v-else class="loginButtons">
        <button @click='login'>Select your name</button>
      </div>
      <Settings/>
    </div>
    <div v-if='playerInfo' class="playerInfo" v-responsive.sm.xs>
      <h3 class="playerName">{{playerInfo.username}}</h3>
      <div class="level">
        <span class="playerLevel">lvl {{playerInfo.lvl}}</span>
        <div class="meter">
          <span :style="meterWidth"></span>
        </div>
      </div>
    </div>
    <div v-else class="loginButtons" v-responsive.sm.xs>
      <button @click='login'>Select your name</button>
    </div>
    <Settings v-responsive.sm.xs/>
  </div> 
</template>

<script>
import Settings from './Settings'
export default {
  name: 'navbar',
  components: {
    Settings,
  },
  computed: {
    playerInfo() {
      return this.$store.state.playerInfo
    },
    meterWidth() {
      const playerInfo = this.$store.state.playerInfo;
      return `width: ${(playerInfo.lvlExp/playerInfo.nextExp)*100}%`
    }
  },
  methods: {
    login() {
      this.$modal.show('login');
      // let username = prompt('Enter your username')
      // this.$store.dispatch('login', username)
    }
  }
}
</script>

<style scoped lang='scss'>
.navbar {
  border-bottom: 1px solid var(--primary-color);
  padding: 5px 30px;
  display: flex;
  justify-content: space-between;
  box-shadow: var(--shadow);
  position: sticky;
  top: 0;
  background-color: var(--background-color);
  
}
.brand {
  display: flex;
  align-items: center;
  color: var(--primary-color);
  text-decoration: none;
}
.icon {
  height: 30px;
  width: 30px;
}
.title {
  margin: 0;
  font-weight: normal;
  padding: 0;
  width: fit-content;
  margin-left: 20px;
}
.links {
  display: flex;
  
}
.navLink {
  display: block;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 20px;
  color: var(--primary-color);
  text-decoration: none;

  &:hover {
    opacity: 0.5;
  }

}
.username{
  display: flex;
  align-items: center;
}
.loginButtons {
  margin-right: 100px;
  display:flex;
  flex-direction: row;
  align-items: center;
  button {
    border: var(--button-border);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
    background-color: var(--background-color);
    color: var(--primary-color);
    font-family: var(--font), Helvetica, Arial, sans-serif;
    margin-left: 10px;
    margin-right: 10px;
    padding: 5px 10px;
    font-size: 0.8em;
    cursor: pointer;
  }
}
.playerInfo {
  margin-right: 100px;
  display:flex;
  flex-direction: row;
  align-items: center;
}
.playerName {
  margin: 0;
  margin-right: 10px;

}
.playerLevel {
  margin-right: 2px;
}
.meter { 
	height: 10px;  /* Can be anything */
  width: 100px;
	position: relative;
	background: #555;
	-moz-border-radius: 25px;
	-webkit-border-radius: 25px;
	border-radius: 25px;
	padding: 2px;
	box-shadow: inset 0 -1px 1px rgba(255,255,255,0.3);
}
.meter > span {
  display: block;
  height: 100%;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  background-color: rgb(43,194,83);
  background-image: linear-gradient(
    center bottom,
    rgb(43,194,83) 37%,
    rgb(84,240,84) 69%
  );
  box-shadow: 
    inset 0 2px 9px  rgba(255,255,255,0.3),
    inset 0 -2px 6px rgba(0,0,0,0.4);
  position: relative;
  overflow: hidden;
}
@media screen and (max-width: 600px){
  .title {
    display: none;
  }
  .playerInfo {
    flex-direction: column;
    margin: 0;
  }
  .loginButtons {
    margin: 0;
  }
  .navbar {
    align-items: center;
  }
  .playerName {
    text-align: center;
    margin: 0;
  }
  .level {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 5px;
    .playerLevel {
      margin-right: 5px;
    }
  }
}
</style>
