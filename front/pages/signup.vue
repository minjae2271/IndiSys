<template>
    <v-container>
      <SignupForm></SignupForm>
    </v-container>
  </template>
  
  <script>
  import SignupForm from '~/components/SignupForm.vue'
  
  export default {
      components : {
        SignupForm,
      },
      data() {
          return {
  
          }
      },
      middleware: 'anonymous',
  }
  </script>
  
  <style>
  
  </style>