import React from 'react'
import { Row } from './useTransactions'
import Transaction from './transaction'

type Props = {
  transaction: Row
  isLoaded: boolean
  error: any
}

export default React.memo((props: Props) => {
  if (props.error) {
    return <div>Error !</div>
  }

  return props.isLoaded ? (
    <Transaction transaction={props.transaction} />
  ) : (
    <div>Loading</div>
  )
})
