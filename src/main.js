// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
//import Vuex from 'vuex'
import App from './App'
import router from './router'
import {store} from './store/store'
//Vue.use(Vuex)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
// send the user to index html page inspite of the url
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});
app.listen(port);


