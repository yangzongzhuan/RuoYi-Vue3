<template>
  <div>
    <Editor ref="$Editor" :api-key='apiKey' :init="initSettings" v-model="state.content" />
    <Teleport to=".tox-dialog__header" v-if="showProgress">
      <div class="upload-progress" :style="`width: ${progressPercent}%;background: ${progressColor};`"></div>
    </Teleport>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import Editor from '@tinymce/tinymce-vue'
import { uploadImage } from "@/api/system/upload.js"

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  minHeight:{
    type: Number,
    default: 240,
  }
})

const showProgress = ref(false)
const progressPercent = ref(0)
const progressColor = ref('#409eff')

const state = reactive({
  // content: '<b>hello vue3-tinymce!<b>',
});

const $Editor = ref(null)
const apiKey = '' // 填入自己的apiKey
const initSettings = {
  language: 'zh_CN',
  branding: false,
  // toolbar: false, //隐藏工具栏
  // menubar: false, //隐藏菜单栏
  // inline: true, //开启内联模式
  plugins: 'advlist autolink link image media anchor lists preview', //字符串方式
  // toolbar:'media',
  toolbar: 'undo redo styleselect bold italic alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | image media file',
  height: props.minHeight, // editor 高度
  width: '100%', // editor 宽度
  // 图片上传
  images_upload_handler: (blobInfo, progress) => new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append('file', blobInfo.blob(), blobInfo.filename());
    const onUploadProgress = (progressEvent) => {
      // console.log('onUploadProgress', progressEvent)
      if (progressEvent.lengthComputable) {
        var complete =
          (((progressEvent.loaded / progressEvent.total) * 100) | 0);
        console.log('complete', complete)
        console.log('progress', progress)
        progress(complete)
      }
    }
    uploadImage(formData, onUploadProgress).then(res => {
      console.log('uploadImage', res)
      resolve(res.url);
    }).catch(err => {
      reject(err.msg)
    })
  }),
  // 文件上传
  file_picker_types: 'media',
  file_picker_callback: (callback, value, meta) => {
    if (meta.filetype == 'media') {
      const input = document.createElement('input') //创建一个隐藏的input
      input.setAttribute('type', 'file')
      input.onchange = function () {
        const file = this.files[0] //选取第一个文件
        // console.log('file', file)
        if (file.type === "video/mp4") {
          // 进度条重置
          progressPercent.value = 0
          progressColor.value = '#409eff'
          showProgress.value = true
          const formData = new FormData();
          formData.append('file', file, file.name);
          const onUploadProgress = (progressEvent) => {
            // console.log('onUploadProgress', progressEvent)
            if (progressEvent.lengthComputable) {
              var complete =
                (((progressEvent.loaded / progressEvent.total) * 100) | 0);
              progressPercent.value = complete
            }
          }
          uploadImage(formData, onUploadProgress).then(res => {
            // console.log('uploadImage', res)
            callback(res.url);
            progressColor.value = '#67c23a'
          }).catch(err => {
            progressColor.value = '#f56c6c'
            callback(err.msg)
          }).finally(() => {
            setTimeout(() => {
              showProgress.value = false
            }, 2000);
          })
        } else {
          // window.tinymce.activeEditor.notificationManager.open({
          //   text: '仅支持mp4文件上传，请重新选择',
          //   type: 'warning'
          // });
          callback('仅支持mp4文件上传，请重新选择。')
          // ElMessage({
          //   message: '仅支持mp4文件上传，请重新选择。',
          //   type: 'warning',
          // })
        }
      }
      //触发点击
      input.click()
    }
  },
}
watch(() => props.modelValue, val => {
  if (val !== state.content) {
    state.content = val === null ? "" : val;
  }
}, { immediate: true });
const emit = defineEmits()
watch(() => state.content, val => {
  emit('update:modelValue', val)
});
</script>


<style  lang="scss" scoped>
.upload-progress {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  // bottom: 0;
  background: #1c6ca1;
  width: 10%;
  min-width: 20px;
  height: 2px;
  transition: all 0.15s ease-in-out;
}
</style>
<style  lang="scss">
.tox-tinymce-aux {
  // z-index: 3000 !important;
}
</style>