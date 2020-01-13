import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: JSON.parse(window.sessionStorage.getItem("user")),
        routes: []
    },
    mutations: {
        login(state, user) {
            state.user = user;
        },
        logout(state) {
            state.routes = [];
        },
        initMenu(state, data) {
            state.routes = data;
        }
    }
})