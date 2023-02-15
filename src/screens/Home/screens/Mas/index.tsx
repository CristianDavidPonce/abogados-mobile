import { Dispatch } from '@reduxjs/toolkit'
import React from 'react'
import { ScrollView } from 'react-native'
import { Appbar, Avatar, Divider, List, useTheme } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import NoValidated from '~/components/Utils/NoValidated'
import { IRootState } from '~/store/reducers'
import { IAuthUserAction } from '~/store/reducers/authUser'
const { Item, Icon } = List
const Mas = () => {
  const user = useSelector<IRootState, IRootState['authUser']>(
    (x) => x.authUser
  )
  const dispatch = useDispatch<Dispatch<IAuthUserAction>>()

  const theme = useTheme()
  return (
    <>
      <Appbar>
        <Appbar.Content title='Más' />
      </Appbar>
      {user.isValidated ? (
        <ScrollView
          style={{
            backgroundColor: theme.colors.surface,
          }}
        >
          <Item
            title={user.user?.nombres + ' ' + user.user?.apellidos}
            description={user.user?.identification}
            style={{ marginStart: 10 }}
            left={() => (
              <Avatar.Text size={40} label={user.user?.nombres[0] || 'U'} />
            )}
          />
          <Item
            title={'Perfil'}
            right={() => <Icon icon={'chevron-right'} />}
          />
          <Item
            title={'Cambio de contraseña'}
            right={() => <Icon icon={'chevron-right'} />}
          />
          <Divider />
          <Item
            title={'Términos y condiciones'}
            right={() => <Icon icon={'open-in-new'} />}
          />
          <Item
            title={'Políticas de privacidad'}
            right={() => <Icon icon={'open-in-new'} />}
          />
          <Divider />
          <Item
            title={'Dispositivos'}
            right={() => <Icon icon={'chevron-right'} />}
          />
          <Item
            title={'Sistema'}
            right={() => <Icon icon={'chevron-right'} />}
          />
          <Divider />
          <Item
            title={'Cerrar sesión'}
            right={() => <Icon icon={'logout'} />}
            onPress={() => {
              dispatch({ type: 'resetAuth' })
            }}
          />
        </ScrollView>
      ) : (
        <NoValidated />
      )}
    </>
  )
}

export default Mas
