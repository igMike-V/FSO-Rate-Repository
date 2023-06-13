import { Platform } from "react-native";

const theme = {
  colors: {
    textPrimary: "#24292e",
    textSecondary: "#586069",
    primary: "#0366d6",
    bgDark: "#24292e",
    bgLight: "#eeeeee",
    appBarText: "#ffffff",
    lightText: "#ffffff",
    error: "#d73a4a",
  },
  fontSizes: {
    body: 14,
    subheading: 16,
    heading: 22,
  },
  fonts: {
    main: Platform.select({
      android: "Roboto",
      ios: "Arial",
      default: "System",
    }),
  },
  fontWeights: {
    normal: "400",
    bold: "700",
  },
  borders: {
    buttonRadius: 5,
    weight: 2,
    color: "#d3d8de",
  },
};

export default theme;
