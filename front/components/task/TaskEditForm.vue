<template>
  <v-container>
    <v-form
        ref='form'
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
    <v-row>
      <v-col>
        <v-textarea
            v-model="text"
            label="작업내용"
        ></v-textarea>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-select
            v-model="statusCheck"
            :items="selectItems"
            item-text="name"
            item-value="statusCode"
            hide-details="true"
            label="작업상태"
        >
        </v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-spacer></v-spacer>
      <v-btn
          class="mt-7"
          type="submit"
          >
          작업수정 하기
      </v-btn>
    </v-row>
    </v-form>
  </v-container>
</template>

<script>
export default {
    props: {
        task: Object,
    },
    data() {
        return {
            valid: true,
            menu1: false,
            menu2: false,
            from: this.task.start_date,
            to: this.task.done_date,
            text: this.task.task_text,
            statusCheck: this.task.status,
            selectItems: [
                { name: "진행중", statusCode: "1"},
                { name: "보류", statusCode: "2"},
                { name: "완료", statusCode: "3"},
            ],
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
            try {
                await this.$store.dispatch('tasks/editTask', {
                    id: this.task.id,
                    from: this.from,
                    to: this.to,
                    text: this.text,
                    status: this.statusCheck
                });
                this.$router.replace({ path: `/task/${this.task.id}`})
            } catch(err) {
                console.error(err);
            }
        }
    }
}
</script>

<style>

</style>