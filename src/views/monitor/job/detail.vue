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
              <div class="detail-item"><span class="detail-label">日志编号</span><span class="detail-value">{{ logForm.jobLogId }}</span></div>
            </el-col>
            <el-col :span="12">
              <div class="detail-item">
                <span class="detail-label">执行状态</span>
                <el-tag v-if="logForm.status == 0" type="success" size="small">正常</el-tag>
                <el-tag v-else type="danger" size="small">失败</el-tag>
              </div>
            </el-col>
          </el-row>
          <el-row class="detail-row">
            <el-col :span="12">
              <div class="detail-item"><span class="detail-label">开始时间</span><span class="detail-value">{{ logForm.startTime }}</span></div>
            </el-col>
            <el-col :span="12">
              <div class="detail-item"><span class="detail-label">结束时间</span><span class="detail-value">{{ logForm.endTime }}</span></div>
            </el-col>
          </el-row>
          <el-row class="detail-row">
            <el-col :span="12">
              <div class="detail-item"><span class="detail-label">记录时间</span><span class="detail-value">{{ logForm.createTime }}</span></div>
            </el-col>
            <el-col :span="12" v-if="logForm.status == 0 && logForm.startTime && logForm.endTime">
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
              <div class="detail-item"><span class="detail-label">任务名称</span><span class="detail-value">{{ logForm.jobName }}</span></div>
            </el-col>
            <el-col :span="12">
              <div class="detail-item">
                <span class="detail-label">任务分组</span>
                <dict-tag :options="sys_job_group" :value="logForm.jobGroup" />
              </div>
            </el-col>
          </el-row>
          <el-row class="detail-row">
            <el-col :span="24">
              <div class="detail-item"><span class="detail-label">日志信息</span><span class="detail-value">{{ logForm.jobMessage }}</span></div>
            </el-col>
          </el-row>
        </div>
        <!-- 调用目标 -->
        <div class="detail-card">
          <div class="detail-card-title">
            <el-icon><Operation /></el-icon> 调用目标
          </div>
          <div class="code-body">
            <div class="code-wrap"><pre class="code-pre">{{ logForm.invokeTarget || '（无）' }}</pre></div>
          </div>
        </div>
        <!-- 异常信息 -->
        <div class="detail-card" v-if="logForm.status == 1">
          <div class="detail-card-title error-title">
            <el-icon><Warning /></el-icon> 异常信息
          </div>
          <div class="error-body"><div class="error-msg">{{ logForm.exceptionInfo }}</div></div>
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
              <div class="detail-item"><span class="detail-label">任务编号</span><span class="detail-value">{{ jobForm.jobId }}</span></div>
            </el-col>
            <el-col :span="12">
              <div class="detail-item"><span class="detail-label">任务名称</span><span class="detail-value">{{ jobForm.jobName }}</span></div>
            </el-col>
          </el-row>
          <el-row class="detail-row">
            <el-col :span="12">
              <div class="detail-item">
                <span class="detail-label">任务分组</span>
                <dict-tag :options="sys_job_group" :value="jobForm.jobGroup" />
              </div>
            </el-col>
            <el-col :span="12">
              <div class="detail-item">
                <span class="detail-label">执行状态</span>
                <el-tag v-if="jobForm.status == 0" type="success" size="small">正常</el-tag>
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
              <div class="detail-item"><span class="detail-label">cron 表达式</span><span class="detail-value mono">{{ jobForm.cronExpression }}</span></div>
            </el-col>
            <el-col :span="12">
              <div class="detail-item"><span class="detail-label">下次执行时间</span><span class="detail-value">{{ parseTime(jobForm.nextValidTime) }}</span></div>
            </el-col>
          </el-row>
          <el-row class="detail-row">
            <el-col :span="12">
              <div class="detail-item">
                <span class="detail-label">执行策略</span>
                <el-tag v-if="jobForm.misfirePolicy == 0" type="info" size="small">默认策略</el-tag>
                <el-tag v-else-if="jobForm.misfirePolicy == 1" type="warning" size="small">立即执行</el-tag>
                <el-tag v-else-if="jobForm.misfirePolicy == 2" type="primary" size="small">执行一次</el-tag>
                <el-tag v-else-if="jobForm.misfirePolicy == 3" type="danger" size="small">放弃执行</el-tag>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="detail-item">
                <span class="detail-label">并发执行</span>
                <el-tag v-if="jobForm.concurrent == 0" type="success" size="small">允许</el-tag>
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
            <div class="code-wrap"><pre class="code-pre">{{ jobForm.invokeTarget || '（无）' }}</pre></div>
          </div>
        </div>
        <!-- 元信息 -->
        <div class="detail-card">
          <div class="detail-card-title">
            <el-icon><Document /></el-icon> 元信息
          </div>
          <el-row class="detail-row">
            <el-col :span="12">
              <div class="detail-item"><span class="detail-label">创建人</span><span class="detail-value">{{ jobForm.createBy || '-' }}</span></div>
            </el-col>
            <el-col :span="12">
              <div class="detail-item"><span class="detail-label">创建时间</span><span class="detail-value">{{ jobForm.createTime }}</span></div>
            </el-col>
          </el-row>
          <el-row class="detail-row">
            <el-col :span="12">
              <div class="detail-item"><span class="detail-label">更新人</span><span class="detail-value">{{ jobForm.updateBy || '-' }}</span></div>
            </el-col>
            <el-col :span="12">
              <div class="detail-item"><span class="detail-label">更新时间</span><span class="detail-value">{{ jobForm.updateTime || '-' }}</span></div>
            </el-col>
          </el-row>
          <el-row class="detail-row" v-if="jobForm.remark">
            <el-col :span="24">
              <div class="detail-item"><span class="detail-label">备注</span><span class="detail-value">{{ jobForm.remark }}</span></div>
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

<script setup lang="ts" name="JobDetail">
import type { SysJob } from '@/types/api/monitor/job'
import type { SysJobLog } from '@/types/api/monitor/jobLog'

type DetailType = 'job' | 'log'

const props = defineProps<{
  visible: boolean
  row: SysJob | SysJobLog
  type?: DetailType
}>()

const emit = defineEmits<{
  (e: 'update:visible', val: boolean): void
}>()

const dialogVisible = computed({
  get: () => props.visible,
  set: (val: boolean) => emit('update:visible', val)
})

const { proxy } = getCurrentInstance()!
const { sys_job_group } = useDict('sys_job_group')

const jobForm = computed<SysJob>(() => props.row as SysJob)
const logForm = computed<SysJobLog>(() => props.row as SysJobLog)

const costTime = computed<number>(() => {
  const { startTime, endTime } = logForm.value
  if (!startTime || !endTime) return 0
  return new Date(endTime).getTime() - new Date(startTime).getTime()
})
</script>

<style scoped>
.detail-label {
  width: 80px;
}
</style>
