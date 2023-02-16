import { combineReducers } from 'redux'
import { authUser, IAuthUser } from './authUser'
import { IMode, modeReducer } from './mode'
import { ISnack, snack } from './snack'

export interface IRootState {
  authUser: IAuthUser
  snack: ISnack
  modeReducer: IMode
}

export default combineReducers<IRootState>({
  authUser,
  snack,
  modeReducer,
})
