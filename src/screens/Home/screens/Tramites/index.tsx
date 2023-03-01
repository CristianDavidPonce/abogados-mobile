import React from 'react'
import { Appbar } from 'react-native-paper'
import { useSelector } from 'react-redux'
import NoValidated from '~/components/Utils/NoValidated'
import { IRootState } from '~/store/reducers'
import Lista from './Lista'

const Tramites = () => {
  const user = useSelector<IRootState, IRootState['authUser']>(
    (x) => x.authUser
  )

  return (
    <>
      <Appbar>
        <Appbar.Content title='Mis Trámites y Casos' />
      </Appbar>
      {user.isValidated ? <Lista /> : <NoValidated />}
    </>
  )
}

export default Tramites
