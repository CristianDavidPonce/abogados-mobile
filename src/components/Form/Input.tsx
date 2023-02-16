import React from 'react'
import { View, StyleSheet } from 'react-native'
import { HelperText, TextInput, TextInputProps } from 'react-native-paper'

import { useController, UseControllerProps } from 'react-hook-form'

interface IProps
  extends Omit<TextInputProps, 'selectionColor' | 'theme'>,
    UseControllerProps {
  label: string
  name: string
  mode?: 'flat' | 'outlined'
  defaultValue?: string
  optional?: boolean
  description?: string
  disabled?: boolean
  innerRef?: any
}

const Input = (props: IProps) => {
  const {
    label,
    name,
    innerRef,
    description,
    optional,
    rules,
    defaultValue,
    ...res
  } = props
  const { field, fieldState } = useController({ name, rules, defaultValue })
  const errors = Boolean(fieldState.error)
  return (
    <View style={styles.container}>
      <TextInput
        label={label}
        returnKeyType='next'
        value={field.value}
        onChangeText={field.onChange}
        error={errors}
        onBlur={field.onBlur}
        ref={innerRef}
        {...res}
      />

      {description !== undefined && !errors ? (
        <View style={styles.help2}>
          <HelperText type='info'>{description}</HelperText>
        </View>
      ) : null}
      {optional && !errors ? (
        <View style={styles.help}>
          <HelperText type='info'>{'Opcional'}</HelperText>
        </View>
      ) : null}

      {errors ? (
        <HelperText type='error'>{fieldState.error?.message}</HelperText>
      ) : null}
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 15,
    marginTop: -6,
  },
  input: {
    backgroundColor: 'transparent',
    margin: 0,
  },
  help: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: -8,
  },
  help2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: -8,
  },
})
