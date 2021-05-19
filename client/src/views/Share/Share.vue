<template>
  <div>
    test
    <div>{{ test }}</div>
    <div>{{ $route.path }}</div>
  </div>
</template>

<script>
// axios 직접 쓰면 어떨까
import axios from "axios";

export default {
  name: "Share",
  components: {},
  created() {
    this.apiTest2(this.$route.path);
  },
  mounted() {
    // this.apiTest2(this.$route.path);
  },
  data() {
    return {
      test: [],
      test2: [],
    };
  },
  methods: {
    // api 요청

    // 직접 요청
    async apiTest2(user_id) {
      try {
        let url = "api/profileWeb/";
        let options = {
          method: "GET",
          url: url + `${user_id}`,
        };
        console.log(options, "옵션 here");
        let response = await axios(options);
        // 테스트용 조회
        console.log("response - get(user/)");
        console.log(response);
        // data에 바인딩
        this.test.push(response.data);
      } catch (e) {
        console.error(e);
        console.log("here");
      }
    },
  },
};
</script>

<style>
</style>