<template>
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/build">Build Planner</router-link></li>
        <li><router-link to="/saved-builds">Saved Builds</router-link></li>  <!-- Add this line -->
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'NavBarComponent'
  }
  </script>
  
  <style scoped>
  nav {
    background: #333;
    color: white;
    padding: 10px;
  }
  ul {
    list-style: none;
    padding: 0;
    display: flex;
    gap: 10px;
  }
  li {
    display: inline;
  }
  a {
    color: white;
    text-decoration: none;
  }
  </style>
  