import React from 'react';
import styled from 'styled-components';
import { Text } from './text';
import { Row } from '../transactionTracker';
import { Tag } from './tag';
import { RightAlign } from '../RightAlign';
import { Header } from './header';

type Props = {
  className?: string;
  transaction: Row;
  tagColor: string;
};

const View: React.FC<Props> = React.memo(props => (
  <div className={props.className}>
    <Header>
      <Text fontSize="2rem" color="#666666">
        {props.transaction.from_team}
      </Text>
      <RightAlign>
        <Tag type={props.transaction.type} color={props.tagColor} />
      </RightAlign>
    </Header>
    <Text fontSize="2.5rem">{props.transaction.player}</Text>
    <Text fontSize="1.6rem" color="#666666">
      {props.transaction.note}
    </Text>
  </div>
));

export const TransactionDetail = styled(View)`
  width: 100%;
`;
