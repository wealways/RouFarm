<template>
  <div id="wrap">
    <div class="container">
      <!-- 콤보 정보(header) -->
      <div id="comb">
        {{ user }}님은 <br /><span>{{ comb }}일</span><br />
        연속으로 루틴을 지켰어요!💪
      </div>
      <!-- 캘린더 컴포넌트가 들어갈 부분 -->
      <div>
        <Calendar :grassInfo="dateInfo" />
        <!-- 범례 부분 -->
        <div class="legend">
          <!-- 100% -->
          <!-- % 사용 위해 width 주기 -->
          <div class="child">
            <div class="color color100"></div>
            <div class="legend-font">100% 완료</div>
          </div>
          <div class="child">
            <div class="color color50"></div>
            <div class="legend-font">50% 이상</div>
          </div>
          <div class="child">
            <div class="color color01"></div>
            <div class="legend-font">1~50%</div>
          </div>
          <div class="child">
            <div class="color color00"></div>
            <div class="legend-font">완료X</div>
          </div>
          <div class="child">
            <div class="color color-non"></div>
            <div class="legend-font">루틴생성X</div>
          </div>
        </div>
      </div>
      <!-- 가입 일자 정보 나올 부분 -->
      <div id="signupdate">
        {{ user }}님이 함께 한지 <br /><span>{{ duringDay }}</span
        >일 째👏
      </div>
      <v-btn class="main-btn" small @click="moveToMain()"> 구경하기 📑</v-btn>
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
        let url = "api/profileWeb";
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
        console.log(this.dateInfo, "dateInfo");
      } catch (e) {
        console.error(e);
        // console.log("get error");
      }
    },
    moveToMain() {
      // this.$router.push({ path: "/" });
      this.$router.push({ name: "Main" });
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
  min-height: 100vh;
}
/* 연속 정보 */
#comb {
  margin: 1%;
  padding: 1%;
  font-size: 120%;
}
/* 강조할 내용 */
span {
  font-size: 120%;
  font-weight: 800;
  color: #2c5061;
}
/* 캘린더 */
.legend {
  max-height: 3vh;
  margin: 2% 10% 0 10%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
.child {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
/* 범례 사이즈 */
.color {
  width: 25%;
  padding-bottom: 25%;
}
/* 100% */
.color100 {
  background-color: #216e39;
}
/* 50% */
.color50 {
  background-color: #ced730;
}
/* 0% 이상 */
.color01 {
  background-color: #e1e5a6;
}
/* 0 */
.color00 {
  background-color: #d4003d;
}
/* 루틴설정X */
.color-non {
  background-color: #e2e0d8;
}
/* 범례 설명 */
.legend-font {
  font-size: 100%;
  font-weight: 200;
  margin-left: 3%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
/* 가입일자 */
#signupdate {
  margin-top: 2%;
  padding-top: 2%;
  font-size: 120%;
}
/* 메인 이동 버튼 */
.main-btn {
  display: flex;
  width: 20%;
  align-self: flex-end;
  font-size: 75%;
  background-color: #ffc111 !important;
}
.main-btn:hover {
  color: #fff;
  background-color: #2c5061 !important;
}
/* 핸드폰 사이즈 */
@media screen and (max-width: 400px) {
  #comb {
    margin: 1%;
    padding: 1%;
    font-size: 80%;
  }
  #signupdate {
    margin: 2%;
    padding: 1%;
    font-size: 80%;
  }
  /* 범례 설명 */
  .legend-font {
    font-size: 50%;
  }
  .main-btn {
    display: flex;
    width: 20%;
    align-self: flex-end;
    font-size: 40%;
  }
}
</style>