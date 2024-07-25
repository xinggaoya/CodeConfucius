<template>
  <n-flex>
    <n-card title="📖 请输入内容" style="flex: 1">
      <n-form ref="formRef" :model="form" :rules="rules">
        <n-form-item label="角色描述" path="description">
          <n-input type="textarea" :rows="8" v-model:value="form.description" placeholder="请输入描述" />
        </n-form-item>
        <n-form-item label="内容" path="content">
          <n-input-group>
            <n-input v-model:value="form.content" placeholder="请输入内容" @keydown.enter="handleClick" />
            <n-button type="primary" @click="handleClick" :loading="loading">生成</n-button>
          </n-input-group>
        </n-form-item>
      </n-form>
    </n-card>
    <n-card title="📖 生成结果" style="flex: 3">
      <n-space>
        <n-tag
          type="success"
          v-for="(item, index) in infoList"
          :key="index"
          @click="copy(item)"
        >
          {{ item }}
        </n-tag>
      </n-space>
    </n-card>
  </n-flex>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { getGemmaAnswer } from '@/api/app/appApi'
import { useMessage } from 'naive-ui'
import { useUserConfigStore } from '@/stores/modules/user-config'

const message = useMessage()
const userConfig = useUserConfigStore()
const form = ref({
  description: userConfig.description,
  content: ''
})

watch(form, (newValue) => {
  userConfig.description = newValue.description
}, {
  deep: true
})

const loading = ref(false)
const infoList = ref([])
const formRef = ref()
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
    infoList.value = []
    getGemmaAnswer(form.value).then(res => {
      infoList.value = res.data.split(',')
    })
      .finally(() => {
        loading.value = false
      })
  })
}

function copy(msg: string) {
  // 移除第一个字符
  msg = msg.substring(1)
  // 写入剪贴板
  navigator.clipboard.writeText(msg).then(() => {
    message.success('复制成功')
  }).catch(() => {
    message.error('复制失败')
  })
}
</script>

<style scoped>

</style>
