export interface ISnack {
  visible: boolean
  message?: string
  type?: 'default' | 'error'
}

const initialState: ISnack = {
  visible: false,
  message: '',
  type: 'default',
}

export interface ISnackAction {
  type: 'visible' | 'close'
  payload?: {
    message?: string
    type?: 'default' | 'error'
  }
}

export const snack = (
  state = initialState,
  { type, payload }: ISnackAction
) => {
  switch (type) {
    case 'visible':
      return {
        visible: true,
        message: payload?.message,
        type: payload?.type || 'default',
      }
    case 'close':
      return initialState
    default:
      return state
  }
}
