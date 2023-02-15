import { combineReducers } from 'redux'
import { authUser, IAuthUser } from './authUser'
import { ISnack, snack } from './snack'

export interface IRootState {
  authUser: IAuthUser
  snack: ISnack
}

export default combineReducers<IRootState>({
  authUser,
  snack,
})
