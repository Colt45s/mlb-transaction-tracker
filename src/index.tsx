import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/index';

const render = () => {
  ReactDOM.render(<Root />, document.getElementById('root'));
};

if ((module as any).hot) {
  (module as any).hot.accept(() => {
    render();
  });
}

render();
