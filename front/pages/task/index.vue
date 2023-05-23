<template>
  <v-container>
    <v-data-table
      :headers="headers"
      hide-default-footer
    >
      <template v-slot:top>
        <v-toolbar
        flat
        >
        <v-toolbar-title>
          일일작업
        </v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-btn
          dark
          class="mb-2"
          to='/task/createTask'
        >등록
        </v-btn>
        </v-toolbar>
      </template>
    </v-data-table>


    <p>{{ mainTasks}}</p>
    <p>{{ taskRegisterMessage }}</p>
    <p>{{ rows }}</p>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          text: '날짜',
          align: 'start',
          sortable: false,
          value: 'date',
        },
        {
          text: '작업상태',
          sortable: false,
          value: 'status'
        },
        { text: '작업자',
          sortable: false,
          value: 'name' 
        },
      ],
      rows: [],
    }
  },
  fetch({ store }) {
    store.dispatch('tasks/loadTasks');
  },
  computed: {
    mainTasks() {
      return this.$store.state.tasks.mainTasks;
    },
    taskRegisterMessage() {
      return this.$store.state.tasks.taskRegisterMessage;
    }
  }
}
</script>

<style>

</style>