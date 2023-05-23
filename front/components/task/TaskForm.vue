<template>
  <v-container>
    <v-form
    ref="form"
    v-model="valid"
    @submit.prevent="onSubmitForm"
    >
    <v-textarea
    v-model="taskText"
      label="작업내용"
    ></v-textarea>
    <v-btn
      type="submit"
      >
      작업등록
    </v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      valid: true,
      date: '',
      taskText: '',
    }
  },
  methods: {
    async onSubmitForm() {
      try{
        await this.$store.dispatch('tasks/createTask', {
          taskText: this.taskText,
        });
        this.$router.replace({ path: '/task'})
      } catch(err) {
        console.error(err);
      }
    }
  }
}
</script>

<style>

</style>