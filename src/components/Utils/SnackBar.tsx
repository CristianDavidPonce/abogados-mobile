import React from 'react'
import { Snackbar, useTheme } from 'react-native-paper'
import { ISnackAction } from '~/store/reducers/snack'
import { IRootState } from '~/store/reducers'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'

const Snack = () => {
  const theme = useTheme()
  const dispatchSnack = useDispatch<Dispatch<ISnackAction>>()
  const snack = useSelector((state: IRootState) => state.snack)
  return (
    <Snackbar
      visible={snack.visible}
      onDismiss={() => {
        dispatchSnack({ type: 'close' })
      }}
      action={{
        label: 'Ok',
        color:
          snack.type === 'error' ? theme.colors.error : theme.colors.secondary,
        onPress: () => {
          // Do something
        },
      }}
    >
      {snack.message}
    </Snackbar>
  )
}
export default Snack
