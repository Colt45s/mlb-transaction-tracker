import React from 'react'
import { render, cleanup } from 'react-testing-library'
import 'jest-dom/extend-expect'

import Transaction from '../src/components/transaction'
import { Row } from '../src/components/useTransactions'

afterEach(cleanup)

test('snapshot props', () => {
  const props: { transaction: Row } = {
    transaction: {
      player: 'test',
      team: 'hou',
      note: 'test',
      from_team: 'astros',
      type: '',
      type_cd: 'RET'
    }
  }

  const { asFragment } = render(<Transaction {...props} />)

  expect(asFragment()).toMatchSnapshot()
})
