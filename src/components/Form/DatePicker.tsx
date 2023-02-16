import React, { useState } from 'react'
import { View, StyleSheet, TextInputProps } from 'react-native'
import {
  TextInput,
  TouchableRipple,
  HelperText,
  useTheme,
} from 'react-native-paper'
import moment from 'moment'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import {
  useController,
  useFormContext,
  UseControllerProps,
} from 'react-hook-form'

interface IProps
  extends Omit<TextInputProps, 'selectionColor'>,
    UseControllerProps {
  label: string
  name: string
  mode?: 'flat' | 'outlined'
  defaultValue?: string
  setFormError?: any
  optional?: boolean
  description?: string
  disabled?: boolean
  innerRef?: any
}

const DatePicker = (props: IProps) => {
  const {
    label,
    name,
    innerRef,
    description,
    optional,
    rules,
    defaultValue,
    disabled,
    ...res
  } = props
  const formContext = useFormContext()
  const { setValue } = formContext
  const { field, fieldState } = useController({ name, rules, defaultValue })

  const [date, setDate] = useState(field.value)
  const [show, setShow] = useState(false)
  const errors = Boolean(fieldState.error)

  const onChange = (selectedDate: Date | undefined) => {
    setShow(false)
    const currentDate = selectedDate || date
    setDate(currentDate)
    setValue(field.name, currentDate)
  }

  const showDatepicker = () => {
    setShow(true)
  }
  const theme = useTheme()
  return (
    <View style={styles.container}>
      <TouchableRipple
        onPress={showDatepicker}
        style={{ zIndex: 2 }}
        disabled={disabled}
        rippleColor={theme.colors.outline}
      >
        <View style={styles.touch}></View>
      </TouchableRipple>
      <TextInput
        style={styles.input}
        selectionColor={theme.colors.primary}
        mode='flat'
        label={label}
        disabled={disabled}
        returnKeyType='next'
        value={field.value && moment(field.value).format('YYYY-MM-DD')}
        onChangeText={field.onChange}
        error={errors}
        onBlur={field.onBlur}
        ref={innerRef}
        autoCapitalize={'none'}
        right={
          <TextInput.Icon icon={'calendar'} onPress={() => setShow(true)} />
        }
        editable={false}
        {...res}
      />

      {description && !errors && (
        <View style={styles.help}>
          <HelperText type='info'>{description}</HelperText>
        </View>
      )}
      {optional && !errors && (
        <View style={styles.help}>
          <HelperText type='info'>{'Opcional'}</HelperText>
        </View>
      )}
      {errors && (
        <HelperText type='error'>{fieldState.error?.message}</HelperText>
      )}
      <DateTimePickerModal
        isVisible={show}
        mode='date'
        locale='es_ES'
        date={date}
        onConfirm={onChange}
        onCancel={() => setShow(false)}
        confirmTextIOS='Confirmar'
        cancelTextIOS='Cancelar'
      />
    </View>
  )
}

export default DatePicker

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 10,
  },
  input: {
    marginTop: -55,
    marginBottom: 5,
  },
  help: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  touch: {
    height: 55,
  },
})
