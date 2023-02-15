import React, { useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import {
  TextInput,
  Modal,
  Portal,
  List,
  TouchableRipple,
  HelperText,
  useTheme,
  TextInputProps,
} from 'react-native-paper'

import {
  useController,
  useFormContext,
  UseControllerProps,
} from 'react-hook-form'

interface IInput
  extends Omit<TextInputProps, 'selectionColor'>,
    UseControllerProps {
  label: string
  name: string
  defaultValue?: string
  setFormError?: Function
  optional?: boolean
  description?: string
  innerRef?: any
  list: { value: string; label: string }[] | undefined
  onSelect?: (data: any) => void
  disabled?: boolean
  arrayErrors?: {
    name: string
    property: string
    index: number
  }
}

const Select = (props: IInput) => {
  const {
    label,
    name,
    innerRef,
    description,
    list,
    rules,
    defaultValue,
    onSelect,
    arrayErrors,
    disabled,
    ...res
  } = props
  const theme = useTheme()
  const formContext = useFormContext()
  const { setValue } = formContext
  const { field, fieldState } = useController({ name, rules, defaultValue })
  const errors = Boolean(fieldState?.error)

  const [visible, setVisible] = React.useState(false)
  const [label_, setLabel_] = useState('')

  const showModal = () => setVisible(true)
  const hideModal = () => setVisible(false)
  useEffect(() => {
    const _label = list?.find((_: any) => _.value === field.value)?.label
    if (_label) {
      setLabel_(_label)
    }
  }, [list, label_, field.value])

  useEffect(() => {
    const element = list?.find((_: any) => _.value === field.value)
    if (element) {
      // setFieldValue( name, element )
    } else {
      setLabel_('')

      setValue(name, '')
    }
  }, [list])

  return (
    <View style={styles.container}>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modalView}
        >
          <ScrollView>
            {list?.map(
              (element: { label: string; value: string }, index: any) => {
                return (
                  <View key={index} style={{ flexDirection: 'column' }}>
                    <List.Item
                      onPress={() => {
                        // setValue( 'estadoCivil', element.value )
                        setLabel_(element.label)
                        hideModal()
                        field.onChange(element.value)
                        onSelect && onSelect(element.value)
                      }}
                      title={element.label}
                      titleNumberOfLines={2}
                    />
                  </View>
                )
              }
            )}
          </ScrollView>
        </Modal>
      </Portal>
      <TouchableRipple
        onPress={showModal}
        style={{ zIndex: 2 }}
        disabled={disabled}
        rippleColor={theme.colors.outline}
      >
        <TextInput
          style={styles.input}
          selectionColor={theme.colors.primary}
          mode='flat'
          label={label}
          value={label_}
          error={Boolean(errors)}
          onBlur={field.onBlur}
          ref={innerRef}
          editable={false}
          autoCorrect={false}
          disabled={disabled}
          right={<TextInput.Icon icon={'menu-down'} onPress={showModal} />}
          {...res}
        />
      </TouchableRipple>

      {description && !errors ? (
        <View style={styles.help}>
          <HelperText type='info'>{description}</HelperText>
        </View>
      ) : null}
      {errors ? (
        <HelperText type='error'>{fieldState.error?.message}</HelperText>
      ) : null}
      {/* { errorsArray ? <HelperText type='error'>{formState.errors[arrayErrors?.name][arrayErrors?.index][arrayErrors?.property].message}</HelperText> : null } */}
    </View>
  )
}

export default Select

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 15,
    marginTop: -4,
  },
  input: { margin: 0 },
  help: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
})
