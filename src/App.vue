<template>
  <div id="app">
    <!-- 头部 -->
    <div class="app-title">
      <div class="app-title-logo">
        <van-image
          width="0.84rem"
          height="1.04rem"
          fit="contain"
          src="https://img1.baidu.com/it/u=379226345,3276899612&fm=26&fmt=auto&gp=0.jpg"
        />
      </div>
      <h1 class="app-title-text">· 缔造中国专业的养老护理服务 ·</h1>
    </div>
    
    <div class="form-content">
      <van-progress :percentage="50" stroke-width="8" color="#F25314" track-color="#FCD9CA" :show-pivot="false" />
    </div>
  </div>
</template>

<script>
import {
  Image as VanImage,
  Progress as VanProgress,

} from 'vant';
export default {
  data() {

  },
  methods: {

  },
  components: {
    VanImage, VanProgress
  }
}
</script>

<style>
#app {
  background: #F2F2F2;
}
.app-title {
  height: 2.8rem;
  background: url('https://img0.baidu.com/it/u=2022506399,1365193603&fm=26&fmt=auto&gp=0.jpg') no-repeat;
  background-size: cover;
  background-position: center;
  overflow: hidden;
}
.app-title-logo {
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 0.54rem;
}
.app-title-text {
  font-size: 0.38rem;;
  text-align: center;
  color: #F25314;
}
.form-content {
  margin-top: 0.3rem;
  overflow: hidden;
  background: #fff;
}
</style>
