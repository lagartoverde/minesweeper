import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from './router'

import 'pepjs' // Pointer events polyfill for long touch on safari

import { longClickDirective } from 'vue-long-click'
import vSelect from 'vue-select'
import responsive from 'vue-responsive';
import VModal from 'vue-js-modal'


Vue.use(VModal)


Vue.use(responsive);

const longClickInstance = longClickDirective({delay: 200, interval: 4000})
Vue.directive('longclick', longClickInstance)

Vue.config.productionTip = false;
Vue.component('v-select', vSelect)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
