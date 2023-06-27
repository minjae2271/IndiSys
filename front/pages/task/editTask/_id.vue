<template>
  <v-container>
    <TaskEditForm :task="mainTask"></TaskEditForm>
  </v-container>
</template>

<script>
import TaskEditForm from '~/components/task/TaskEditForm.vue'

export default {
    fetch({ store, params }) {
        return store.dispatch(`tasks/loadTask`, {
            id: params.id
        })
    },
    components: {
        TaskEditForm
    },
    computed: {
        mainTask() {
            return this.$store.state.tasks.mainTask;
        },
    },
}
</script>

<style>

</style>