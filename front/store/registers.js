export const state = () => ({
    mainCompany: [],
    companyRegisterMessage: null,
});

export const mutations = {
    addMainCompany(state, payload) {
        state.mainCompany.push(payload);
    },
    setCompanyRegisterMessage(state, payload) {
        state.companyRegisterMessage = payload;
    },
};

export const actions = {
    async companyReg({ commit }, payload) {
        try {
            const res = await this.$axios.post('http://localhost:3085/register/company', {
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


