import React, { memo } from 'react'
import { Row } from './useTransactions'
import styled from 'styled-components'
import Tag from './tag'

type Props = {
  transaction: Row
  className?: string
}

const View = memo((props: Props) => (
  <div className={props.className}>
    <div className="contents">
      <h3>{props.transaction.player}</h3>
      <Tag code={props.transaction.type_cd} type={props.transaction.type} />
      <p>From : {props.transaction.from_team || '---'}</p>
      <p>To : {props.transaction.team}</p>
      <p>{props.transaction.note}</p>
    </div>
  </div>
))

export default styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;

  > .contents p {
    font-size: 0.8rem;
  }
`
