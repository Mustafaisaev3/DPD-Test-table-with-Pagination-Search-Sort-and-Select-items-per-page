<template>
  <MainLayout>
    <router-view/>
  </MainLayout>
</template>

<script setup>
import MainLayout from './layouts/MainLayout.vue';
import './assets/main.css'
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0%;
  box-sizing: border-box;
}

#app {
  font-family: MyriadPro, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

ul {
  list-style: none;
}

a {
  text-decoration: none;
  color: inherit;
}

.card {
  width: 100%;
  height: auto;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.07);
  border: solid 1px #eeeff1;
}
</style>
