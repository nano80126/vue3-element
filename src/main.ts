import { createApp } from 'vue';
import 'element-plus/theme-chalk/dark/css-vars.css';
import './styles/style.scss';
// import './styles/layout.scss';
import App from './App.vue';
import router from './router';
import { store, key } from './store';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// import {} from "@fortawesome/free-brands-svg-icons"
import { faWindowMinimize, faXmark, faMagnifyingGlass, faList } from '@fortawesome/free-solid-svg-icons';
import { faWindowMaximize, faWindowRestore } from '@fortawesome/free-regular-svg-icons';
import { faChrome, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faMusic, faMicrophone } from '@fortawesome/free-solid-svg-icons';

// import vue-virtual-scroller
import * as VueVirtualScroller from 'vue-virtual-scroller';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';

library.add(faWindowMinimize, faWindowMaximize, faWindowRestore, faXmark, faMagnifyingGlass, faList);
library.add(faMusic, faMicrophone);
library.add(faChrome, faYoutube);

const app = createApp(App);

app.use(router).use(store, key).component('font-awesome-icon', FontAwesomeIcon).component('RecycleScroller', VueVirtualScroller.RecycleScroller).mount('#app');
