import { IOption } from '~/types'

export interface ICreate {
  identification: string
  password: string
}

export interface IGetOptions {
  options: {
    business: IOption[]
    pais: IOption[]
  }
}
