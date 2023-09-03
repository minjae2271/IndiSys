<template>
    <v-app>
        <div>
            <v-toolbar dark>
                <v-toolbar-title
                    class="mr-3"
                >
                    <nuxt-link to="/">INDI</nuxt-link>
                </v-toolbar-title>
                <v-btn text to="/task">
                    일일업무
                </v-btn>
                <v-btn text to="/inven">
                    재고현황
                </v-btn>
                <v-btn text to="/inven">
                    작업현황
                </v-btn>
                <v-spacer></v-spacer>
                <template v-if="!me">
                    <v-btn text to="/login">
                        <v-icon>mdi-login</v-icon>
                    </v-btn>
                </template>
                <template v-else>
                    <v-avatar color="indigo">
                        <v-icon dark>
                          mdi-account-circle
                        </v-icon>
                    </v-avatar>
                    <v-btn text @click="onLogOut">
                        로그아웃
                    </v-btn>
                </template>
                <v-btn v-if="!me" text to="/signup">
                    회원가입
                </v-btn>
            </v-toolbar>
        </div>
        <Nuxt />
    </v-app>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    computed : {
        me() {
            return this.$store.state.users.me;
        }
    },
    methods : {
        onLogOut() {
            this.$store.dispatch('users/logOut');
            this.$router.push('/');
        }
    }
}

</script>

<style>
html, body {
    margin: 0;
    padding: 0;
}

.header {
    margin-top: 20px;
    margin-bottom: 20px;
}

</style>