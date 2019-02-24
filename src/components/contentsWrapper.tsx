import React, { CSSProperties } from 'react'
import { Row } from './useTransactions'
import Content from './content'
import styled from 'styled-components'

type Props = {
  style: CSSProperties
  transaction: Row
  isLoaded: boolean
  error: any
  className?: string
}

const View = React.memo((props: Props) => (
  <div style={props.style} className={props.className}>
    <div>
      <Content
        transaction={props.transaction}
        isLoaded={props.isLoaded}
        error={props.error}
      />
    </div>
  </div>
))

export default styled(View)`
  border-bottom: 1px solid #eee;

  > * {
    padding: 0.5em;
  }
`
