<template>
  <div id="wrap">
    <!-- 콤보 정보(header) -->
    <div id="comb" v-html="headerContent"></div>
    <!-- 캘린더 컴포넌트가 들어갈 부분 -->
    <Calendar />
    <!-- 가입 일자 정보 나올 부분 -->
    <div id="signupdate" v-html="usingDate"></div>
  </div>
</template>

<script>
// axios 직접 쓰면 어떨까
import axios from "axios";
import Calendar from "@/components/Calendar";

export default {
  name: "Share",
  components: {
    Calendar,
  },
  created() {
    // this.headerContent = this.apiTest2(this.$route.path);
    console.log(this.headerContent);
  },
  mounted() {
    // this.apiTest2(this.$route.path);
  },
  computed() {},
  data() {
    return {
      // 전체 응답 데이터
      response: {},
      // 콤보 정보 데이터 기본 틀
      headerContent: `RouFarm님은 <br>00일 연속으로 <br>루틴을 지켰어요!`,
      // 가입날짜 정보
      usingDate: `User님이 RouFarm과 <br>함께 한지 00일 째👏`,
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
        // 반환
        return response.data;
      } catch (e) {
        console.error(e);
        console.log("here");
      }
    },
  },
};
</script>

<style scoped>
/* 메인 화면 */
#wrap {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: bisque;
  text-align: center;
}
/* 연속 정보 */
#comb {
  background-color: aqua;
}
/* 캘린더 */
/* 가입일자 */
#signupdate {
  background-color: blue;
}
</style>