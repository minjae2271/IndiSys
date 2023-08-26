<template>
  <v-container>
    <div class="header">
      <h2>업무등록</h2>
    </div>
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
              min-width="300px"
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
          min-width="300px"
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
  <v-row>
    <v-col>
      <v-text-field
        id="task-input"
        v-model="taskTitle"
        prepend-inner-icon="mdi-comment"
        background-color="#fcf4d9"
        label="작업제목"
        :rules="Taskrule"
        outlined
        required
      ></v-text-field>
      <v-textarea
        id="task-textarea"
        v-model="taskText"
        prepend-inner-icon="mdi-comment"
        background-color="#fcf4d9"
        label="작업내용"
        :rules="Taskrule"
        outlined
        required
      ></v-textarea>
    </v-col>
  </v-row>
      <v-btn
        dark
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
      taskTitle: '',
      taskText: '',
      Taskrule: [
        v => !!v || "필수항목입니다."
      ]
    }
  },
  methods: {
    fromSearch(v) {
            this.from = v;
            this.menu1 = false;
            this.$refs.menu1.save(v);
        },
      toSearch(v) {
          this.to = v;
          this.menu2 = false;
          this.$refs.menu2.save(v);
      },
    async onSubmitForm() {
      try{
        await this.$store.dispatch('tasks/createTask', {
          from: this.from,
          to: this.to,
          taskTitle: this.taskTitle,
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

<style scoped>

</style>