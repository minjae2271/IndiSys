export const state = () => ({
    mainCompany: [],
    companyRegisterMessage: null,
});

export const mutations = {
    setMainCompany(state, payload) {
        state.mainCompany = payload;
    },
    addMainCompany(state, payload) {
        state.mainCompany.push(payload);
    },
    setCompanyRegisterMessage(state, payload) {
        state.companyRegisterMessage = payload;
    },
};

export const actions = {
    async loadCompanies({ commit }, payload) {
        try {
            const res = await this.$axios.get('/register/company', {
                withCredentials: true,
            });
            commit('setMainCompany', res.data);
        } catch(err) {
            console.error(err);
        }
    },
    async createCompany({ commit }, payload) {
        try {
            const res = await this.$axios.post('/register/company', {
                CompanyName: payload.companyName,
            }, {
                withCredentials: true,
            });
            commit('addMainCompany', res.data);
            commit('setCompanyRegisterMessage', '등록이 완료 되었습니다.');
        }
        catch (err) {
            console.error(err);
            commit('setCompanyRegisterMessage', err.response.data.errorMessage ? err.response.data.errorMessage : err.message);
        }
}
}


