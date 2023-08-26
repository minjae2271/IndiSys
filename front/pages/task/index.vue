<template>
  <v-container>
    <div class="header">
      <h2>일일업무</h2>
    </div>
    <v-data-table
      :headers="headers"
      :items="mainTasks"
      :items-per-page="10"
      :item-class="itemRowBackground"
      :page.sync="page"
      no-data-text="상태, 날짜를 선택해주세요."
      hide-default-footer
      @click:row="taskDetail"
      @page-count="pageCount = $event"
    >
      <template v-slot:top>
        <!-- <v-toolbar
        flat
        >
        <v-toolbar-title>
          일일업무
        </v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider> -->
        <v-row no-gutters>
          <v-col class="task-preset" cols="12" lg="4">
            <v-select
              v-model="statusCheck"
              :items="selectItems"
              item-text="name"
              item-value="statusCode"
              hide-details="true"
              label="작업상태"
              outlined
            >
            </v-select>
          </v-col>
          <!-- menu1 -->
          <v-col class="task-preset" cols="12" lg="4">
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
                  label="작업시작일"
                  outlined
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
          <v-col class="task-preset" cols="12" lg="4">
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
                  label="작업종료일"
                  outlined
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
        <!-- <v-spacer></v-spacer> -->
        <!-- </v-toolbar> -->
      </template>
    </v-data-table>
    <v-row justify="center" no-gutters>
      <v-pagination
        v-model="page"
        :length="pageCount"
        :total-visible="totalVisible"
        next-icon="mdi-menu-right"
        prev-icon="mdi-menu-left"
      >
      </v-pagination>
    </v-row>
    <div class="btn-group">
      <v-btn
      dark
      to='/task/createTask'
      >
        업무등록
      </v-btn>
      <v-btn
        dark
        class="ml-3"
        @click="searchTasks"
      >
      조회
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import moment from 'moment'

export default {
  data() {
    return {
      menu1: false,
      menu2: false,
      page:1,
      pageCount: 0,
      totalVisible: 10,
      from: moment().format('YYYY-MM-DD'),
      to: moment().format('YYYY-MM-DD'),
      statusCheck: "99",
      selectItems: [
        { name: "진행중", statusCode: "1"},
        { name: "보류", statusCode: "2"},
        { name: "완료", statusCode: "3"},
        { name: "전체", statusCode: "99"},
      ],
      headers: [
        {
          text: '시작날짜',
          align: 'start',
          sortable: false,
          value: 'start_date',
        },
        {
          text: '작업내용',
          sortable: false,
          value: 'task_title',
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
    }
  },
  fetch({ store }) {
    return store.dispatch('tasks/loadTasks', {
      //momnet today!!!
      from: moment().format('YYYY-MM-DD'),
      to: moment().format('YYYY-MM-DD'),
      statusCheck: "1",
    });
  },
  computed: {
    mainTasks() {
      return this.$store.state.tasks.mainTasks;
    },
    taskRows() {
      return this.$store.state.tasks.taskRows;
    },
    taskRegisterMessage() {
      return this.$store.state.tasks.taskRegisterMessage;
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
    searchTasks() {
      this.$store.dispatch('tasks/loadTasks', {
        from: this.from,
        to: this.to,
        statusCheck: this.statusCheck,
      });
    },
    taskDetail(row) {
      this.$router.push(`/task/${row.id}`)
    },
    itemRowBackground(item) {
      if (item.status === "완료") {
        return 'done-style';
      }
    }
  }
}
</script>

<style>
.v-input {
  width: calc(100% - 32px);
}

.task-preset {
  margin-top: 20px;
}

.calendar {
  border: 1px solid black;
}

.v-data-table__wrapper {
  margin-top: 20px;
}

.done-style {
  background-color: #cbf078;
}

.btn-group {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

</style>