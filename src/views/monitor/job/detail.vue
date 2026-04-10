<template>
  <el-dialog :title="type === 'log' ? '调度日志详细' : '任务详细'" v-model="dialogVisible" width="780px" append-to-body>
    <div class="detail-wrap">
      <template v-if="type === 'log'">
        <!-- 基本信息 -->
        <div class="detail-card">
          <div class="detail-card-title">
            <el-icon><InfoFilled /></el-icon> 基本信息
          </div>
          <el-row class="detail-row">
            <el-col :span="12">
              <div class="detail-item"><span class="detail-label">日志编号</span><span class="detail-value">{{ form.jobLogId }}</span></div>
            </el-col>
            <el-col :span="12">
              <div class="detail-item">
                <span class="detail-label">执行状态</span>
                <el-tag v-if="form.status == 0" type="success" size="small">正常</el-tag>
                <el-tag v-else type="danger" size="small">失败</el-tag>
              </div>
            </el-col>
          </el-row>
          <el-row class="detail-row">
            <el-col :span="12">
              <div class="detail-item"><span class="detail-label">开始时间</span><span class="detail-value">{{ form.startTime }}</span></div>
            </el-col>
            <el-col :span="12">
              <div class="detail-item"><span class="detail-label">结束时间</span><span class="detail-value">{{ form.endTime }}</span></div>
            </el-col>
          </el-row>
          <el-row class="detail-row">
            <el-col :span="12">
              <div class="detail-item"><span class="detail-label">记录时间</span><span class="detail-value">{{ form.createTime }}</span></div>
            </el-col>
            <el-col :span="12" v-if="form.status == 0 && form.startTime && form.endTime">
              <div class="detail-item"><span class="detail-label">执行耗时</span><span class="detail-value">{{ costTime }} 毫秒</span></div>
            </el-col>
          </el-row>
        </div>
        <!-- 任务信息 -->
        <div class="detail-card">
          <div class="detail-card-title">
            <el-icon><Clock /></el-icon> 任务信息
          </div>
          <el-row class="detail-row">
            <el-col :span="12">
              <div class="detail-item"><span class="detail-label">任务名称</span><span class="detail-value">{{ form.jobName }}</span></div>
            </el-col>
            <el-col :span="12">
              <div class="detail-item">
                <span class="detail-label">任务分组</span>
                <dict-tag :options="sys_job_group" :value="form.jobGroup" />
              </div>
            </el-col>
          </el-row>
          <el-row class="detail-row">
            <el-col :span="24">
              <div class="detail-item"><span class="detail-label">日志信息</span><span class="detail-value">{{ form.jobMessage }}</span></div>
            </el-col>
          </el-row>
        </div>
        <!-- 调用目标 -->
        <div class="detail-card">
          <div class="detail-card-title">
            <el-icon><Operation /></el-icon> 调用目标
          </div>
          <div class="code-body">
            <div class="code-wrap"><pre class="code-pre">{{ form.invokeTarget || '（无）' }}</pre></div>
          </div>
        </div>
        <!-- 异常信息 -->
        <div class="detail-card" v-if="form.status == 1">
          <div class="detail-card-title error-title">
            <el-icon><Warning /></el-icon> 异常信息
          </div>
          <div class="error-body"><div class="error-msg">{{ form.exceptionInfo }}</div></div>
        </div>
      </template>

      <template v-else>
        <!-- 任务配置 -->
        <div class="detail-card">
          <div class="detail-card-title">
            <el-icon><Setting /></el-icon> 任务配置
          </div>
          <el-row class="detail-row">
            <el-col :span="12">
              <div class="detail-item"><span class="detail-label">任务编号</span><span class="detail-value">{{ form.jobId }}</span></div>
            </el-col>
            <el-col :span="12">
              <div class="detail-item"><span class="detail-label">任务名称</span><span class="detail-value">{{ form.jobName }}</span></div>
            </el-col>
          </el-row>
          <el-row class="detail-row">
            <el-col :span="12">
              <div class="detail-item">
                <span class="detail-label">任务分组</span>
                <dict-tag :options="sys_job_group" :value="form.jobGroup" />
              </div>
            </el-col>
            <el-col :span="12">
              <div class="detail-item">
                <span class="detail-label">执行状态</span>
                <el-tag v-if="form.status == 0" type="success" size="small">正常</el-tag>
                <el-tag v-else type="info" size="small">暂停</el-tag>
              </div>
            </el-col>
          </el-row>
        </div>
        <!-- 调度信息 -->
        <div class="detail-card">
          <div class="detail-card-title">
            <el-icon><Calendar /></el-icon> 调度信息
          </div>
          <el-row class="detail-row">
            <el-col :span="12">
              <div class="detail-item"><span class="detail-label">cron 表达式</span><span class="detail-value mono">{{ form.cronExpression }}</span></div>
            </el-col>
            <el-col :span="12">
              <div class="detail-item"><span class="detail-label">下次执行时间</span><span class="detail-value">{{ parseTime(form.nextValidTime) }}</span></div>
            </el-col>
          </el-row>
          <el-row class="detail-row">
            <el-col :span="12">
              <div class="detail-item">
                <span class="detail-label">执行策略</span>
                <el-tag v-if="form.misfirePolicy == 0" type="info" size="small">默认策略</el-tag>
                <el-tag v-else-if="form.misfirePolicy == 1" type="warning" size="small">立即执行</el-tag>
                <el-tag v-else-if="form.misfirePolicy == 2" type="primary" size="small">执行一次</el-tag>
                <el-tag v-else-if="form.misfirePolicy == 3" type="danger" size="small">放弃执行</el-tag>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="detail-item">
                <span class="detail-label">并发执行</span>
                <el-tag v-if="form.concurrent == 0" type="success" size="small">允许</el-tag>
                <el-tag v-else type="danger" size="small">禁止</el-tag>
              </div>
            </el-col>
          </el-row>
        </div>
        <!-- 执行方法 -->
        <div class="detail-card">
          <div class="detail-card-title">
            <el-icon><Operation /></el-icon> 执行方法
          </div>
          <div class="code-body">
            <div class="code-wrap"><pre class="code-pre">{{ form.invokeTarget || '（无）' }}</pre></div>
          </div>
        </div>
        <!-- 元信息 -->
        <div class="detail-card">
          <div class="detail-card-title">
            <el-icon><Document /></el-icon> 元信息
          </div>
          <el-row class="detail-row">
            <el-col :span="12">
              <div class="detail-item"><span class="detail-label">创建人</span><span class="detail-value">{{ form.createBy || '-' }}</span></div>
            </el-col>
            <el-col :span="12">
              <div class="detail-item"><span class="detail-label">创建时间</span><span class="detail-value">{{ form.createTime }}</span></div>
            </el-col>
          </el-row>
          <el-row class="detail-row">
            <el-col :span="12">
              <div class="detail-item"><span class="detail-label">更新人</span><span class="detail-value">{{ form.updateBy || '-' }}</span></div>
            </el-col>
            <el-col :span="12">
              <div class="detail-item"><span class="detail-label">更新时间</span><span class="detail-value">{{ form.updateTime || '-' }}</span></div>
            </el-col>
          </el-row>
          <el-row class="detail-row" v-if="form.remark">
            <el-col :span="24">
              <div class="detail-item"><span class="detail-label">备注</span><span class="detail-value">{{ form.remark }}</span></div>
            </el-col>
          </el-row>
        </div>
      </template>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">关 闭</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup name="JobDetail">
const props = defineProps({
  visible: { type: Boolean, default: false },
  row: { type: Object, default: () => ({}) },
  // 'job' 任务详细 | 'log' 调度日志详细
  type: { type: String, default: 'job' }
})

const emit = defineEmits(['update:visible'])

const dialogVisible = computed({
  get: () => props.visible,
  set: (val) => emit('update:visible', val)
})

const { proxy } = getCurrentInstance()
const { sys_job_group } = useDict('sys_job_group')

const form = computed(() => props.row || {})

const costTime = computed(() => {
  if (!form.value.startTime || !form.value.endTime) return 0
  return new Date(form.value.endTime).getTime() - new Date(form.value.startTime).getTime()
})
</script>

<style scoped>
.detail-label {
  width: 80px;
}
</style>
