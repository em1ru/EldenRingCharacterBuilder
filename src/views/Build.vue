<template>
    <div>
      <h1>Create Your Build</h1>
      <BuildForm />
    </div>
  </template>
  
  <script>
  import BuildForm from '../components/BuildForm.vue';
  
  export default {
    name: 'BuildView',
    components: {
      BuildForm
    }
  }
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  