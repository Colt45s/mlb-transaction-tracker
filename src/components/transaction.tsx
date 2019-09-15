import React from 'react';
import { Row } from './useTransactions';
import styled from 'styled-components';
import Tag from './tag';

type Props = {
  transaction: Row;
  className?: string;
};

const View = (props: Props) => {
  const imgSrc = `https://gd.mlb.com/images/gameday/mugshots/mlb/${
    props.transaction.player_id
  }@2x.jpg`;

  return (
    <div className={props.className}>
      <img
        style={{
          verticalAlign: 'middle',
          width: '60px',
          height: '60px',
          borderRadius: '50%'
        }}
        src={imgSrc}
      />

      <div className="contents">
        <h3>{props.transaction.player}</h3>
        <Tag code={props.transaction.type_cd} type={props.transaction.type} />
        <p>From : {props.transaction.from_team || '---'}</p>
        <p>To : {props.transaction.team}</p>
        <p>{props.transaction.note}</p>
      </div>
    </div>
  );
};

export default styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;

  > .contents {
    padding: 0.5rem;
  }

  > .contents p {
    font-size: 0.8rem;
  }
`;
