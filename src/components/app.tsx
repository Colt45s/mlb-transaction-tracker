import React from 'react';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { store } from '../store';
import { Provider } from 'react-redux';
import { TransactionTracker } from './transactionTracker';

const GlobalStyle = createGlobalStyle`
  ${reset}
  body {
    line-height: 1.75;
    font-size: 1em;
    font-family: -apple-system, BlinkMacSystemFont, "Hiragino Kaku Gothic ProN", Meiryo, sans-serif;
  }
`;

export function App() {
  return (
    <>
      <GlobalStyle />
      <Provider store={store}>
        <TransactionTracker />
      </Provider>
    </>
  );
}
