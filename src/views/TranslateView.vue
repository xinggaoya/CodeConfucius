<template>
  <n-flex>
    <n-card title="📖 请输入内容" style="flex: 1">
      <n-form ref="formRef" :model="form" :rules="rules">
        <n-form-item label="内容" path="content">
          <n-input-group>
            <n-input type="textarea" rows="8" v-model:value="form.content" placeholder="请输入内容"
                     @keydown.enter="handleClick" />
          </n-input-group>
        </n-form-item>
        <n-space justify="end">
          <n-button type="primary" @click="handleClick" :loading="loading">翻 译</n-button>
        </n-space>
      </n-form>
    </n-card>
    <n-card title="📖 翻译结果" style="flex: 3">
      <n-space>
        <p style="font-size: 20px"> {{ info }}</p>
      </n-space>
    </n-card>
  </n-flex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getGemmaAnswer } from '@/api/app/appApi'
import { useMessage } from 'naive-ui'

const message = useMessage()
const form = ref({
  description: '你会多种语言，擅长语言之间的翻译，接下来你将翻译给出所有文本。根据提供的文本，翻译为英文。或者英文转为中文。' +
    '有些文本可能将单词连接起来，请你根据内容自动理解并试着翻译出对应中文或者英文。注意你是翻译大师，并不会回答其他问题',
  content: ''
})

const loading = ref(false)
const info = ref<string>('')
const formRef = ref<any>()
const rules = {
  content: [
    { required: true, message: '请输入内容', trigger: 'blur' }
  ],
  description: [
    { required: true, message: '请输入角色描述', trigger: 'blur' }
  ]
}

function handleClick() {
  formRef.value.validate().then(() => {
    if (!form.value.content) {
      message.error('请输入内容')
      return
    }
    loading.value = true
    info.value = ''
    getGemmaAnswer(form.value).then(res => {
      info.value = res.data
    })
      .finally(() => {
        loading.value = false
      })
  })
}

function copy() {
  // 写入剪贴板
  if (info.value) {
    navigator.clipboard.writeText(info.value).then(() => {
      message.success('复制成功')
    }).catch(() => {
      message.error('复制失败')
    })
  }
}
</script>

<style scoped>

</style>
