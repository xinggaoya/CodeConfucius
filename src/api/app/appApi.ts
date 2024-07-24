import {request} from '@/api/request'

// 获取Gemma回答
export function getGemmaAnswer(params: any) {
    return request.get({
        url: '/v1/gemma/completion',
        data: params
    })
}
