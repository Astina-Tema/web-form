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
    <!-- 表格 -->
    <div class="form-container">
      <!-- 进度条 -->
      <div class="form-progress">
        <van-progress :percentage="25" stroke-width="8" color="#F25314" track-color="#FCD9CA" :show-pivot="false" />
        <div class="form-progress-content wrap">
          <span class="form-progress-current">1</span>
          <span class="form-progress-total">/4</span>
        </div>
      </div>
      <!-- 表单体 -->
      <div class="form-content">
        <!-- 标题 -->
        <div class="form-content-title wrap">
          <h2 class="form-title-name">学员入学登记表</h2>
          <p class="form-title-tip">以下内容请填写个人的真实信息！</p>
        </div>
        <van-divider dashed :style="{ borderColor: '#ccc' }" />
        <!-- 表单内容 -->
        <div class="form-part-1">
          <div class="form-base-info wrap">
            <h2 class="base-info-header">基本信息</h2>
            <van-form>
              <div class="base-info-avatar">
                <span class="info-title">照片：(选填)</span>
                <div class="avatar-uploader">
                  <van-uploader :after-read="afterRead">
                    <div class="uploader-inner">
                      <van-icon name="user-circle-o" color="#fff" />
                    </div>
                  </van-uploader>
                </div>
              </div>
            </van-form>
            <van-divider :style="{ borderColor: '##E1E1E1' }" />
          </div>
        </div>
      </div>
    </div>
  </div> 
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    },
  },
}
</script>

<style>
#app {
  background: #F2F2F2;
}
/* 头部 */
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
/* 表单体 */
.form-container {
  margin-top: 0.3rem;
  overflow: hidden;
  background: #fff;
}
/* 进度条 */
.form-progress-content {
  color: #F25314;
  letter-spacing: 6px;
  line-height: 0.5rem;
}
.form-progress-current {
  font-size: 0.56rem;
  font-weight: 600;
}
.form-progress-total {
  font-size: 0.38rem;
}
/* 表单标题 */
.form-content-title {
  height: auto;
}
.form-title-name {
  font-size: 0.34rem;
  line-height: 0.7rem;
  font-weight: bold;
}
.form-title-tip {
  font-size: 0.26rem;
  color: #FDA988;
  line-height: 0.36rem;
}
/* 表单内容 */
.base-info-header {
  font-size: 0.32rem;
  color: #F25314;
  font-weight: bold;
}
.base-info-avatar {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
.info-title {
  font-size: 0.3rem;
  line-height: 1.1rem;
  /* vertical-align: middle; */
  color: #777;
}
.avatar-uploader {
  width: 1.1rem;
  height: 1.1rem;
  border-radius: 0.1rem;
  overflow: hidden;
  background: url('https://img01.yzcdn.cn/vant/cat.jpeg') no-repeat;
  background-position: center;
  background-size: cover;
  text-align: center;
  font-size: 0.5rem;
  line-height: 1.1rem;
}
.form-base-info > .van-divider {
  margin-top: 0.06rem;
}
</style>
