<template>
    <v-container>
        <h1>{{ error.statusCode}}</h1>
        <p>{{ error.errorMessage}}</p>
    </v-container>
</template>

<script>
export default {
    props: ['error'],
    layout: 'errorLayout'
}
</script>

<style>

</style>