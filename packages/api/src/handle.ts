import axios, { AxiosResponse } from 'axios'
import request, { RequestType } from './request'
import type { BaseParam, BaseResponse, BaseResponseServer } from './types'

export const handleError: (error: any) => BaseResponse<any> = error => {
  if (axios.isCancel(error)) {
    return {
      status: 500,
      cancel: true,
      success: false,
    }
  }
  return {
    cancel: false,
    success: false,
    message: (error?.response?.message as string) ?? error?.response?.data?.message,
    status: error?.response?.status as string,
    data: error?.response?.data,
  }
}

export const handleSuccess: <T, R>(
  result: AxiosResponse<R>,
  handle: (r: AxiosResponse<R>) => Omit<BaseResponse<T>, 'status'>,
  status?: number
) => BaseResponse<T> = (result, handle, status = 200) => {
  if (result.status !== status) {
    return {
      status: result.status,
      message: result.statusText,
    }
  }

  return {
    status: result.status,
    ...handle(result),
  }
}

interface HandleRequestOptions extends Pick<BaseParam, 'authen' | 'cancelToken' | 'language'> {
  status?: number
}

export const handleRequest: <T, S = BaseResponseServer<T>>(
  func: (req: RequestType) => Promise<AxiosResponse<S>>,
  handle: (r: AxiosResponse<S>) => Omit<BaseResponse<T>, 'status'>,
  options?: HandleRequestOptions
) => Promise<BaseResponse<T>> = async (func, handle, options) => {
  try {
    const req = request
    const result = await func(req)

    if (result.status !== (options?.status ?? 200)) {
      return {
        status: result.status,
        message: result.statusText,
      }
    }

    return {
      success: true,
      status: result.status,
      ...handle(result),
    }
  } catch (error: any) {
    return handleError(error)
  }
}

// class HandleRequest<T = any> {
//   handleRequest: <S = BaseResponseServer<T>>(
//     func: (req: RequestType) => Promise<AxiosResponse<S>>,
//     handle: (r: AxiosResponse<S>) => Omit<BaseResponse<T>, 'status'>,
//     options?: HandleRequestOptions
//   ) => Promise<BaseResponse<T>> = async (func, handle, options) => {
//     try {
//       const req = request
//       const result = await func(req)

//       if (result.status !== (options?.status ?? 200)) {
//         return {
//           status: result.status,
//           message: result.statusText,
//         }
//       }

//       return {
//         success: true,
//         status: result.status,
//         ...handle(result),
//       }
//     } catch (error: any) {
//       return handleError(error)
//     }
//   }
// }

// export const handleRequest: typeof  = <T>() => new HandleRequest<T>().handleRequest()
