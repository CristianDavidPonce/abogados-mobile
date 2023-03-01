import { IOption, IRecord } from '~/types'
export const url = 'tramites'
export interface IResponse extends IRecord {
  client: {
    _id: string
    completeName: string
    email?: string
    identification: string
  }
  categoria: {
    _id: string
    name: string
  }
  titulo: string
  descripcion: string
  fechaTramite: string
  estado: string
}

interface IOptions {
  estado: IOption[]
  tipoTramite: IOption[]
  client: IOption[]
  categoria: {
    value: string
    label: string
    tipo: IOption[]
  }[]
}

export interface IGetOptions {
  options: IOptions
}

export interface IGetOne {
  result: IResponse
}
