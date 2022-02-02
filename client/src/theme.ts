import { extendTheme, Theme, ThemeConfig, withDefaultColorScheme } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

// const customTheme = extendTheme(
//   withDefaultProps({
//     defaultProps: {
//       variant: 'outline',
//       size: 'lg',
//     },
//     components: ['Input', 'NumberInput', 'PinInput'],
//   }),
// )

const theme = extendTheme({ config }) as Theme;

export default theme;
