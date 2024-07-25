<template>
  <n-space vertical style="width: 100%;padding: 10px">
    <n-card>
      <n-tabs v-model:value="activeName" @update-value="handleClick">
        <n-tab name="1">
          AI翻译
        </n-tab>
        <n-tab name="2">
          变量起名
        </n-tab>
      </n-tabs>
    </n-card>
    <div>
      <RouterView />
    </div>
  </n-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeName = ref('1')

function handleClick(path: string) {
  if (path === '1') {
    router.push({ path: '/' })
  } else {
    router.push({ path: '/code' })
  }
}
</script>

<style scoped>
</style>
