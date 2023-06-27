<template>
    <v-container>
        <v-form
        ref="form"
        v-model="valid"
        @submit.prevent="onSubmitForm"
    >
        <v-text-field
            v-model="companyName"
            label="회사명"
            :rules="companyNameRules"
            required
        >
        </v-text-field>
        <v-btn
            type="submit"
        >
        등록
        </v-btn>
        </v-form>
        <p>{{ mainCompany }} </p>
        <p>{{ companyRegisterMessage }}</p>
    </v-container>
    
</template>

<script>
export default {
    fetch({ store }) {
    store.dispatch('registers/loadCompanies');
  },
    data() {
        return {
            valid: true,
            companyName:'',
            companyNameRules: [
                v => !!v.trim() || '회사명을 입력하세요',
            ],
        }
    },
    computed: {
        mainCompany() {
            return this.$store.state.registers.mainCompany
        },
        companyRegisterMessage() {
            return this.$store.state.registers.companyRegisterMessage;
        }
    },
    methods: {
        async onSubmitForm() {
            if(this.$refs.form.validate()) {
                try{
                    await this.$store.dispatch('registers/createCompany', {
                        companyName: this.companyName,
                    });
                }
                catch (err) {
                    console.error(err);
                }
            }
        }
    }
}
</script>

<style>

</style>