import React, { useRef, useCallback } from 'react';
import { Row } from '../reducers/transaction';
import styled from 'styled-components';
import { Tag } from './tag';

type Props = {
  transaction: Row;
  className?: string;
};

const View = (props: Props) => {
  const imgSrc = `https://gd.mlb.com/images/gameday/mugshots/mlb/${
    props.transaction.player_id
  }@2x.jpg`;
  const imgWrapRef = useRef<HTMLDivElement>(null);

  const handleImgError = useCallback(() => {
    if (imgWrapRef) {
      if (imgWrapRef.current) {
        imgWrapRef.current.style.visibility = 'hidden';
      }
    }
  }, []);

  return (
    <div className={props.className}>
      <div ref={imgWrapRef}>
        <img
          style={{
            verticalAlign: 'middle',
            width: '60px',
            height: '60px',
            borderRadius: '50%'
          }}
          src={imgSrc}
          onError={handleImgError}
        />
      </div>

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

export const Transaction = styled(View)`
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
