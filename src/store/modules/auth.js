const state = {
    token: localStorage.getItem('token') || null, // 初始从 localStorage 读取
    user: JSON.parse(localStorage.getItem('user') || null)
};

const mutations = {
    SET_AUTH_DATA(state, { token, user }) {
        state.token = token;
        state.user = user;
        // 同步到 localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
    },
    CLEAR_AUTH_DATA(state) {
        state.token = null;
        state.user = null;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
};

const actions = {
    login({ commit }, authData) {
        // authData 应包含 { token, user }
        commit('SET_AUTH_DATA', authData);
    },
    logout({ commit }) {
        commit('CLEAR_AUTH_DATA');
    }
};

const getters = {
    isAuthenticated: state => !!state.token,
    currentUser: state => state.user
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};