export const state = () => ({
    mainTasks: [],
    mainTask: null,
    taskRegisterMessage: null,
    beforeImages: [],
    afterImages: [],
});

export const mutations = {
    loadMainTasks(state, payload) {
        const rows = payload.map((obj) => {
            let rObj = {};
            rObj['start_date'] = obj['start_date'];
            rObj['done_date'] = obj['done_date'];
            if (obj['status'] === '1') {
                rObj['status'] = "진행중"
            }
            if (obj['status'] === '2') {
                rObj['status'] = "보류"
            }
            if (obj['status'] === '3') {
                rObj['status'] = "완료"
            }
            rObj['statusCode'] = obj['status'];
            rObj['name'] = obj['User'].name;
            rObj['id'] = obj['id'];
            rObj['task_title'] = obj['task_title'];
            return rObj
        });
        state.mainTasks = rows;
    },
    loadMainTask(state, payload) {
        state.mainTask = payload;
    },
    addMainTasks(state, payload) {
        let rObj = {};
        rObj['start_date'] = payload['start_date'];
        rObj['done_date'] = payload['done_date'];
        rObj['status'] = payload['status'];
        rObj['name'] = payload['User'].name;
        rObj['id'] = payload['id'];
        rObj['task_title'] = payload['task_title'];
        state.mainTasks.push(payload);
    },
    deleteMainTask(state, payload) {
        const index = state.mainTasks.findIndex(v => {
            v.id === payload.id
        });
        state.mainTasks.splice(index, 1);
    },
    concatBeforeImage(state, payload) {
        state.beforeImages = state.beforeImages.concat(payload);
    },
    concatAfterImage(state, payload) {
        state.afterImages = state.afterImages.concat(payload);
    },
    removeBeforeImage(state, payload) {
        state.beforeImages.splice(payload, 1);
    },
    removeAfterImage(state, payload) {
        state.afterImages.splice(payload, 1);
    },
    deleteImgFromMainTask(state, payload) {
        //findIndex 내부로직 {} 할 시 index가 무조건 -1로 나오는 현상
        const index = state.mainTask.Images.findIndex(v => v.id === payload);
        state.mainTask.Images.splice(index, 1);
    },
    clearImages(state) {
        state.beforeImages = []
        state.afterImages = []
    },
};

export const actions = {
    async loadTasks({ commit }, payload) {
        try {
            const res = await this.$axios.get(`task/loadTasks?from=${payload.from}&to=${payload.to}&statusCheck=${payload.statusCheck}`, {
                withCredentials: true,
            });
            commit('loadMainTasks', res.data);
            commit('clearImages')
        }
        catch (err) {
            console.error(err);
        }
    },
    async loadTask({ commit }, payload) {
        try {
            const res = await this.$axios.get(`task/loadTask?id=${payload.id}`, {
                withCredentials: true
            });
            commit('loadMainTask', res.data)
        } catch(err) {
            console.error(err);
            // return this.$nuxt.error({
            //     statusCode: err.response.status,
            //     errorMessage: err.response.data
            // });
        }
    },
    async finishTask( {commit, state }, payload) {
        try {
            const res = await this.$axios.post('task/finishTask', {
                id: payload.id,
                beforeImages: state.beforeImages,
                afterImages: state.afterImages,
            }, {
                withCredentials: true,
            });
        } catch(err) {
            console.log(err);
            // return this.$nuxt.error({
            //     statusCode: err.response.status,
            //     errorMessage: err.response.data
            // });
        }
    },
    async createTask({ commit, state }, payload) {
        try {
            const res = await this.$axios.post('task/createTask', {
                from: payload.from,
                to: payload.to,
                taskTitle: payload.taskTitle,
                taskText: payload.taskText,
            }, {
                withCredentials: true,
            });
        }
        catch (err) {
            console.error(err);
            // return this.$nuxt.error({
            //     statusCode: err.response.status,
            //     errorMessage: err.response.data
            // });
        }
    },
    async editTask({ commit }, payload) {
        try {
            const res = await this.$axios.patch(`task/${payload.id}`, {
                from: payload.from,
                to: payload.to,
                taskTitle: payload.taskTitle,
                taskText: payload.taskText,
                status: payload.status,
            }, {
                withCredentials: true,
            });
        }catch(err) {
            console.error(err);
            // return this.$nuxt.error({
            //     statusCode: err.response.status,
            //     errorMessage: err.response.data
            // });
        }
    },
    async deleteTask({ commit }, payload) {
        try {
            const res = await this.$axios.delete(`task/${payload.id}`, {
                withCredentials: true,
            });
            commit('deleteMainTask', payload);
        }
        catch(err) {
            console.error(err);
            // return this.$nuxt.error({
            //     statusCode: err.response.status,
            //     errorMessage: err.response.data
            // });
        }
    },
    async uploadBeforeImages({ commit }, payload) {
        try {
            const res = await this.$axios.post(`task/before`, payload, {
                withCredentials: true,
            });
            commit('concatBeforeImage', res.data);
        } catch(err) {
            console.error(err);
            // return this.$nuxt.error({
            //     statusCode: err.response.status,
            //     errorMessage: err.response.data
            // });
        }
    },
    async uploadAfterImages({ commit }, payload) {
        try {
            const res = await this.$axios.post(`task/after`, payload, {
                withCredentials: true,
            });
            commit('concatAfterImage', res.data)
        } catch(err) {
            console.error(err);
            // return this.$nuxt.error({
            //     statusCode: err.response.status,
            //     errorMessage: err.response.data
            // });
        }
    },
    async deleteImg({ commit }, payload) {
        try {
            console.log(typeof payload)
            console.log(payload)
            const stringId = payload.toString()
            const res = await this.$axios.delete(`task/deleteImg/${stringId}`, {
                withCredentials: true,
            });
            commit('deleteImgFromMainTask', payload)
        } catch(err) {
            console.error(err);
            // return this.$nuxt.error({
            //     statusCode: err.response.status,
            //     errorMessage: err.response.data
            // });
        }
    }
}


