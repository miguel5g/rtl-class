import { render as defaultRender } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

function render(element, route = '/') {
  const history = createMemoryHistory({ initialEntries: [route] });

  return {
    ...defaultRender(<Router history={history}>{element}</Router>),
    history,
  };
}

export default render;
