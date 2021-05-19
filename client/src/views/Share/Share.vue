<template>
  <v-main>
    <div id="wrap">
      <!-- 콤보 정보(header) -->
      <div id="comb">
        {{ user }}님은 <br />{{ comb }}일 연속으로 <br />루틴을 지켰어요!💪
      </div>
      <!-- 캘린더 컴포넌트가 들어갈 부분 -->
      <Calendar />
      <!-- 가입 일자 정보 나올 부분 -->
      <div id="signupdate">
        {{ user }}님이 RouFarm과 <br />함께 한지 {{ duringDay }}일 째👏
      </div>
    </div>
  </v-main>
</template>

<script>
// axios 직접 쓰면 어떨까
import axios from "axios";
import Calendar from "@/components/Calendar";
// 경과날짜 계산기
import { calcDuringDay } from "@/modules/calc.js";

export default {
  name: "Share",
  components: {
    Calendar,
  },
  created() {
    this.getInfo(this.$route.path);
  },
  mounted() {
    // this.apiTest2(this.$route.path);
  },
  data() {
    return {
      // 전체 응답 데이터
      response: {},
      // userNicname
      user: "User",
      // 콤보 정보
      comb: "00",
      // 가입날짜 정보
      duringDay: `00`,
    };
  },
  methods: {
    // 직접 요청
    async getInfo(user_id) {
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
        // 1. 닉네임 변환
        this.user = response.data.profile.nickname;
        // 2. 콤보 정보 변환
        this.comb = response.data.profile.combo;
        // 3. 가입일자 정보 반환
        this.duringDay = calcDuringDay(response.data.profile.signindate);
      } catch (e) {
        console.error(e);
        console.log("get error");
      }
    },
  },
};
</script>

<style scoped>
/* 메인 화면 */
#wrap {
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  background-color: #fffaec;
  text-align: center;
  justify-self: center;
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