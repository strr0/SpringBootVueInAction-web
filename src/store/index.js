import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: {
            name: '',
            userface: '',
            username: '',
            roles: []
        },
        routes: []
    },
    mutations: {
        login(state, user) {
            state.user = user;
        },
        logout(state) {
            state.routes = [];
        },
        initMenu(state, menus) {
            state.routes = menus;
        }
    }
})