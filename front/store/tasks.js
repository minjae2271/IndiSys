export const state = () => ({
    mainTasks: [],
    taskRows: [],
    taskRegisterMessage: null,
});

export const mutations = {
    loadMainTasks(state, payload) {
        state.mainTasks = payload;
    },
    addMainTasks(state, payload) {
        state.mainTasks.push(payload);
    },
    setTaskRows(state, payload) {
        const rows = payload.map((obj) => {
            if(obj.key === 'User') {
                let rObj = {};
                rObj[obj.key] = obj.value.name
                // console.log(rObj)
                return rObj;
            } else {
                // console.log(obj)
                return obj;
            }
        });
        // console.log(rows)
        state.taskRows = rows;
    },
    setTaskRegisterMessage(state, payload) {
        state.taskRegisterMessage = payload;
    },
};

export const actions = {
    async createTask({ commit }, payload) {
        try {
            const res = await this.$axios.post('http://localhost:3085/task/createTask', {
                userId: payload.userId,
                taskText: payload.taskText,
            }, {
                withCredentials: true,
            });
            commit('addMainTasks', res.data);
            commit('setTaskRegisterMessage', '작업등록이 완료 되었습니다.');
        }
        catch (err) {
            console.error(err);
            commit('setTaskRegisterMessage', err.response.data.errorMessage ? err.response.data.errorMessage : err.message);
        }
    },
    async loadTasks({ commit }, payload) {
        try {
            const res = await this.$axios.get('http://localhost:3085/task/loadTasks', {

            }, {
                withCredentials: true,
            });
            // console.log(res.data)
            commit('loadMainTasks', res.data);
            commit('setTaskRows', res.data);
        }
        catch (err) {
            console.error(err);
        }
    }
}


