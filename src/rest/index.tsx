import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { ITable, IError, IWriteSuccess, IQueries } from '~/types'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from '@reduxjs/toolkit'
import { ISnackAction } from '~/store/reducers/snack'
import host from '~/config'
import { IRootState } from '~/store/reducers'

const query: IQueries = {
  params: {
    $limit: 100,
    $page: 1,
  },
}
export const useGet = <T,>({
  url,
  params,
  onSuccess = () => null,
  enabled,
  key,
}: {
  url: string
  params?: IQueries
  onSuccess?: (data: ITable<T>) => void
  enabled?: boolean
  key?: string
}) => {
  const user = useSelector<IRootState, IRootState['authUser']>(
    (x) => x.authUser
  )
  const getTable = async (params?: IQueries) => {
    const { data } = await axios.get(host.host + url, {
      params: { ...params?.params, ...params?.filters },
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
    return data
  }
  const dispatch = useDispatch<Dispatch<ISnackAction>>()
  return useQuery<ITable<T>, AxiosError<IError>>(
    [key || url],
    () => getTable(params || query),
    {
      enabled,
      onSuccess,
      onError: (error) => {
        dispatch({
          type: 'visible',
          payload: {
            message:
              error.response?.data?.message ||
              error.code ||
              messages.unknownError,
            type: 'error',
          },
        })
      },
    }
  )
}

export const useGetOne = <T,>({
  url,
  _id,
  onSuccess = () => null,
  enabled,
  key,
  config,
  onError = () => null,
}: {
  url: string
  _id?: string
  onSuccess?: (data: T) => void
  enabled?: boolean
  key?: string
  config?: AxiosRequestConfig<any>
  onError?: (e: AxiosError<IError>) => void
}) => {
  const dispatch = useDispatch<Dispatch<ISnackAction>>()
  const user = useSelector<IRootState, IRootState['authUser']>(
    (x) => x.authUser
  )
  const getOne = async (_id?: string) => {
    const { data } = await axios.get<T>(
      _id ? `${host.host + url}/${_id}` : `${host.host + url}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        ...config,
      }
    )
    return data
  }
  return useQuery<T, AxiosError<IError>>(
    [key || url + '/get-one', _id],
    () => getOne(_id),
    {
      enabled,
      staleTime: 0,
      onSuccess,
      onError: (error) => {
        onError(error)
        dispatch({
          type: 'visible',
          payload: {
            message:
              error.response?.data?.message ||
              error.code ||
              messages.unknownError,
            type: 'error',
          },
        })
      },
    }
  )
}

export const useGetOptions = <T,>({
  url,
  noUrl,
  onSuccess = () => null,
}: {
  url: string
  noUrl?: boolean
  onSuccess?: (data: T) => void
}) => {
  const dispatch = useDispatch<Dispatch<ISnackAction>>()
  const user = useSelector<IRootState, IRootState['authUser']>(
    (x) => x.authUser
  )

  const getTable = async () => {
    const { data } = await axios.get(
      noUrl ? host.host + url : host.host + url + '/get-options',
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    )
    return data
  }

  return useQuery<T, AxiosError<IError>>(
    [url + '/get-options'],
    () => getTable(),
    {
      onSuccess,
      onError: async (error) => {
        dispatch({
          type: 'visible',
          payload: {
            message:
              error.response?.data?.message ||
              error.code ||
              messages.unknownError,
            type: 'error',
          },
        })
      },
    }
  )
}

export const useDeleteOne = ({
  url,
  noUrl,
  onSuccess = () => null,
}: {
  url: string
  onSuccess?: () => void
  noUrl?: boolean
}) => {
  const dispatch = useDispatch<Dispatch<ISnackAction>>()
  const queryClient = useQueryClient()
  const deleteOne = async (_id: string) => {
    const { data } = await axios.delete<IWriteSuccess>(
      noUrl ? host.host + url : host.host + url + '/' + _id
    )
    return data
  }

  return useMutation<IWriteSuccess, AxiosError<IError>, string>(deleteOne, {
    onSuccess: (data) => {
      onSuccess()
      dispatch({
        type: 'visible',
        payload: {
          message: data.message,
          type: 'default',
        },
      })
      queryClient.invalidateQueries({ queryKey: [url] })
      queryClient.refetchQueries()
    },
    onError: (error) => {
      dispatch({
        type: 'visible',
        payload: {
          message:
            error.response?.data?.message ||
            error.code ||
            messages.unknownError,
          type: 'error',
        },
      })
    },
  })
}

export const useCreateOne = <T,>({
  url,
  onSuccess = () => null,
  config,
  onError = () => null,
  snack = true,
}: {
  url: string
  onSuccess?: (data: IWriteSuccess) => void
  config?: AxiosRequestConfig<any>
  snack?: boolean
  onError?: (error: AxiosError<IError>) => void
}) => {
  const dispatch = useDispatch<Dispatch<ISnackAction>>()
  const queryClient = useQueryClient()
  return useMutation<IWriteSuccess, AxiosError<IError, T>, T>(
    async (values) => {
      const { data } = await axios.post<IWriteSuccess>(
        host.host + url,
        values,
        {
          ...config,
        }
      )
      return data
    },
    {
      onSuccess: (resp) => {
        onSuccess(resp)
        queryClient.invalidateQueries({ queryKey: [url] })
        queryClient.refetchQueries()
        snack &&
          dispatch({
            type: 'visible',
            payload: {
              message: resp.message,
              type: 'default',
            },
          })
      },
      onError: (error) => {
        onError(error)
        dispatch({
          type: 'visible',
          payload: {
            message:
              error.response?.data?.message ||
              error.code ||
              messages.unknownError,
            type: 'error',
          },
        })
      },
    }
  )
}

export const useEditOne = <T,>({
  url,
  noUrl,
  onSuccess = () => null,
  _id,
}: {
  url: string
  noUrl?: boolean
  onSuccess?: (data: IWriteSuccess) => void
  _id: string
}) => {
  const dispatch = useDispatch<Dispatch<ISnackAction>>()
  const queryClient = useQueryClient()

  return useMutation<IWriteSuccess, AxiosError<IError, T>, T>(
    async (values) => {
      const { data } = await axios.put<IWriteSuccess>(
        noUrl ? host.host + url : `${host.host + url}/${_id}`,
        values
      )
      return data
    },
    {
      onSuccess: (resp) => {
        onSuccess(resp)
        queryClient.invalidateQueries({ queryKey: [url] })
        queryClient.refetchQueries()
        dispatch({
          type: 'visible',
          payload: {
            message: resp.message,
            type: 'default',
          },
        })
      },
      onError: (error) => {
        dispatch({
          type: 'visible',
          payload: {
            message:
              error.response?.data?.message ||
              error.code ||
              messages.unknownError,
            type: 'error',
          },
        })
      },
    }
  )
}

const messages = {
  unknownError: 'Error desconocido',
  actionSuccess: 'Se realizó la acción con éxito',
}
