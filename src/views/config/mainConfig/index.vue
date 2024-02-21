<template>
  <div class="app-container">
    <el-tabs type="border-card">
      <el-tab-pane label="网站设置">
        <el-form ref="mainConfigRef" :model="form" :rules="rules" label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="站点标题" prop="site_title">
                <el-input v-model="form.site_title" placeholder="请输入站点标题" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="站点副标题" prop="site_subtitle">
                <el-input v-model="form.site_subtitle" placeholder="请输入站点副标题" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="站点关键字" prop="key_words">
            <el-input v-model="form.key_words" placeholder="请输入站点关键字" />
          </el-form-item>
          <el-form-item label="站点描述" prop="description">
            <el-input v-model="form.description" placeholder="请输入站点描述" />
          </el-form-item>
          <el-form-item label="备案号" prop="record_num">
            <el-input v-model="form.record_num" placeholder="请输入备案号" />
          </el-form-item>
          <el-form-item label="底部版权" prop="copyright">
            <editor v-model="form.copyright" :min-height="100" placeholder="请输入底部版权" />
          </el-form-item>
          <el-form-item label="统计代码" prop="js_code">
            <el-input v-model="form.js_code" :autosize="{ minRows: 2, maxRows: 4 }"
                      type="textarea" placeholder="请输入统计代码" />
          </el-form-item>
        </el-form>
        <div class="dialog-footer" style="text-align: right">
          <el-button type="primary" @click="submitForm">保 存</el-button>
          <el-button @click="rest">重 置</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Logo配置">
        <el-form ref="mainConfigRef" :model="form" :rules="rules" label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="网站Logo" prop="logo_img">
                <image-upload v-model="form.logo_img" :limit="1" :isShowTip="false"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="网站Icon" prop="site_subtitleicon_img">
                <image-upload v-model="form.icon_img" :limit="1" :isShowTip="false"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="dialog-footer" style="text-align: right">
          <el-button type="primary" @click="submitForm">保 存</el-button>
          <el-button @click="rest">重 置</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="功能开关">
        功能开关
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup name="MainConfig">
import { listMainConfig, updateMainConfig } from "@/api/config/mainConfig";

const { proxy } = getCurrentInstance();

const loading = ref(true);

const data = reactive({
  form: {},
  rules: {
  }
});
const { form, rules } = toRefs(data);

function rest() {
  getList();
}

/** 查询网站配置 */
function getList() {
  loading.value = true;
  listMainConfig().then(response => {
    form.value = response.data;
    loading.value = false;
    console.log(form.value);
  });
}

/** 保存按钮 */
function submitForm() {
  proxy.$refs["mainConfigRef"].validate(valid => {
    if (valid) {
      updateMainConfig(form.value).then(response => {
        proxy.$modal.msgSuccess("保存成功");
        getList();
      });
    }
  });
}

getList();
</script>
