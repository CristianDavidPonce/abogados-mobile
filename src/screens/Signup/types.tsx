import { IOption, IPerson } from '~/types'

export interface ICreate extends IPerson {
  business: string
  password: string
  pais: string
}

export interface IGetOptions {
  options: {
    business: IOption[]
    pais: IOption[]
  }
}
