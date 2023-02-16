import { DarkTheme } from '@react-navigation/native'
import { DefaultTheme, MD3DarkTheme } from 'react-native-paper'

export const theme = {
  ...DefaultTheme,
  colors: {
    primary: 'rgb(56, 106, 31)',
    onPrimary: 'rgb(255, 255, 255)',
    primaryContainer: 'rgb(184, 243, 151)',
    onPrimaryContainer: 'rgb(7, 33, 0)',
    secondary: 'rgb(85, 98, 76)',
    onSecondary: 'rgb(255, 255, 255)',
    secondaryContainer: 'rgb(216, 231, 203)',
    onSecondaryContainer: 'rgb(19, 31, 13)',
    tertiary: 'rgb(56, 102, 102)',
    onTertiary: 'rgb(255, 255, 255)',
    tertiaryContainer: 'rgb(187, 235, 236)',
    onTertiaryContainer: 'rgb(0, 32, 32)',
    error: 'rgb(186, 26, 26)',
    onError: 'rgb(255, 255, 255)',
    errorContainer: 'rgb(255, 218, 214)',
    onErrorContainer: 'rgb(65, 0, 2)',
    background: 'rgb(253, 253, 246)',
    onBackground: 'rgb(26, 28, 24)',
    surface: 'rgb(253, 253, 246)',
    onSurface: 'rgb(26, 28, 24)',
    surfaceVariant: 'rgb(223, 228, 215)',
    onSurfaceVariant: 'rgb(67, 72, 62)',
    outline: 'rgb(116, 121, 109)',
    outlineVariant: 'rgb(195, 200, 187)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(47, 49, 45)',
    inverseOnSurface: 'rgb(241, 241, 234)',
    inversePrimary: 'rgb(156, 214, 126)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(243, 246, 235)',
      level2: 'rgb(237, 241, 229)',
      level3: 'rgb(231, 237, 222)',
      level4: 'rgb(229, 235, 220)',
      level5: 'rgb(225, 232, 216)',
    },
    surfaceDisabled: 'rgba(26, 28, 24, 0.12)',
    onSurfaceDisabled: 'rgba(26, 28, 24, 0.38)',
    backdrop: 'rgba(45, 50, 41, 0.4)',
  },
}

export const darkTheme = {
  ...MD3DarkTheme,
  ...DarkTheme,
  colors: {
    primary: 'rgb(156, 214, 126)',
    onPrimary: 'rgb(17, 56, 0)',
    primaryContainer: 'rgb(32, 81, 7)',
    onPrimaryContainer: 'rgb(184, 243, 151)',
    secondary: 'rgb(189, 203, 176)',
    onSecondary: 'rgb(40, 52, 32)',
    secondaryContainer: 'rgb(62, 74, 53)',
    onSecondaryContainer: 'rgb(216, 231, 203)',
    tertiary: 'rgb(160, 207, 208)',
    onTertiary: 'rgb(0, 55, 56)',
    tertiaryContainer: 'rgb(30, 78, 79)',
    onTertiaryContainer: 'rgb(187, 235, 236)',
    error: 'rgb(255, 180, 171)',
    onError: 'rgb(105, 0, 5)',
    errorContainer: 'rgb(147, 0, 10)',
    onErrorContainer: 'rgb(255, 180, 171)',
    background: 'rgb(26, 28, 24)',
    onBackground: 'rgb(227, 227, 220)',
    surface: 'rgb(26, 28, 24)',
    onSurface: 'rgb(227, 227, 220)',
    surfaceVariant: 'rgb(67, 72, 62)',
    onSurfaceVariant: 'rgb(195, 200, 187)',
    outline: 'rgb(141, 146, 134)',
    outlineVariant: 'rgb(67, 72, 62)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(227, 227, 220)',
    inverseOnSurface: 'rgb(47, 49, 45)',
    inversePrimary: 'rgb(56, 106, 31)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(33, 37, 29)',
      level2: 'rgb(36, 43, 32)',
      level3: 'rgb(40, 49, 35)',
      level4: 'rgb(42, 50, 36)',
      level5: 'rgb(44, 54, 38)',
    },
    surfaceDisabled: 'rgba(227, 227, 220, 0.12)',
    onSurfaceDisabled: 'rgba(227, 227, 220, 0.38)',
    backdrop: 'rgba(45, 50, 41, 0.4)',
  },
}