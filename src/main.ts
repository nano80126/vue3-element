import { createApp } from 'vue';
// import 'element-plus/theme-chalk/dark/css-vars.css';
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
import { faMusic, faMicrophone, faAngleLeft, faAngleRight, faPlus, faMinus, faLink, faCheck, faEllipsis, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faSquare, faRectangleList } from '@fortawesome/free-solid-svg-icons';

// import vue-virtual-scroller
import * as VueVirtualScroller from 'vue-virtual-scroller';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';

import '@/assets/styles/index.scss';

library.add(faWindowMinimize, faWindowMaximize, faWindowRestore, faXmark, faMagnifyingGlass, faList);
library.add(faMusic, faMicrophone, faAngleLeft, faAngleRight, faPlus, faMinus, faLink, faCheck, faEllipsis, faArrowLeft, faSquare, faRectangleList);
library.add(faChrome, faYoutube);

const app = createApp(App);

app.use(router)
	.use(store, key)
	.component('font-awesome-icon', FontAwesomeIcon)
	.component('recycle-scroller', VueVirtualScroller.RecycleScroller)
	.component('dynamic-scroller', VueVirtualScroller.DynamicScroller)
	.mount('#app');
