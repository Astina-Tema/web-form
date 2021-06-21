<template>
  <div id="app">
    <!-- 头部 -->
    <div class="app-title"></div>
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
        <van-form ref="form">
          <div v-if="progress.current === 1">
          <!-- 基本信息 -->
            <div class="form-base wrap">
              <h2 class="base-info-header">基本信息</h2>
                <!-- <div class="base-info-avatar">
                  <van-field name="uploader" label="照片：(选填)" class="no-border" input-align="right">
                    <template #input>
                      <van-uploader capture="camera" :after-read="afterRead" :max-count="1" v-model="fileList"  preview-size="1.1rem">
                        <div class="avatar-uploader">
                          <van-image fit="contain" :src="avatar" />
                        </div>
                      </van-uploader>
                    </template>
                  </van-field>
                </div> -->
                <van-divider :style="{ borderColor: 'transparent' }" />
                <van-cell-group>
                  <!-- <van-field
                    v-model="form.id"
                    label="学号："
                    input-align="right"
                    placeholder="请填写"
                    error-message-align="right"
                    :rules="rules.id"/> -->
                  <van-field
                    required
                    v-model="form.CompanyName"
                    label="姓名："
                    input-align="right"
                    placeholder="请填写"
                    error-message-align="right"
                    :rules="rules.name"/>
                  <van-field
                    required
                    readonly
                    clickable
                    :value="pickerText.gender"
                    label="性别："
                    input-align="right"
                    placeholder="请选择"
                    right-icon="arrow-down"
                    @click="chooseGender = true"
                    error-message-align="right"
                    :rules="rules.gender"/>
                  <van-popup v-model="chooseGender" round position="bottom" safe-area-inset-bottom>
                    <van-picker
                      title="选择性别"
                      show-toolbar
                      :columns="genders"
                      @cancel="chooseGender = false"
                      @confirm="confirmGender"
                    />
                  </van-popup>
                  <van-field
                    required
                    readonly
                    clickable
                    :value="pickerText.nation"
                    label="民族："
                    input-align="right"
                    placeholder="请选择"
                    right-icon="arrow-down"
                    @click="chooseNation = true"
                    error-message-align="right"
                    :rules="rules.nation"/>
                  <van-popup v-model="chooseNation" round position="bottom" safe-area-inset-bottom>
                    <van-picker
                      title="选择民族"
                      show-toolbar
                      :columns="nations"
                      @cancel="chooseNation = false"
                      @confirm="confirmNation"
                    />
                  </van-popup>
                </van-cell-group>
            </div>
            <van-divider dashed :style="{ borderColor: '#ccc' }" />
            <!-- 出生日期及户口所在地 -->
            <div class="form-base wrap">
              <h2 class="base-info-header">出生日期及户口所在地</h2>
              <van-divider :style="{ borderColor: 'transparent' }" />
              <van-cell-group>
                <van-field
                  required
                  v-model="form.age"
                  label="年龄："
                  input-align="right"
                  type="digit"
                  placeholder="请填写"
                  error-message-align="right"
                  :rules="rules.age"/>
                <van-field
                  required
                  v-model="form.HighestEducation"
                  label="最高学历："
                  input-align="right"
                  placeholder="请填写"
                  error-message-align="right"
                  :rules="rules.education"/>
                <van-field
                  required
                  readonly
                  clickable
                  placeholder="请选择"
                  right-icon="arrow-down"
                  @click="chooseBirthday = true"
                  :value="form.ContactBirthday"
                  label="出生日期："
                  input-align="right"
                  error-message-align="right"
                  :rules="rules.birthday"/>
                <van-popup v-model="chooseBirthday" title="选择出生日期" :default-index="0" round position="bottom" safe-area-inset-bottom>
                  <van-datetime-picker
                    v-model="date.currentDate"
                    type="date"
                    title="选择出生日期"
                    :min-date="date.minDate"
                    :max-date="date.maxDate"
                    @cancel="chooseBirthday = false"
                    @confirm="confirmBirthday"
                  />
                </van-popup>
                <van-field
                  required
                  v-model="form.GovernmentIDNumber"
                  label="身份证号码："
                  input-align="right"
                  placeholder="请填写"
                  error-message-align="right"
                  :rules="rules.IDNumber"/>
                <van-field
                  required
                  v-model="form.RegisteredPermanentAddressLocus"
                  label="户口所在地："
                  input-align="right"
                  placeholder="请填写"
                  error-message-align="right"
                  :rules="rules.residence"/>
              </van-cell-group>
            </div>
            <van-divider dashed :style="{ borderColor: '#ccc' }" />
            <!-- 联系电话及地址 -->
            <div class="form-base wrap">
              <h2 class="base-info-header">联系电话及地址</h2>
              <van-divider :style="{ borderColor: 'transparent' }" />
                <van-cell-group>
                  <van-field
                    required
                    v-model="form.Mobile"
                    label="电话号码："
                    input-align="right"
                    type="digit"
                    placeholder="请填写"
                    error-message-align="right"
                    :rules="rules.tel"/>
                  <van-field
                    required
                    v-model="form.ContactAddress"
                    label="联系地址："
                    input-align="right"
                    placeholder="请填写"
                    error-message-align="right"
                    :rules="rules.address"/>
                  <van-field
                    v-model="form.PostCode"
                    label="邮编:（选填）"
                    input-align="right"
                    placeholder="请填写"
                    type="digit"
                    error-message-align="right"
                    :rules="rules.postcode"/>
                </van-cell-group>
            </div>
          </div>
          <div v-if="progress.current === 2">
            <!-- 自身情况 -->
            <div class="form-base wrap">
              <h2 class="base-info-header">自身情况</h2>
              <van-divider :style="{ borderColor: 'transparent' }" />
              <h3 class="radio-title require">户籍情况：</h3>
              <van-field name="radio" class="no-border" :rules="rules.residenceSituation">
                <template #input>
                  <van-radio-group v-model="form.ResidenceType" direction="horizontal">
                    <van-radio name="城镇">
                      城镇
                      <template #icon="props">
                        <span :class="props.checked ? radio.active : radio.inactive" />
                      </template>
                    </van-radio>
                    <van-radio name="农户">
                      <template #icon="props">
                        <span :class="props.checked ? radio.active : radio.inactive" />
                      </template>
                      农户
                    </van-radio>
                  </van-radio-group>
                </template>
              </van-field>
              <h3 class="radio-title require">家庭病史：</h3>
              <van-field name="radio" class="no-border" :rules="rules.medicalHistory">
                <template #input>
                  <van-radio-group v-model="form.MedicalHistory" direction="horizontal">
                    <van-radio name="是">
                      是
                      <template #icon="props">
                        <span :class="props.checked ? radio.active : radio.inactive" />
                      </template>
                    </van-radio>
                    <van-radio name="否">
                      <template #icon="props">
                        <span :class="props.checked ? radio.active : radio.inactive" />
                      </template>
                      否
                    </van-radio>
                  </van-radio-group>
                </template>
              </van-field>
              <h3 class="radio-title require">在岗情况：</h3>
              <van-field name="radio" class="no-border" :rules="rules.jobSituation">
                <template #input>
                  <van-radio-group v-model="form.OnTheJob" direction="horizontal">
                    <van-radio name="是">
                      是
                      <template #icon="props">
                        <span :class="props.checked ? radio.active : radio.inactive" />
                      </template>
                    </van-radio>
                    <van-radio name="否">
                      <template #icon="props">
                        <span :class="props.checked ? radio.active : radio.inactive" />
                      </template>
                      否
                    </van-radio>
                  </van-radio-group>
                </template>
              </van-field>
              <h3 class="radio-title require">是否需要推荐就业：</h3>
              <van-field name="radio" class="no-border" :rules="rules.needRecommend">
                <template #input>
                  <van-radio-group v-model="form.RecommendEmployment" direction="horizontal">
                    <van-radio name="是">
                      是
                      <template #icon="props">
                        <span :class="props.checked ? radio.active : radio.inactive" />
                      </template>
                    </van-radio>
                    <van-radio name="否">
                      <template #icon="props">
                        <span :class="props.checked ? radio.active : radio.inactive" />
                      </template>
                      否
                    </van-radio>
                  </van-radio-group>
                </template>
              </van-field>
              <h3 class="radio-title require">培训意愿：</h3>
              <van-field name="radio" class="no-border" :rules="rules.trainWill">
                <template #input>
                  <van-radio-group v-model="form.Trianning" direction="horizontal">
                    <van-radio name="是">
                      是
                      <template #icon="props">
                        <span :class="props.checked ? radio.active : radio.inactive" />
                      </template>
                    </van-radio>
                    <van-radio name="否">
                      <template #icon="props">
                        <span :class="props.checked ? radio.active : radio.inactive" />
                      </template>
                      否
                    </van-radio>
                  </van-radio-group>
                </template>
              </van-field>
              <h3 class="radio-title require">是否参加过技能培训：</h3>
              <van-field name="radio" class="no-border" :rules="rules.hadTrain">
                <template #input>
                  <van-radio-group v-model="form.ParticipatedSkillsTraining" direction="horizontal">
                    <van-radio name="是">
                      是
                      <template #icon="props">
                        <span :class="props.checked ? radio.active : radio.inactive" />
                      </template>
                    </van-radio>
                    <van-radio name="否">
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
                <van-icon size="0.5rem" name="add-o" @click="addEmergentContact" v-if="emergentContact.length<2" />
              </div>
              <van-divider :style="{ borderColor: 'transparent' }" />
              <div class="emergent-contact" v-for=" (contact, index) in emergentContact" :key="index">
                <h3 class="emergent-contact-title">
                  联系人{{index+1}}
                  <van-icon v-if="index!==0" name="cross" @click="removeContact(index)" />
                </h3>
                <van-cell-group>
                  <van-field
                    required
                    v-model="contact.CompanyName"
                    label="姓名："
                    input-align="right"
                    placeholder="请填写"
                    error-message-align="right"
                    :rules="rules.emergentContact.name"/>
                  <van-field
                    required
                    v-model="contact.RelationShip"
                    label="关系："
                    input-align="right"
                    placeholder="请填写"
                    error-message-align="right"
                    :rules="rules.emergentContact.relationship"/>
                  <van-field
                    required
                    v-model="contact.Mobile"
                    label="联系电话："
                    type="digit"
                    input-align="right"
                    placeholder="请填写"
                    error-message-align="right"
                    :rules="rules.emergentContact.tel"/>
                </van-cell-group>
                <van-divider dashed :style="{ borderColor: '#ccc' }" />
              </div>
            </div>
            <!-- 报名渠道 -->
            <div class="form-base wrap">
              <h2 class="base-info-header title-require">报名渠道</h2>
              <!-- <van-divider :style="{ borderColor: 'transparent' }" /> -->
              <van-field name="radio" class="no-border sign-up-method" :rules="rules.signUpMethod">
                <template #input>
                  <van-radio-group v-model="form.RegistrationChannel" direction="horizontal">
                    <van-radio name="内部员工">
                      内部员工
                      <template #icon="props">
                        <span :class="props.checked ? radio.active : radio.inactive" />
                      </template>
                    </van-radio>
                    <van-radio name="公众号">
                      <template #icon="props">
                        <span :class="props.checked ? radio.active : radio.inactive" />
                      </template>
                      公众号
                    </van-radio>
                    <van-radio name="招聘">
                      <template #icon="props">
                        <span :class="props.checked ? radio.active : radio.inactive" />
                      </template>
                      招聘
                    </van-radio>
                    <van-radio name="内部推荐">
                      <template #icon="props">
                        <span :class="props.checked ? radio.active : radio.inactive" />
                      </template>
                      内部推荐
                    </van-radio>
                    <van-radio name="其他">
                      <template #icon="props">
                        <span :class="props.checked ? radio.active : radio.inactive" />
                      </template>
                      其他
                    </van-radio>
                  </van-radio-group>
                </template>
              </van-field>
            </div>
          </div>
          <div v-if="progress.current === 3">
            <!-- 教育经历 -->
            <div class="form-base wrap">
              <div class="base-info-header-add">
                <h2 class="base-info-header">教育经历</h2>
                <van-icon size="0.5rem" name="add-o" @click="addEducationExprience" v-if="educationExprience.length<3" />
              </div>
              <van-divider :style="{ borderColor: 'transparent' }" />
              <div class="emergent-contact" v-for=" (education, index) in educationExprience" :key="index">
                <h3 class="emergent-contact-title">
                  教育经历{{index+1}}
                  <van-icon v-if="index!==0" name="cross" @click="removeEducation(index)" />
                </h3>
                <van-cell-group>
                  <van-field
                    readonly
                    clickable
                    :value="education.showDate"
                    label="时间：(选填)"
                    input-align="right"
                    placeholder="请选择"
                    right-icon="arrow-down"
                    @click="chooseEducationDateStart(index)"/>
                    <!-- <van-calendar
                      v-model="education.isShowDate"
                      @confirm="confirmEducationDate($event,index)"
                      type="range"
                      color="#ED5D18"
                      :default-date="[new Date(2000,1,1)]"
                      :min-date="date.minDate"
                      :max-date="date.maxDate"
                    /> -->
                  <van-popup v-model="education.isShowDateStart" round position="bottom" safe-area-inset-bottom>
                    <van-datetime-picker
                      v-model="date.currentDate"
                      type="date"
                      title="选择起始年月日"
                      :min-date="date.minDate"
                      :max-date="date.maxDate"
                      @cancel="closeEducationDateStart(index)"
                      @confirm="confirmEducationDateStart($event,index)"
                    />
                  </van-popup>
                  <van-popup v-model="education.isShowDateEnd" round position="bottom" safe-area-inset-bottom>
                    <van-datetime-picker
                      v-model="date.currentDate"
                      type="date"
                      title="选择结束年月日"
                      :min-date="date.minDate"
                      :max-date="date.maxDate"
                      @cancel="closeEducationDateEnd(index)"
                      @confirm="confirmEducationDateEnd($event,index)"
                    />
                  </van-popup>
                  <van-field
                    v-model="education.SchoolName"
                    label="学校全称：(选填)"
                    input-align="right"
                    placeholder="请填写"
                  />
                  <van-field
                    required
                    readonly
                    clickable
                    :value="education.showSchoolType"
                    label="学历："
                    input-align="right"
                    placeholder="请选择"
                    error-message-align="right"
                    :rules="rules.educationExprience.education"
                    right-icon="arrow-down"
                    @click="chooseSchoolType(index)"
                  />
                  <van-popup v-model="education.isShowSchoolType" round position="bottom" safe-area-inset-bottom>
                    <van-picker
                      title="选择学历"
                      show-toolbar
                      :columns="schoolType"
                      @cancel="cancelSchoolType(index)"
                      @confirm="confirmSchoolType($event,index)"
                    />
                    </van-popup>
                  <van-field
                    v-model="education.Major"
                    label="专业：(选填)"
                    input-align="right"
                    placeholder="请填写"
                    error-message-align="right"
                  />
                </van-cell-group>
                <van-divider dashed :style="{ borderColor: '#ccc' }" />
              </div>
            </div>
            <!-- 工作经历 -->
            <div class="form-base wrap">
              <div class="base-info-header-add">
                <h2 class="base-info-header">工作经历</h2>
                <van-icon size="0.5rem" name="add-o" @click="addJobExprience" v-if="jobExprience.length<3" />
              </div>
              <van-divider :style="{ borderColor: 'transparent' }" />
              <div class="emergent-contact" v-for=" (job, index) in jobExprience" :key="index">
                <h3 class="emergent-contact-title">
                  工作经历{{index+1}}
                  <van-icon v-if="index!==0" name="cross" @click="removeJobExprience(index)" />
                </h3>
                <van-cell-group>
                  <van-field
                    readonly
                    clickable
                    :value="job.showDate"
                    label="时间：(选填)"
                    input-align="right"
                    placeholder="请选择"
                    right-icon="arrow-down"
                    @click="chooseJobDateStart(index)"
                  />
                    <!-- <van-calendar
                      v-model="job.isShowDate"
                      @confirm="confirmJobDate($event,index)"
                      type="range"
                      color="#ED5D18"
                      :default-date="[new Date(2000,1,1)]"
                      :min-date="date.minDate"
                      :max-date="date.maxDate"
                    /> -->

                  <!-- <van-popup v-model="job.isShow" round position="bottom" safe-area-inset-bottom>
                    <van-datetime-picker
                      v-model="date.currentDate"
                      type="date"
                      title="选择年月日"
                      :min-date="date.minDate"
                      :max-date="date.maxDate"
                      @cancel="closeJobDate(index)"
                      @confirm="confirmJobDate($event,index)"/>
                  </van-popup> -->
                  <van-popup v-model="job.isShowDateStart" round position="bottom" safe-area-inset-bottom>
                    <van-datetime-picker
                      v-model="date.currentDate"
                      type="date"
                      title="选择起始年月日"
                      :min-date="date.minDate"
                      :max-date="date.maxDate"
                      @cancel="closeJobDateStart(index)"
                      @confirm="confirmJobDateStart($event,index)"
                    />
                  </van-popup>
                  <van-popup v-model="job.isShowDateEnd" round position="bottom" safe-area-inset-bottom>
                    <van-datetime-picker
                      v-model="date.currentDate"
                      type="date"
                      title="选择结束年月日"
                      :min-date="date.minDate"
                      :max-date="date.maxDate"
                      @cancel="closeJobDateEnd(index)"
                      @confirm="confirmJobDateEnd($event,index)"
                    />
                  </van-popup>
                  <van-field
                    v-model="job.Company"
                    label="工作单位：(选填)"
                    input-align="right"
                    placeholder="请填写"
                    error-message-align="right"/>
                  <van-field
                    required
                    v-model="job.WorkingTypeName"
                    label="职位："
                    input-align="right"
                    placeholder="请填写"
                    error-message-align="right"
                    :rules="rules.jobExprience.position"
                  />
                  <van-field
                    v-model="job.Reason"
                    label="离职原因：(选填)"
                    input-align="right"
                    placeholder="请填写"
                    error-message-align="right"
                  />
                </van-cell-group>
                <van-divider dashed :style="{ borderColor: '#ccc' }" />
              </div>
            </div>
          </div>
          <div v-if="progress.current === 4">
            <div class="form-base wrap">
              <h2 class="base-info-header title-require">个人技能<span class="base-info-header-desc">（如护工、月嫂……）</span></h2>
              <van-divider :style="{ borderColor: 'transparent' }" />
              <van-field
                class="text-area-bg no-border"
                v-model="form.PersonalSkills"
                type="textarea"
                placeholder="请填写……"
                show-word-limit
                error-message-align="right"
                :rules="rules.skills"/>
              <h2 class="base-info-header title-require">特长<span class="base-info-header-desc">（如做饭、唱歌、跳舞......）</span></h2>
              <van-divider :style="{ borderColor: 'transparent' }" />
              <van-field
                class="text-area-bg no-border"
                v-model="form.Specialty"
                type="textarea"
                placeholder="请填写……"
                show-word-limit
                error-message-align="right"
                :rules="rules.specialty"/>
              <h2 class="base-info-header title-require">个人描述<span class="base-info-header-desc">（如干活麻利、有耐心......</span></h2>
              <van-divider :style="{ borderColor: 'transparent' }" />
              <van-field
                class="text-area-bg no-border"
                v-model="form.PersonalDescription"
                type="textarea"
                placeholder="请填写……"
                show-word-limit
                error-message-align="right"
                :rules="rules.selfDescription"/>
            </div>
          </div>
        </van-form>
      </div>
    </div>
    <!-- 签字提示 -->
    <div class="signature-tip wrap" v-if="progress.current===4">
      本人承诺：以上所填内容及提供的个人资料真实、可靠，如有虚假信息，本人愿意对此承担全部责任！
    </div>
    <!-- 签字处 -->
    <div class="signature-container" v-if="progress.current===4">
      <div class="wrap">
        <h2 class="base-info-header title-require">本人签字</h2>
        <div class="signature-place">
          <span class="reset-signature" @click="resetSignature">清除文字</span>
          <div class="signature-place-inner">
            <vue-esign ref="esign" :isCrop="true" :width="700" :height="520" />
          </div>
        </div>
      </div>
    </div>
    <!-- 表单按钮 -->
    <div class="form-button-container">
      <div class="button-container-inner wrap">
        <van-button type="default" plain size="normal" @click="lastPage" :disabled="progress.current <= 1">上一步</van-button>
        <van-button type="default" size="normal" color="linear-gradient(270deg, #F12711 0%, #F25314 32%, #F36815 48%, #F48917 72%, #F5AF19 100%)" @click="nextPage" v-if="progress.current < 4">下一步</van-button>
        <van-button type="default" size="normal" color="linear-gradient(270deg, #F12711 0%, #F25314 32%, #F36815 48%, #F48917 72%, #F5AF19 100%)" @click="submit"  v-else>提交</van-button>
      </div>
    </div>
  </div> 
</template>

<script>
import { Notify, Toast, Dialog } from 'vant';
import uploaderImg from './assets/images/uploader@2x.png'
import successImg from './assets/images/success@2x.png'
import { nations, schoolType, UUID } from './utils/common'
import { upLoadImg , submitForm} from './api'
export default {
  data() {
    return {
      avatar: uploaderImg,
      fileList: [],
      progress: { // 表单进度
        current: 1,
        total: 4,
      },
      pickerText: { // picker展示的文本
        gender: '',
        nation: '',
      },
      radio: { // 单选 class
        active: 'radio-icon-normal radio-icon-active',
        inactive: 'radio-icon-normal',
      },
      chooseGender: false,
      genders: [ // 性别
        {text: '男', value: 1},
        {text: '女', value: 2}
      ],
      chooseBirthday: false,
      date: { // 日期
        minDate: new Date(1940, 0, 1),
        maxDate: new Date(2025, 10, 1),
        currentDate: new Date(2000, 0, 1),
      },
      chooseNation: false,
      nations: nations,
      schoolType: schoolType,
      emergentContact:[ // 紧急联系人
        {
          CompanyName: '',
          RelationShip: '',
          Mobile: '',
        }
      ],
      educationExprience: [ // 教育经历
        {
          isShowDateStart: false,
          isShowDateEnd: false,
          isShowSchoolType: false,
          FromDate: '',
          ToDate: '',
          showDate: '', // 用于展示
          showSchoolType: '', // 用于展示
          SchoolName: '',
          SchoolTypeID: '',
          Major: '',
        }
      ],
      jobExprience: [
        {
          isShowDateStart: false,
          isShowDateEnd: false,
          HireDate: '', // 开始时间
          DismissDate: '', // 结束时间
          showDate: '', // 用于展示
          Company: '',
          WorkingTypeName: '', // 职位
          Reason: '',
        }
      ],
      form: { // 表单
        id: '',
        CompanyName: '',
        Gender: '',
        EthnicityID: '',
        age: null,
        HighestEducation: '', // 最高学历
        ContactBirthday: '',
        GovernmentIDNumber: '', // 身份证号
        RegisteredPermanentAddressLocus: '', // 户口所在地
        Mobile: '', // 电话
        ContactAddress: '', // 联系地址
        PostCode: '', // 邮编
        ResidenceType: '', // 户籍情况
        MedicalHistory: '', // 家庭病史
        OnTheJob: '', // 在岗情况
        RecommendEmployment: '', // 是否需要推荐就业
        Trianning: '', // 培训意愿
        ParticipatedSkillsTraining: '', // 是否参加过技能培训
        RegistrationChannel: '', // 报名渠道
        PersonalSkills: '', // 个人技能
        Specialty: '', // 特长
        PersonalDescription: '',
      },
      // 表单验证
      rules: {
        id: [
          { required: true, message: '请填写学号！' }
        ],
        name: [
          { required: true, message: '请填写姓名！' }
        ],
        gender: [
          { required: true, message: '请选择性别！' }
        ],
        nation: [
          { required: true, message: '请选择民族！' }
        ],
        age: [
          {required: true, message: '请填写年龄！'},
        ],
        education: [
          { required: true, message: '请填写最高学历！' }
        ],
        birthday: [
          { required: true, message: '请选择出生日期！' }
        ],
        IDNumber: [
          { required: true, message: '请填写身份证号！' },
          {
            pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
            message: '填写的身份证信息有误!'
          }
        ],
        residence: [
          { required: true, message: '请填写户口所在地！' }
        ],
        tel: [
          { required: true, message: '请填写手机号！' },
          {
            pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
            message: '填写的手机号有误!'
          }
        ],
        address: [
          { required: true, message: '请填写联系地址！' }
        ],
        postcode: [
          {
            validator(value) {
              const reg = /^[0-9]{6}$/
              return reg.test(value) || value === ''
            },
            message: '邮编格式有误！'
          }
        ],
        residenceSituation: [
          { required: true, message: '请选择户籍情况！' }
        ],
        medicalHistory: [
          { required: true, message: '请选择家庭病史！' }
        ],
        jobSituation: [
          { required: true, message: '请选择在岗情况！' }
        ],
        needRecommend: [
          { required: true, message: '请选择是否需要推荐就业！' }
        ],
        trainWill: [
          { required: true, message: '请选择培训意愿！' }
        ],
        hadTrain: [
          { required: true, message: '请选择是否参加过技能培训！' }
        ],
        emergentContact: {
          name: [
            { required: true, message: '请填写紧急联系人姓名！' }
          ],
          relationship: [
            { required: true, message: '请填写紧急联系人关系！' }
          ],
          tel: [
            { required: true, message: '请填写紧急联系人的联系方式！' },
            {
              pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
              message: '填写的手机号有误!'
            }
          ],
        },
        signUpMethod: [
          { required: true, message: '请选择报名渠道！' }
        ],
        educationExprience: {
          education: [
            { required: true, message: '请填写学历信息！' }
          ],
          major: [
            { required: true, message: '请填写专业信息！' }
          ],
        },
        jobExprience: {
          company: [
            { required: true, message: '请填写工作单位！' }
          ],
          position: [
            { required: true, message: '请填写职位信息！' }
          ],
          quitReason: [
            { required: true, message: '请填写离职原因！' }
          ],
        },
        skills: [
          { required: true, message: '请填写个人技能！' }
        ],
        specialty: [
          { required: true, message: '请填写特长！' }
        ],
        selfDescription: [
          { required: true, message: '请填写个人描述！' }
        ],

      },
    }
  },
  mounted() {
    
  },
  methods: {
    // 头像
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      const photo = this.fileList[0].content;
      console.log(photo.split(',')[1]);
      upLoadImg(UUID(), photo.split(',')[1])
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      })
    },
    // 删除确认框
    removeConfirm() {
      return Dialog.confirm({  message: '确定删除该条信息？' })
    },
    // 确认性别
    confirmGender(gender) {
      this.form.Gender = gender.value
      this.pickerText.gender = gender.text
      this.chooseGender = false
    },
    // 确认出生日期
    confirmBirthday(date) {
      // console.log(date);
      this.form.ContactBirthday = this.handleDate(date)
      this.chooseBirthday = false
    },
    // 确认民族
    confirmNation(nation) {
      this.form.EthnicityID = nation.value
      this.pickerText.nation = nation.text
      this.chooseNation = false
    },
    // 弹出学历选择
    chooseSchoolType(index) {
      this.educationExprience[index].isShowSchoolType = true
    },
    cancelSchoolType(index) {
      this.educationExprience[index].isShowSchoolType = false
    },
    // 确认学历
    confirmSchoolType(schoolType, index) {
      this.educationExprience[index].showSchoolType = schoolType.text
      this.educationExprience[index].SchoolTypeID = schoolType.value
      this.educationExprience[index].isShowSchoolType = false
    },
    // 添加紧急联系人
    addEmergentContact() {
      const emergentContact = {
        CompanyName: '',
        RelationShip: '',
        Mobile: '',
      }
      this.emergentContact.push(emergentContact)
    },
    // 移除紧急联系人
    removeContact(index) {
      // console.log(index);
      this.removeConfirm()
      .then((res) => {
        this.emergentContact.splice(index, 1)
      })
      .catch((err) => {
        // console.log('cancel');
      })
    },
    // 添加教育经历
    addEducationExprience() {
      const exprience = {
        isShowDateStart: false,
        isShowDateEnd: false,
        isShowSchoolType: false,
        showDate: '',
        SchoolName: '',
        SchoolTypeID: '',
        Major: '',
        FromDate: '',
        ToDate: '',
        showSchoolType: '',
      }
      this.educationExprience.push(exprience)
    },
    // 移除教育经历
    removeEducation(index) {
      this.removeConfirm()
      .then((res) => {
        this.educationExprience.splice(index, 1)
      })
      .catch((err) => {
        // console.log('cancel');
      })
    },
    // 开始时间
    // 弹出教育经历时间
    chooseEducationDateStart(index) {
      // console.log(index);
      this.educationExprience[index].isShowDateStart = true
    },
    // 关闭教育经历时间
    closeEducationDateStart(index) {
      this.educationExprience[index].isShowDateStart = false
      this.educationExprience[index].FromDate = ''
      this.educationExprience[index].ToDate = '',
      this.educationExprience[index].showDate = ''
    },
    // 确认教育经历时间
    confirmEducationDateStart(date,index) {
      const startDate = this.handleDate(date)
      this.educationExprience[index].isShowDateStart = false
      this.educationExprience[index].FromDate = startDate
      this.chooseEducationDateEnd(index)
    },
    // 结束时间
    // 弹出教育经历时间
    chooseEducationDateEnd(index) {
      this.educationExprience[index].isShowDateEnd = true
    },
    // 关闭教育经历时间
    closeEducationDateEnd(index) {
      this.educationExprience[index].isShowDateEnd = false
      this.educationExprience[index].FromDate = ''
      this.educationExprience[index].ToDate = '',
      this.educationExprience[index].showDate = ''
    },
    // 确认教育经历时间
    confirmEducationDateEnd(date,index) {
      const startDate = this.educationExprience[index].FromDate
      const endDate = this.handleDate(date)
      this.educationExprience[index].ToDate = endDate
      this.educationExprience[index].showDate = `${startDate} 至 ${endDate}`
      this.educationExprience[index].isShowDateEnd = false
    },
    // 添加工作经历
    addJobExprience() {
      const exprience = {
        isShowDateStart: false,
        isShowDateEnd: false,
        HireDate: '', // 开始时间
        DismissDate: '', // 结束时间
        showDate: '', // 用于展示
        Company: '',
        WorkingTypeName: '', // 职位
        Reason: '',
      }
      this.jobExprience.push(exprience)
    },
    // 移除工作经历
    removeJobExprience(index) {
      this.removeConfirm()
      .then((res) => {
        this.jobExprience.splice(index, 1)
      })
      .catch((err) => {
        // console.log('cancel');
      })
    },
        // 开始时间
    // 弹出工作经历时间
    chooseJobDateStart(index) {
      // console.log(index);
      this.jobExprience[index].isShowDateStart = true
    },
    // 关闭教育经历时间
    closeJobDateStart(index) {
      this.jobExprience[index].isShowDateStart = false
      this.jobExprience[index].HireDate = ''
      this.jobExprience[index].DismissDate = '',
      this.jobExprience[index].showDate = ''
    },
    // 确认教育经历时间
    confirmJobDateStart(date,index) {
      const startDate = this.handleDate(date)
      this.jobExprience[index].isShowDateStart = false
      this.jobExprience[index].HireDate = startDate
      this.chooseJobDateEnd(index)
    },
    // 结束时间
    // 弹出工作经历时间
    chooseJobDateEnd(index) {
      this.jobExprience[index].isShowDateEnd = true
    },
    // 关闭工作经历时间
    closeJobDateEnd(index) {
      this.jobExprience[index].isShowDateEnd = false
      this.jobExprience[index].HireDate = ''
      this.jobExprience[index].DismissDate = '',
      this.jobExprience[index].showDate = ''
    },
    // 确认工作经历时间
    confirmJobDateEnd(date,index) {
      const startDate = this.jobExprience[index].HireDate
      const endDate = this.handleDate(date)
      this.jobExprience[index].DismissDate = endDate
      this.jobExprience[index].showDate = `${startDate} 至 ${endDate}`
      this.jobExprience[index].isShowDateEnd = false
    },
    // 上一步
    lastPage() {
      this.progress.current--;
    },
    // 下一步
    nextPage() {
      this.$refs.form.validate()
      .then(res => {
        this.progress.current++;
        // 回到顶部
        document.body.scrollTop = document.documentElement.scrollTop = 0
        if(this.progress.current === 4){
          setTimeout(() => {
            // 签名失焦
            const canvas = document.getElementsByTagName('canvas')[0]
            const inputList = document.getElementsByTagName('textarea')
            canvas.addEventListener('touchstart',function() {
              [...inputList].forEach((item) => {
                item.blur()
              })
            }, true)
          }, 100);
      }
      })
      .catch(err => {
        // console.log(err);
        Notify({ type: 'danger', message: '表单尚未完善或内容填写有误！' });
      })
    },
    // 清除签名
    resetSignature() {
      this.$refs.esign.reset()
    },
    // 日期处理
    handleDate(val) {
      const date = new Date(val)
      return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
    },
    // 签名处理
    handleEsign() {
      return this.$refs.esign.generate()
    },
    // toast loading
    loadingToast(message) {
      return Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message,
        overlay: true,
        className: 'customToast'
      })
    },
    // 追加 numID 并且 stringify
    handleStringify(arr) {
      return JSON.stringify(arr.map((value, index) => ({...value, numID: index+1})))
    },
    // 处理紧急联系人
    handleEmergentContactList() {
      return this.handleStringify(this.emergentContact)
    },
    // 处理教育经历
    handleEducationList() {
      const educationList = this.educationExprience.map(value => {
        const { isShowDateStart, isShowDateEnd, isShowSchoolType, showDate, showSchoolType, ...arg } = value
        return { ...arg }
      })
      return this.handleStringify(educationList)
    },
    // 处理工作经历
    handleJobList() {
      const jobList = this.jobExprience.map(value => {
        const { isShowDateStart, isShowDateEnd, showDate, ...arg} = value
        return { ...arg }
      })
      return this.handleStringify(jobList)
    },

    // 提交
    async submit() {
      // 验证表单
      this.$refs.form.validate()
      .then(async res => {
        // 验证签名
        this.handleEsign()
        .then(res => {
          const uuid = UUID()
          const splitImg = res.split(',')[1]
          upLoadImg(uuid, splitImg)
          .then(res => {
            const SignPhotoPath = res.data.results.url
            const toast = this.loadingToast('提交中')
            // 请求
            this.submitAction(SignPhotoPath)
            .then((res) => {
              // console.log(res);
              toast.message = '提交成功!'
              toast.icon = successImg
              setTimeout(function() {
                toast.clear()
                window.location.reload()
              }, 2000);
            })
            .catch(err => {
              toast.message = '提交失败!'
              toast.icon = 'fail'
              setTimeout(toast.clear, 2000);
              // console.log(err);
            })
          })
        })
        .catch(err => {
          Notify({ type: 'danger', message: '您尚未签名！' });
        })
      })
      .catch(err => {
        // console.log(err);
        Notify({ type: 'danger', message: '表单尚未完善或内容填写有误！' });
      })
    },
    // 提交表单
    submitAction(SignPhotoPath) {
      return submitForm({
        ...this.form,
        EmergencyContactList: this.handleEmergentContactList(),
        EducationList: this.handleEducationList(),
        WorkExperienceList: this.handleJobList(),
        SignPhotoPath,
      })
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
  background: url('assets/images/banner@2x.png') no-repeat;
  background-size: cover;
  background-position: center;
  overflow: hidden;
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
  /* position: relative; */
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
}
.form-base > .van-divider {
  margin-top: 0.06rem;
}
/* 单选标题 */
.radio-title {
  font-size: 0.3rem;
  line-height: 0.4rem;
  color: #666;
  position: relative;
  padding-left: 0.12rem;
}
.require::after {
  position: absolute;
  left: 0;
  color: #ee0a24;
  font-size: 14px;
  content: '*';
}
.title-require {
  position: relative;
}
.title-require::after {
  position: absolute;
  left: -0.14rem;
  color: #ee0a24;
  font-size: 14px;
  content: '*';
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
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 0.3rem;
  margin-bottom: 0.24rem;
  color: #555;
}
.base-info-header-desc {
  color: #525252;
  font-weight: normal;
}
.text-area-bg {
  background: #F6F6F6;
}
.signature-tip {
  color: #FD9F7A;
  font-size: 0.26rem;
  line-height: 0.42rem;
  padding: 0.3rem 0;
}
.signature-container {
  background: #fff;
  padding: 0.3rem 0 0.5rem;
  /* overflow: hidden; */
}
.signature-place-inner {
  height: 250px;
  overflow: hidden;
}
.signature-place {
  position: relative;
  margin-top: 0.24rem;
  width: 100%;
  height: 250px;
  background: #F6F6F6;
}
.signature-place::after {
  content: '请在灰色区域内手写您的姓名';
  width: 100%;
  text-align: center;
  color: #999999;
  font-size: 0.3rem;
  position: absolute;
  bottom: -0.4rem;
}
/* 重置 */
.reset-signature {
  position: absolute;
  top: -0.6rem;
  right: 0;
  width: 1.48rem;
  height: 0.6rem;
  background: #333;
  color: #fff;
  font-size: 0.3rem;
  line-height: 0.6rem;
  text-align: center;
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
/* 图片预览 */
.preview-cover {
  position: absolute;
  bottom: 0;
  box-sizing: border-box;
  width: 100%;
  padding: 4px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background: rgba(0, 0, 0, 0.3);
}
</style>
