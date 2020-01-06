import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/app';

const render = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
};

if ((module as any).hot) {
  (module as any).hot.accept(() => {
    render();
  });
}

render();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });

  window.addEventListener('fetch', () => {});
}
