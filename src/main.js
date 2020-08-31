import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import router from "./router";
import './permission';
import './components/Global/global'
import MessageMixin from './mixin/messageMixin'
import TableMixin from './mixin/tableMixin'
import Mock from '@/mock'
Vue.use(ElementUI);
Vue.mixin(MessageMixin);
Vue.mixin(TableMixin);
Vue.config.productionTip = process.env.NODE_ENV === "production";


new Vue({
  router,
  render: h => h(App)
}).$mount("#app");