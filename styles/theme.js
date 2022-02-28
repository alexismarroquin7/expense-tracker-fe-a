import { createGlobalStyle } from "styled-components";

const sharedColor = {
  white: "#fff",
  black: "#000"
}

const sharedTheme = {
  borderRadius: {
    primary: "10px"
  },
  padding: {
    primary: "1rem"
  },
  gap: {
    primary: "1rem",
    secondary: "2rem"
  },
  transition: {
    primary: `all 0.2s ease`
  }
} 

const light = {
  ...sharedTheme,
  type: 'light',
  color: {
    ...sharedColor,
    primary: {
      name: "dark_blue",
      value: "#001730"
    },
    secondary: {
      name: "sea_green",
      value: "#4AD7D1"
    },
    terciary: {
      name: "red",
      value: "#FE4A49"
    }
  }
};

const dark = {
  ...sharedTheme,
  type: 'dark',
  color: {
    ...sharedColor,
    primary: {
      name: "",
      value: ""
    }
  }

};

export const theme = {
  light,
  dark
}

export const GlobalStyles = createGlobalStyle`
  /* add global styles here */
`