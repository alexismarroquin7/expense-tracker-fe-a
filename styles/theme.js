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
    white: "#fff",
    black: "#000",
    one: {
      name: "light blue",
      value: "#90CCF4"
    },
    two: {
      name: "red",
      value: "#F78888"
    },
    three: {
      name: "yellow",
      value: "#F3D250"
    },
    four: {
      name: "grey",
      value: "#ECECEC"
    },
    five: {
      name: "green",
      value: "#70cc70"
    }
  },
  boxShadow: {
    primary: "0px 10px 13px -7px #000000",
    secondary: "0px 10px 5px -7px #000000"
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
  input,
  textarea,
  label,
  button {
    font-size: 2rem;
  }
`