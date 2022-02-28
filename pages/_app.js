
// store
import { Provider as ReduxProvider } from "react-redux";
import { applyMiddleware, createStore } from 'redux';
import { rootReducer } from "../store";
import thunk from 'redux-thunk';
import logger from 'redux-logger';

// styles
import { ThemeProvider } from 'styled-components'
import { GlobalStyles, theme } from "../styles";
import '../styles/globals.css'

const middleware = applyMiddleware(thunk, logger);
const store = createStore(rootReducer, middleware);

function MyApp({ Component, pageProps }) {
  return (
  <ReduxProvider
    store={store}
  >
    <ThemeProvider theme={theme.light}>
      <GlobalStyles/>
      <Component {...pageProps} />
    </ThemeProvider>
  </ReduxProvider>
  )
}

export default MyApp
