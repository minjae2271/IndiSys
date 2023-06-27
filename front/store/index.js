export const actions = {
    nuxtServerInit({ comit, dispatch, state }, { req }) {
        return dispatch('users/loadUser');
    }
}