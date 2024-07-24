import ky, {type Options} from 'ky'
import {createDiscreteApi} from 'naive-ui'

const baseURL = import.meta.env.VITE_BASE_AXIOS_URL as string

const {message} = createDiscreteApi(['message'])

const beforeRequest = (request: Request) => {
    // 在发送请求之前做一些处理，比如添加token等
    return request
}

// @ts-ignore
const afterResponse = async (request: Request, _options: Options, response: Response) => {
    if (response.status === 500) {
        message.error('服务器异常，请稍后重试…')
        throw new Error('服务器错误')
    }
    return response
}

const defaultConfig: Options = {
    prefixUrl: baseURL,
    timeout: 10000,
    retry: {
        limit: 0
    },
    hooks: {
        beforeRequest: [
            beforeRequest
        ],
        afterResponse: [
            afterResponse
        ]
    },
    headers: {
        'Content-Type': 'application/json'
    }
}

const instance = ky.create(defaultConfig)

export default instance
