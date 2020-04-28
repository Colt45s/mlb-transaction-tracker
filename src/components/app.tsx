import React, { Suspense } from 'react';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const TransactionTracker = React.lazy(() => import('./transactionTracker'));

const GlobalStyle = createGlobalStyle`
  ${reset}
  @import url('https://fonts.googleapis.com/css?family=Baloo+Paaji+2&display=swap');
  html {
    font-size: 62.5%;
  }
  body {
    line-height: 1.5;
    font-size: 1.4rem;
    font-family: 'Baloo Paaji 2', cursive;
    background-color: #f8f8f8;
  }
`;

export function App() {
  return (
    <>
      <GlobalStyle />
      <Suspense fallback={null}>
        <TransactionTracker />
      </Suspense>
    </>
  );
}
