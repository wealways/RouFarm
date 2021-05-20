<template>
  <div class="container">
    <div class="page1">
      <header>
        <div style="color:#2c5061; font-size:1.5rem;text-algin:center">RouFarm</div>
      </header>
      <main>
        <div class="content__h1">
          <span style="color:#86C5C9">성공하는</span> 사람들을 위한 <br>
          하루하루 <span style="color:#E75B46">습관</span> 만들기 <span style="color:#2c5061">RouFarm</span>
        </div>
        <div class="content__h2">
          작심삼일이 습관이신가요?<br>
          3일마다 마음먹도록 도와드릴게요
        </div>
        <div class="googleBtn">
          <img class="google__img" src="@/assets/googlePlay.png" alt="구글플레이" srcset="">
          <div class="google__desc">
            google 스토어 바로가기
          </div>
        </div>
      </main>
    </div>
    <div class="page">
      1페이지
    </div>
    <!-- 3페이지-->
    <div class="page3" style="background-color: #2c5061">
      <main>
        <div class="content">
          <div class="content__h1" style="color:#fff">습관을 위해</div>
          <div style="display:flex; justify-content: center;">
            <div class="content__h1" style="color:#fff;margin-right:10px">매일 한 컷씩</div>
            <img class="img__qrcode" src="@/assets/qrcode.png" alt="qrcode" srcset="">
          </div>
          <div class="content__h2" style="color:#fff;margin-top:10px;">
            <div>채워지는 잔디와 꾸준함</div>
            <div>지금 시작하세요!</div>
          </div>
          <div class="googleBtn2">
            <img class="google__img2" src="@/assets/googlePlay.png" alt="구글플레이" srcset="">
            <div class="google__desc2">
              google 스토어 바로가기
            </div>
          </div>
        </div>
        <div class="content__img">
          <img class="img__scan" src="@/assets/scan.jpg" alt="" srcset="">
        </div>
      </main>
      <footer>
        <div style="color:#2c5061; font-size:1.2rem; text-align:center; margin-top:10px;">RouFarm</div>
        <hr style="width:300px; margin-top:10px">
        <div class="contact">
          <div class="contact__title">Contact</div>
          <div class="contact__desc">routinefarm@google.com</div>
        </div>
        <div class="copyright">
          <div class="copyright__title">Copyright</div>
          <img src="@/assets/copy.png" alt="copyright" width="10" height="10" style="margin:0 5px">
          <div class="copyright__desc">RouFarm. All rights reserved</div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "Main",
};
</script>

<style scoped>
.container {
  max-width: 100vw;
  width: 100vw;
  height: 300vh;
  padding: 0;
  background-color: #fff;
}
.page{
  width: 100vw;
  height: 100vh;
  padding:0.8rem;
  display: flex;
  flex-direction: column;
}
.page1{
  width: 100vw;
  height: 100vh;
  padding:0.8rem;
  display: flex;
  flex-direction: column;
}
.page1 > header {
  position:absolute;
  width: 100vw;
}

/* page3 */
.page3{
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.page3 > main {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.page3 > main .content{
  margin-top: 100px;
}
.page3 > main .content__img{
  display: flex;
}
.img__qrcode{
  height: 70px;
}
.img__scan{
  height:45vh;
}

.page3 > footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  height:15vh; 
  background-color:#fff; 
}
.page3 > footer > .contact{
  display: flex;
}
.page3 > footer > .contact .contact__title{
  font-weight: 400;
}
.page3 > footer > .contact .contact__desc{
  margin-left: 1rem;
  font-weight: 300;
}
.page3 > footer > .copyright  {
  display: flex;
  align-items: baseline;
}
.page3 > footer > .copyright .copyright__title {
  font-weight: 400;
}
.page3 > footer > .copyright .copyright__desc {
  font-size: 0.5rem;
}


main{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto 0;
  flex: 1;
}
.content__h1 {
  font-size: 48px;
  line-height: 72px;
  font-weight: 700;
  color: rgb(34, 34, 34);
  text-align: center;
}
.content__h2{
  margin-top: 43px;
  font-size: 17px;
  line-height: 26px;
  color: rgb(85, 85, 85);
  text-align: center;
}
.googleBtn{
  cursor: pointer;
  margin-top: 33px;
  width: 328px;
  height: 58px;
  border-radius: 10px;
  background: rgb(246, 246, 246);
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  transition: all 0.5s ease 0s;
}
.googleBtn:hover, .googleBtn:active {
  box-shadow: 0 0 15px rgba(33,33,33,.2); 
}
.google__img{
  width: 24px;
  height: 24px;
}
.google__desc{
  padding-top: 4px;
  margin-left: 16px;
  color: rgb(51, 51, 51);
  font-size: 18px;
  line-height: 21.6px;
  font-weight: 500;
}
.googleBtn2{
  cursor: pointer;
  margin:20px auto;
  width: 288px;
  height: 48px;
  border-radius: 10px;
  background: rgb(246, 246, 246);
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  transition: all 0.5s ease 0s;
}
.googleBtn2:hover, .googleBtn2:active {
  box-shadow: 0 0 15px rgba(248, 248, 248, 0.945); 
}
.google__img2{
  width: 18px;
  height: 18px;
}
.google__desc2{
  padding-top: 2px;
  margin-left: 10px;
  color: rgb(51, 51, 51);
  font-size: 14px;
  line-height: 21.6px;
  font-weight: 500;
}

@media screen and (max-width: 769px) {
  header > div{
    text-align: center;
  }
  .content__h1 {
  font-size: 24px;
  line-height: 42px;
  }
  .content__h2{
    margin-top: 20px;
    font-size: 15px;
    line-height: 23px;
  }
  .googleBtn{
    width: 285px;
    height: 54px;
    margin-top: 30px;
  }
  .googleBtn2{
    width: 225px;
    height: 45px;
    margin-top: 20px;
  }

  /* page3 */
  .img__qrcode{
    height: 50px;
  }
  .img__scan{
    height: 30vh;
  }
}
</style>