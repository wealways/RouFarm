<template>
  <div id="wrap">
    <div class="container">
      <!-- 콤보 정보(header) -->
      <div id="comb">
        {{ user }}님은 <br /><span>{{ comb }}일</span><br />
        연속으로 루틴을 지켰어요!💪
      </div>
      <!-- 캘린더 컴포넌트가 들어갈 부분 -->
      <Calendar />
      <!-- 가입 일자 정보 나올 부분 -->
      <div id="signupdate">
        {{ user }}님이 함께 한지 <br /><span>{{ duringDay }}</span
        >일 째👏
      </div>
    </div>
  </div>
</template>

<script>
// axios 직접 쓰면 어떨까
import axios from "axios";
import Calendar from "@/components/Calendar";
// 경과날짜 계산기, 잔디 계산기
import { calcDuringDay, manipulateMonthInfo } from "@/modules/calc.js";

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
      // 잔디정보
      dateInfo: {
        title: "May 2021",
        today: "2021-05-21",
        info: {
          "2021-05-01": ["#216e39"], // 100
          "2021-05-02": ["#30a14e"], // ~50
          "2021-05-03": ["#9be9a8"], // ~0
          "2021-05-04": ["#ff0101"], // 0
          "2021-05-05": ["#ebedf0"], // -1(없을 때)
        },
      },
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
        // 4. 잔디 정보 형태변화
        this.dateInfo = manipulateMonthInfo(response.data.Month);
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
}
/* 컨테이너 */
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  text-align: center;
  max-height: 100vh;
  max-width: 100vw;
}
/* 연속 정보 */
#comb {
  margin: 2%;
  padding: 2%;
  font-size: 80%;
}
/* 강조할 내용 */
span {
  font-size: 120%;
  font-weight: 800;
  color: #2c5061;
}
/* 캘린더 */
/* 가입일자 */
#signupdate {
  margin: 2%;
  padding: 2%;
  font-size: 80%;
}
</style>