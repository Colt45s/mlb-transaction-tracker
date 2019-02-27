import React from 'react'
import { render, cleanup } from 'react-testing-library'
import 'jest-dom/extend-expect'

import Transaction from '../src/components/transaction'

afterEach(cleanup)

test('snapshot props', () => {
  const props = {
    transaction: {
      player: 'test',
      team: 'hou',
      note: 'test',
      from_team: 'astros',
      type: '',
      type_cd: ''
    }
  }

  const { asFragment } = render(<Transaction {...props} />)

  expect(asFragment()).toMatchSnapshot()
})
