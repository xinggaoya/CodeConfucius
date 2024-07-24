import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserConfigStore = defineStore(
  'user-config',
  () => {
    const description = ref('你现在是程序员变量起名大师，我将会发送中文你翻译英文后按照不同格式变量生成。包括大驼峰、小驼峰以及下划线命名等等方式。注意仅需回复生成的变量，并且使用英文逗号间隔')

    return {
      description
    }
  },
  {
    persist: true
  }
)
