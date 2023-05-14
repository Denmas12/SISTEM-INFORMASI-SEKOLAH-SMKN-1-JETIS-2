import { createApp } from "vue";
import VueProgressBar from "@aacassandra/vue3-progressbar";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from './plugins/font-awesome'

import setupInterceptors from './services/setupInterceptors';

const options = {
  color: 'rgb(143, 255, 199)',
  failedColor: 'red',
  height: '20px',
  thickness: "5px",
  transition: {
    speed: "0.2s",
    opacity: "0.6s",
    termination: 300,
  },
  autoRevert: true,
  location: "top",
  inverse: false,
};

setupInterceptors(store);

createApp(App)
  .use(router)
  .use(store)
  .use(VueProgressBar, options)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");