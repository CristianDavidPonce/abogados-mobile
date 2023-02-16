import { Dispatch } from '@reduxjs/toolkit'
import { useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { ScrollView } from 'react-native'
import { Appbar, Avatar, Divider, List, useTheme } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import NoValidated from '~/components/Utils/NoValidated'
import { IRootState } from '~/store/reducers'
import { IAuthUserAction } from '~/store/reducers/authUser'
import { IType } from '~/store/reducers/mode'
const { Item, Icon } = List
const Mas = () => {
  const user = useSelector<IRootState, IRootState['authUser']>(
    (x) => x.authUser
  )
  const dispatch = useDispatch<Dispatch<IAuthUserAction>>()
  const client = useQueryClient()
  const theme = useTheme()
  const tema = useDispatch<Dispatch<IType>>()
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
            title={'Cambiar Tema'}
            right={() => <Icon icon={'theme-light-dark'} />}
            onPress={() => tema({ type: 'TOGGLE_THEME' })}
          />
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
              client.invalidateQueries(['validatedash'])
              client.clear()
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
