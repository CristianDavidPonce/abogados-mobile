export interface IMode {
  isDark: boolean
}

const initialState: IMode = {
  isDark: false,
}
export interface IType {
  type: 'TOGGLE_THEME' | 'DARK' | 'LIGHT'
}
export const modeReducer = (state = initialState, { type }: IType) => {
  switch (type) {
    case 'DARK':
      return {
        isDark: true,
      }
    case 'LIGHT':
      return {
        isDark: false,
      }
    case 'TOGGLE_THEME':
      return {
        isDark: !state.isDark,
      }

    default:
      return state
  }
}
