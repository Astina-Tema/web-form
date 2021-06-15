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
    <!-- 表单 -->
    <div class="form-container">
      <!-- 进度条 -->
      <div class="form-progress">
        <van-progress :percentage="progress.current/progress.total*100" stroke-width="8" color="#F25314" track-color="#FCD9CA" :show-pivot="false" />
        <div class="form-progress-content wrap">
          <span class="form-progress-current">{{progress.current}}</span>
          <span class="form-progress-total">/{{progress.total}}</span>
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
          <van-form v-if="progress.current===1">
          <!-- 基本信息 -->
            <div class="form-base wrap">
              <h2 class="base-info-header">基本信息</h2>
                <div class="base-info-avatar">
                  <span class="info-title">照片：(选填)</span>
                  <div class="avatar-uploader">
                    <van-uploader :after-read="afterRead">
                      <div class="uploader-inner">
                        <van-icon name="user-circle-o" color="#e1e1e1" />
                      </div>
                    </van-uploader>
                  </div>
                </div>
                <van-divider :style="{ borderColor: '#E1E1E1' }" />
                <van-cell-group>
                  <van-field
                    v-model="form.id"
                    label="学号："
                    input-align="right"
                    placeholder="请填写"/>
                  <van-field
                    v-model="form.name"
                    label="姓名："
                    input-align="right"
                    placeholder="请填写"/>
                  <van-field
                    readonly
                    clickable
                    :value="form.gender"
                    label="性别："
                    input-align="right"
                    placeholder="请选择"
                    right-icon="arrow-down"
                    @click="chooseGender = true"/>
                  <van-popup v-model="chooseGender" title="选择性别" round position="bottom" safe-area-inset-bottom>
                    <van-picker
                      show-toolbar
                      :columns="genders"
                      @cancel="chooseGender = false"
                      @confirm="confirmGender"
                    />
                  </van-popup>
                </van-cell-group>
            </div>
            <van-divider dashed :style="{ borderColor: '#ccc' }" />
            <!-- 出生日期及户口所在地 -->
            <div class="form-base wrap">
              <h2 class="base-info-header">出生日期及户口所在地</h2>
              <van-divider :style="{ borderColor: 'transparent' }" />
              <van-form>
                <van-cell-group>
                  <van-field
                    v-model="form.age"
                    label="年龄："
                    input-align="right"
                    placeholder="请选择"
                    right-icon="arrow-down"/>
                  <van-field
                    v-model="form.education"
                    label="最高学历："
                    input-align="right"
                    placeholder="请填写"/>
                  <van-field
                    readonly
                    clickable
                    placeholder="请选择"
                    right-icon="arrow-down"
                    @click="chooseBirthday = true"
                    :value="form.birthday"
                    label="出生日期："
                    input-align="right"/>
                  <van-popup v-model="chooseBirthday" title="选择出生日期" :default-index="0" round position="bottom" safe-area-inset-bottom>
                    <van-datetime-picker
                      v-model="birthday.currentDate"
                      type="date"
                      title="选择出生日期"
                      :min-date="birthday.minDate"
                      :max-date="birthday.maxDate"
                      @cancel="chooseBirthday = false"
                      @confirm="confirmBirthday"
                    />
                  </van-popup>
                  <van-field
                    v-model="form.IDNumber"
                    label="身份证号码："
                    input-align="right"
                    placeholder="请填写"/>
                  <van-field
                    v-model="form.residence"
                    label="户口所在地："
                    input-align="right"
                    placeholder="请填写"/>
                </van-cell-group>
              </van-form>
            </div>
            <van-divider dashed :style="{ borderColor: '#ccc' }" />
            <!-- 联系电话及地址 -->
            <div class="form-base wrap">
              <h2 class="base-info-header">联系电话及地址</h2>
              <van-divider :style="{ borderColor: 'transparent' }" />
                <van-cell-group>
                  <van-field
                    v-model="form.tel"
                    label="电话号码："
                    input-align="right"
                    placeholder="请填写"/>
                  <van-field
                    v-model="form.address"
                    label="联系地址："
                    input-align="right"
                    placeholder="请填写"/>
                  <van-field
                    v-model="form.postcode"
                    label="邮编："
                    input-align="right"
                    placeholder="请填写"/>
                </van-cell-group>
            </div>
          </van-form>
        </div>
        <div class="form-part-2">
          <van-form v-if="progress.current===2">
            <!-- 自身情况 -->
            <div class="form-base wrap">
              <h2 class="base-info-header">自身情况</h2>
              <van-divider :style="{ borderColor: 'transparent' }" />
              <h3 class="radio-title">户籍情况：</h3>
              <van-field name="radio" class="no-border">
                <template #input>
                  <van-radio-group v-model="form.residenceSituation" direction="horizontal">
                    <van-radio name="1">
                      城镇
                      <template #icon="props">
                        <span :class="props.checked ? radio.active : radio.inactive" />
                      </template>
                    </van-radio>
                    <van-radio name="2">
                      <template #icon="props">
                        <span :class="props.checked ? radio.active : radio.inactive" />
                      </template>
                      农户
                    </van-radio>
                  </van-radio-group>
                </template>
              </van-field>
              <h3 class="radio-title">家庭病史：</h3>
              <van-field name="radio" class="no-border">
                <template #input>
                  <van-radio-group v-model="form.medicalHistory" direction="horizontal">
                    <van-radio name="1">
                      是
                      <template #icon="props">
                        <span :class="props.checked ? radio.active : radio.inactive" />
                      </template>
                    </van-radio>
                    <van-radio name="2">
                      <template #icon="props">
                        <span :class="props.checked ? radio.active : radio.inactive" />
                      </template>
                      否
                    </van-radio>
                  </van-radio-group>
                </template>
              </van-field>
              <h3 class="radio-title">在岗情况：</h3>
              <van-field name="radio" class="no-border">
                <template #input>
                  <van-radio-group v-model="form.jobSituation" direction="horizontal">
                    <van-radio name="1">
                      是
                      <template #icon="props">
                        <span :class="props.checked ? radio.active : radio.inactive" />
                      </template>
                    </van-radio>
                    <van-radio name="2">
                      <template #icon="props">
                        <span :class="props.checked ? radio.active : radio.inactive" />
                      </template>
                      否
                    </van-radio>
                  </van-radio-group>
                </template>
              </van-field>
              <h3 class="radio-title">是否需要推荐就业：</h3>
              <van-field name="radio" class="no-border">
                <template #input>
                  <van-radio-group v-model="form.needRecommend" direction="horizontal">
                    <van-radio name="1">
                      是
                      <template #icon="props">
                        <span :class="props.checked ? radio.active : radio.inactive" />
                      </template>
                    </van-radio>
                    <van-radio name="2">
                      <template #icon="props">
                        <span :class="props.checked ? radio.active : radio.inactive" />
                      </template>
                      否
                    </van-radio>
                  </van-radio-group>
                </template>
              </van-field>
              <h3 class="radio-title">培训意愿：</h3>
              <van-field name="radio" class="no-border">
                <template #input>
                  <van-radio-group v-model="form.trainWill" direction="horizontal">
                    <van-radio name="1">
                      是
                      <template #icon="props">
                        <span :class="props.checked ? radio.active : radio.inactive" />
                      </template>
                    </van-radio>
                    <van-radio name="2">
                      <template #icon="props">
                        <span :class="props.checked ? radio.active : radio.inactive" />
                      </template>
                      否
                    </van-radio>
                  </van-radio-group>
                </template>
              </van-field>
              <h3 class="radio-title">是否参加过技能培训：</h3>
              <van-field name="radio" class="no-border">
                <template #input>
                  <van-radio-group v-model="form.hadTrain" direction="horizontal">
                    <van-radio name="1">
                      是
                      <template #icon="props">
                        <span :class="props.checked ? radio.active : radio.inactive" />
                      </template>
                    </van-radio>
                    <van-radio name="2">
                      <template #icon="props">
                        <span :class="props.checked ? radio.active : radio.inactive" />
                      </template>
                      否
                    </van-radio>
                  </van-radio-group>
                </template>
              </van-field>
            </div>
            <van-divider dashed :style="{ borderColor: '#ccc' }" />
            <!-- 紧急联系人 -->
            <div class="form-base wrap">
              <div class="base-info-header-add">
                <h2 class="base-info-header">紧急联系人</h2>
                <van-icon size="0.5rem" name="add-o" @click="addEmergentContact" />
              </div>
              <van-divider :style="{ borderColor: 'transparent' }" />
              <div class="emergent-contact" v-for=" (contact, index) in emergentContact" :key="index">
                <h3 class="emergent-contact-title">联系人{{index+1}}</h3>
                <van-cell-group>
                  <van-field
                    v-model="contact.name"
                    label="姓名："
                    input-align="right"
                    placeholder="请填写"/>
                  <van-field
                    v-model="contact.relationship"
                    label="关系："
                    input-align="right"
                    placeholder="请填写"/>
                  <van-field
                    v-model="contact.tel"
                    label="联系电话："
                    input-align="right"
                    placeholder="请选择"/>
                </van-cell-group>
              </div>
            </div>
            <!-- 报名渠道 -->
            <div class="form-base wrap">
              <h2 class="base-info-header">报名渠道</h2>
              <!-- <van-divider :style="{ borderColor: 'transparent' }" /> -->
              <van-field name="radio" class="no-border sign-up-method">
                <template #input>
                  <van-radio-group v-model="form.residenceSituation" direction="horizontal">
                    <van-radio name="1">
                      内部员工
                      <template #icon="props">
                        <span :class="props.checked ? radio.active : radio.inactive" />
                      </template>
                    </van-radio>
                    <van-radio name="2">
                      <template #icon="props">
                        <span :class="props.checked ? radio.active : radio.inactive" />
                      </template>
                      公众号
                    </van-radio>
                    <van-radio name="3">
                      <template #icon="props">
                        <span :class="props.checked ? radio.active : radio.inactive" />
                      </template>
                      招聘
                    </van-radio>
                    <van-radio name="4">
                      <template #icon="props">
                        <span :class="props.checked ? radio.active : radio.inactive" />
                      </template>
                      内部推荐
                    </van-radio>
                    <van-radio name="5">
                      <template #icon="props">
                        <span :class="props.checked ? radio.active : radio.inactive" />
                      </template>
                      其他
                    </van-radio>
                  </van-radio-group>
                </template>
              </van-field>
            </div>
          </van-form>
        </div>
      </div>
    </div>
    <!-- 表单按钮 -->
    <div class="form-button-container">
      <div class="button-container-inner wrap">
        <van-button type="default" plain size="normal">上一步</van-button>
        <van-button type="default" size="normal" color="linear-gradient(270deg, #F12711 0%, #F25314 32%, #F36815 48%, #F48917 72%, #F5AF19 100%)">下一步</van-button>
      </div>
    </div>
  </div> 
</template>

<script>
export default {
  data() {
    return {
      progress: { // 表单进度
        current: 3,
        total: 4,
      },
      radio: { // 单选 class
        active: 'radio-icon-normal radio-icon-active',
        inactive: 'radio-icon-normal',
      },
      chooseGender: false,
      genders: [ // 性别
        {text: '男', value: 0},
        {text: '女', value: 1}
      ],
      chooseBirthday: false,
      birthday: { // 出生日期
        minDate: new Date(2010, 0, 1),
        maxDate: new Date(2025, 10, 1),
        currentDate: new Date(2021, 0, 17),
      },
      emergentContact:[
        {
          name: '',
          relationship: '',
          tel: '',
        }
      ],
      form: { // 表单
        id: '',
        name: '',
        gender: '',
        age: null,
        education: '',
        birthday: '',
        IDNumber: '', // 身份证号
        residence: '', // 户口所在地
        tel: '',
        address: '', // 联系地址
        postcode: '', // 邮编
        residenceSituation: '', // 户籍情况
        medicalHistory: '', // 家庭病史
        jobSituation: '', // 在岗情况
        needRecommend: '', // 是否需要推荐就业
        trainWill: '', // 培训意愿
        hadTrain: '', // 是否参加过技能培训

      }
    }
  },
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    },
    // 选择性别
    confirmGender(gender) {
      console.log(gender);
      this.form.gender = gender.text
      this.chooseGender = false
    },
    // 选择出生日期
    confirmBirthday(data) {
      console.log(data);
      this.chooseBirthday = false
    },
    // 添加紧急联系人
    addEmergentContact() {
      const emergentContact = {
        name: '',
        relationship: '',
        tel: '',
      }
      this.emergentContact.push(emergentContact)
    }
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
  width: 96%;
  margin: 0 auto;
  justify-content: space-between;
}
.info-title {
  font-size: 0.3rem;
  margin-top: 0.76rem;
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
.form-base > .van-divider {
  margin-top: 0.06rem;
}
/* 单选标题 */
.radio-title {
  font-size: 0.3rem;
  line-height: 0.4rem;
  color: #666;
}
/* 单选 - 公共 - 未选中 */
.radio-icon-normal {
  display: inline-block;
  vertical-align: middle;
  width: 0.48rem;
  height: 0.48rem;
  border: 0.02rem solid #D9D9D9;
  border-radius: 0.24rem;
}
/* 单选 - 选中 */
.radio-icon-active {
  border-color: #F25314;
}
.radio-icon-active::after {
  content: '';
  display: block;
  width: 0.32rem;
  height: 0.32rem;
  margin: 0.08rem;
  border-radius: 0.16rem;
  background: #F25314;
}
/* 添加 */
.base-info-header-add {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
.emergent-contact-title {
  font-size: 0.3rem;
  margin-bottom: 0.24rem;
  color: #555;
}

/* 按钮 */
.form-button-container {
  margin-top: 0.3rem;
  background: #fff;
}
.button-container-inner {
  width: 100%;
  height: 1.56rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
