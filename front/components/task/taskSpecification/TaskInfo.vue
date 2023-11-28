<template>
  <div id="task-main-wrap">
    <div class="task-head">
        <div class="task-title-wrap">
            <h1>{{ mainTask.task_title }}</h1>
                <div class="task-status-wrap">
                    <v-chip
                        v-if="mainTask.status === '1'"
                        class="me-1"
                        color="primary"
                        label
                        >
                        <v-icon left>
                            mdi-circle-slice-2
                        </v-icon>
                        진행중
                    </v-chip>
                    <v-chip
                        v-if="mainTask.status === '2'"
                        class="me-1"
                        color="warning"
                        label
                    >
                        <v-icon left>
                            mdi-stop-circle-outline
                        </v-icon>
                        보류
                    </v-chip>
                    <v-chip
                        v-if="mainTask.status === '3'"
                        class="me-1"
                        color="success"
                        label
                    >
                        <v-icon left>
                            mdi-check-outline
                        </v-icon>
                        완료
                    </v-chip>
            </div>
        </div>
        <div class="task-date-wrap">
            <div class="task-start">
                <span>{{ mainTask.start_date }} ~ </span>
            </div>
            <div class="task-end" v-if="mainTask.status === '3'">
                <span>{{ mainTask.done_date }}</span>
            </div>
        </div>

    </div>
    <div class="task-body">
        <div class="task-text-wrap">
            <v-card class="card">
                <v-card-text class="mt-5" style="font-size:2em">
                    <pre>{{ mainTask.task_text }} </pre>
                </v-card-text>
            </v-card>
        </div>
        <div class="task-button-wrap">
            <v-btn
            class="mr-2"
            outlined
            @click="editTask"
            >
                <v-icon>
                mdi-pencil
              </v-icon>
              수정
            </v-btn>
            <v-btn
            class="mr-2"
            color="error"
            outlined
            @click.stop="deleteTask"
            >
              <v-icon>
                mdi-delete
              </v-icon>
              삭제
            </v-btn>
        </div>
    </div>
    <div class="task-foot">
        <br />
    </div>
  </div>
</template>

<script>
export default {
    props: {
        mainTask: {
            type: Object
        }
    },
    methods: {
        async deleteTask() {
            try {
                await this.$store.dispatch('tasks/deleteTask', {
                    id: this.$route.params.id,
                });
                this.$router.push('/task')
            } catch(err) {
                console.error(err);
            }

        },       
        editTask() {
            this.$router.push(`/task/editTask/${this.$route.params.id}`)
        },
    }
}
</script>

<style scoped>
.task-title-wrap {
    display: flex;
}

.task-status-wrap {
    display: flex;
    align-items: center;
    margin-left: 15px;
}
.task-head {
    margin-top: 20px;
}

.task-date-wrap {
    display: flex;
}

.task-date-wrap > div {
    color: #70757a;
    margin: 5px;
}

.task-body {
    margin-top: 10px;
}

.card {
    min-height: 250px;
}

.task-button-wrap {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
}

</style>