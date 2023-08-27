export const state = () => ({
    me: null,
});

export const mutations = {
    setMe(state, payload) {
        state.me = payload;
    },
};

export const actions = {
    async loadUser({ commit }, payload) {
        try{
            const res = await this.$axios.get('user', {
                withCredentials: true
            });
            commit('setMe', res.data);
        } catch(err) {
            console.error(err);
            // return this.$nuxt.error({
            //     statusCode: err.response.status,
            //     errorMessage: err.response.data
            // });
        }
    },
    signUp({ commit }, payload) {
        this.$axios.post('user', {
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
            // return this.$nuxt.error({
            //     statusCode: err.response.status,
            //     errorMessage: err.response.data
            // });
        });        
    },
    logIn({ commit }, payload) {
        this.$axios.post('user/login', {
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
            // return this.$nuxt.error({
            //     statusCode: err.response.status,
            //     errorMessage: err.response.data
            // });
        });  
    },
    logOut({ commit }, payload) {
        this.$axios.post('user/logout', {

        }, {
            withCredentials: true,
        })
        .then((res) => {
            commit('setMe', null);
        })
        .catch((err) => {
            console.error(err);
            // return this.$nuxt.error({
            //     statusCode: err.response.status,
            //     errorMessage: err.response.data
            // });
        });  
    }
}



