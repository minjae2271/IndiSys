<template>
    <v-container>
        <v-form
            ref="form"
            v-model="valid"
            @submit.prevent="onSubmitForm"
        >
            <v-text-field
                v-model="name"
                label="이름"
                :rules="nameRules"
                required
            >
            </v-text-field>
            <v-text-field
                v-model="password"
                label="password"
                type="password"
                :rules="passwordRules"
                required
            >
            </v-text-field>
            <v-btn
                type="submit"
            >
            submit
            </v-btn>
        </v-form>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            valid: true,
            name:'',
            password: '',
            nameRules: [
                v => !!v.trim() || '이름을 입력하세요',
            ],
            passwordRules: [
                v => !!v.trim() || '비밀번호를 입력하세요',
            ],
        }
    },
    methods: {
        onSubmitForm() {
            if(this.$refs.form.validate()) {
                this.$store.dispatch('users/logIn', {
                    name: this.name,
                    password: this.password,
                })
                .then(() => {
                    this.$router.push('/')
                })
                .catch((err) => {
                    console.log(err);
                });
            }
        }
    }
}
</script>

<style>

</style>