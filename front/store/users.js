export const state = () => ({
    me: null,
});

export const mutations = {
    setMe(state, payload) {
        state.me = payload;
    },
};

export const actions = {
    signUp({ commit }, payload) {
        this.$axios.post('http://localhost:3085/user', {
            name: payload.name,
            password: payload.password,
        }, {
            withCredentials: true,
        })
        .then((res) => {
            commit('setMe', res.data);
        })
        .catch((err) => {
            console.error(err);
        });        
    },
    logIn({ commit }, payload) {
        this.$axios.post('http://localhost:3085/user/login', {
            name: payload.name,
            password: payload.password, 
        }, {
            withCredentials: true,
        })
        .then((res) => {
            commit('setMe', res.data);
        })
        .catch((err) => {
            console.error(err);
        });  
    },
    logOut({ commit }, payload) {
        this.$axios.post('http://localhost:3085/user/logout', {

        }, {
            withCredentials: true,
        })
        .then((res) => {
            commit('setMe', null);
        })
        .catch((err) => {
            console.error(err);
        });  
    }
}



