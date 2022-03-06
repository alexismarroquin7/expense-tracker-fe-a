
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

let persistedState = {};

if(typeof window !== "undefined"){
  persistedState = JSON.parse(localStorage.getItem('et-fe-a')) 
  ? JSON.parse(localStorage.getItem('et-fe-a')) 
  : {}
}

const middleware = applyMiddleware(
  thunk
  ,
  logger
);
const store = createStore(rootReducer, persistedState, middleware);

store.subscribe(() => {
  if(typeof window !== "undefined"){
    localStorage.setItem(
      'et-fe-a',
      JSON.stringify(store.getState())
    );
  }
});

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
