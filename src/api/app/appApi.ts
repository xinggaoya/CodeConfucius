import {request} from '@/api/request'

// 获取Gemma回答
export function getGemmaAnswer(params: any) {
    return request.get({
        url: '/v1/gemma/completion',
        data: params
    })
}
// 获取Gemma对话
export function getGemmaChat(params: any) {
    return request.get({
        url: '/v1/gemma/completion/chat',
        data: params
    })
}
