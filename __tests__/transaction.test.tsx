import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Transaction } from '../src/components/Transaction';
import { Row } from '../src/components/transactionTracker';

afterEach(cleanup);

test('snapshot props', () => {
  const props: { transaction: Row } = {
    transaction: {
      player_id: '',
      player: 'test',
      team: 'hou',
      note: 'test',
      from_team: 'astros',
      type: '',
      type_cd: 'RET'
    }
  };

  const { asFragment } = render(<Transaction {...props} />);

  expect(asFragment()).toMatchSnapshot();
});
