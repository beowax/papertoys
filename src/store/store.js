import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
      b64texture: null,
      needs2Dupdate: false,
      needs3Dupdate: false
    },
    mutations: {
        // store.commit('updateMap', {b64: "dsdfsfsdfsdfsdfsdf"})
       updateb64texture (state, payload) {
          state.b64texture = payload.b64
        },
        // store.commit('askupdate')
        /*,
        askupdate (state) {
            state.needs2Dupdate = true
            state.needs3Dupdate = true
        },
        askupdate (state) {
          state.needs2Dupdate = true
          state.needs3Dupdate = true
        }*/
        needsUpdate(state, payload) {
          state.needs2Dupdate = payload.update;
          state.needs3Dupdate = payload.update;
        },
        updateMap(state, payload){
          state.b64texture = payload.b64
        }
      }
  })