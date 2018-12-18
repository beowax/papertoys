
import Vuex from 'vuex'

const paperStore = new Vuex.Store({
    state: {
      count: 0,
      base64:null
    },
    mutations: {
      increment (state) {
        state.count++
      },
      base64 (state){
          console.log(state);
      }
    }
});
