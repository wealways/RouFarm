<template>
  <v-app id="container">
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    //
  }),
};
</script>
<style scoped>
/* 전체 배경색 조절용 */
#container {
  background-color: #fffaec;
}
</style>
