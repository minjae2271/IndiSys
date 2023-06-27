<template>
  <v-container>
    <v-form
    ref="form"
    v-model="valid"
    @submit.prevent="onSubmitForm"
    >
    <v-row>
      <!-- menu1 -->
      <v-col cols="12" lg="6">
          <v-menu
              ref="menu1"
              v-model="menu1"
              :close-on-content-click="false"
              :return-value.sync="from"
              transition="scale-transition"
              offset-y
              min-width="350px"
          >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="from"
              prepend-icon="mdi-calendar"
              readonly
              hide-details="true"
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="from"
            no-title-scrollable
            :max="to"
          >
            <v-spacer></v-spacer>
              <v-btn
                text
                color="primary"
                @click="menu1 = false"
              >
              cancel
              </v-btn>
              <v-btn
              text
              color="primary"
              @click="fromSearch(from)"
              >
              OK
              </v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
      <!-- menu2 -->
      <v-col cols="12" lg="6">
        <v-menu
          ref="menu2"
          v-model="menu2"
          :close-on-content-click="false"
          :return-value.sync="to"
          transition="scale-transition"
          offset-y
          min-width="350px"
          >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="to"
              prepend-icon="mdi-calendar"
              readonly
              hide-details="true"
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="to"
            no-title-scrollable
            :min="from"
          >
            <v-spacer></v-spacer>
              <v-btn
                text
                color="primary"
                @click="menu2 = false"
              >
              cancel
              </v-btn>
              <v-btn
              text
              color="primary"
              @click="toSearch(to)"
              >
              OK
              </v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
  </v-row>
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
import moment from 'moment'

export default {
  data() {
    return {
      menu1: false,
      menu2: false,
      from: moment().format('YYYY-MM-DD'),
      to: moment().format('YYYY-MM-DD'),
      valid: true,
      taskText: '',
    }
  },
  methods: {
    async onSubmitForm() {
      try{
        await this.$store.dispatch('tasks/createTask', {
          from: this.from,
          to: this.to,
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