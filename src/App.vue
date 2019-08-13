<template>
  <div id="app" :class="theme">
    <LoginModal />
    <Navbar />
    <div class='route'>
      <router-view></router-view>
    </div>
    
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import LoginModal from './components/LoginModal'
export default {
  name: "app",
  components: {
    Navbar,
    LoginModal
  },
  computed: {
    theme() {
      return this.$store.state.theme
    },
  }
};
</script>

<style>

@font-face {
    font-family: 'arcade_interlacedregular';
    src: url('assets/fonts/arcade_i-webfont.woff2') format('woff2'),url('assets/fonts/arcade_i-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;

}

@font-face {
    font-family: 'arcade_normalregular';
    src: url('assets/fonts/arcade_n-webfont.woff2') format('woff2'), url('assets/fonts/arcade_n-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;

}

@font-face {
    font-family: 'arcade_roundedregular';
    src: url('assets/fonts/arcade_r-webfont.woff2') format('woff2'), url('assets/fonts/arcade_r-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'herrvonmuellerhoff';
    src: url('assets/fonts/herrvonmuellerhoff.woff2') format('woff2'), url('assets/fonts/herrvonmuellerhoff.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

#app {
  font-family: var(--font), Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--primary-color) ;
  background-color: var(--background-color);
  margin:0;
  min-height: 100vh;
  box-sizing: border-box;
}


body, html {
  -webkit-touch-callout: none !important;
  margin: 0;
}
.route {
  width: 100%;
}

:root {
  --background-color: white;
  --primary-color: black;
  --font:  "Arial";
  --cellBackground: var(--background-color);
  --cellFontColor: var(--primary-color);
  --cellBorderColor: var(--primary-color);
  --cellBackgroundOpen: var(--primary-color);
  --cellFontColorOpen: var(--background-color);
  --cellBorderColorOpen: var(--background-color);
  --button-border: 1px solid var(--primary-color); 
  --gameOuterBorder: none;
  --border-radius: 0;
  --shadow: none;
}

.default {
  --cellBackground: #CCC;
  --cellFontColor: black;
  --cellBackgroundOpen: white;
  --cellFontColorOpen: black;
  --cellBorderColorOpen: black;
  --button-border: 1px solid var(--primary-color); 
  --border-radius: 10px;
  --shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
}

.matrix {
  --background-color: black;
  --primary-color: #008f11;
  --font:  "arcade_interlacedregular";
  --gameOuterBorder: 1px solid #008f11;
  --cellBackground: var(--background-color);
  --cellFontColor: var(--primary-color);
  --cellBorderColor: var(--primary-color);
  --cellBackgroundOpen: var(--primary-color);
  --cellFontColorOpen: var(--background-color);
  --cellBorderColorOpen: var(--background-color);
  --button-border: 1px solid var(--primary-color); 
}

.paper {
  --font: "herrvonmuellerhoff";
  --background-color: #0000;
  --cellBackground: #0000;
  --cellBackgroundOpen: #0000;
  --cellFontColorOpen: black;
  --cellBorderColorOpen: black;
  --button-border: none;
  --border-radius: 10px;
  background-color: #fff;
  background-size: 100% 1.2em;
  background-image: -webkit-linear-gradient(0deg, transparent 79px, #abced4 79px, #abced4 81px, transparent 81px),
                  -webkit-linear-gradient(#eee .05em, transparent .05em);
  background-image: -moz-linear-gradient(0deg, transparent 79px, #abced4 79px, #abced4 81px, transparent 81px),
                  -moz-linear-gradient(#eee .05em, transparent .05em);
  background-image: linear-gradient(90deg, transparent 79px, #abced4 79px, #abced4 81px, transparent 81px),
                  linear-gradient(#eee .05em, transparent .05em);
  -pie-background: linear-gradient(90deg, transparent 79px, #abced4 79px, #abced4 81px, transparent 81px) 0 0 / 100% 1.2em,
                 linear-gradient(#eee .05em, transparent .05em) 0 0 / 100% 1.2em #fff;
  behavior: url(/pie/PIE.htc);
  font-size: 20px;
}

</style>
