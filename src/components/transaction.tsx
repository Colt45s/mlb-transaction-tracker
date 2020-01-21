import React, { useRef, useCallback, useMemo } from 'react';
import { Row } from '../reducers/transaction';
import styled from 'styled-components';
import { Tag } from './tag';
import { Image } from './image';
import { pickColorByCodeType } from '../utils/color';

type Props = {
  transaction: Row;
  className?: string;
};

const View = (props: Props) => {
  const imgSrc = useMemo(
    () =>
      `https://content.mlb.com/images/headshots/current/60x60/${props.transaction.player_id}@2x.png`,
    [props.transaction.player_id]
  );

  const imgRef = useRef<HTMLImageElement>(null);

  const handleImgError = useCallback(() => {
    if (imgRef) {
      if (imgRef.current) {
        imgRef.current.src =
          'https://content.mlb.com/images/headshots/current/60x60/generic@2x.png';
      }
    }
  }, []);

  const tagColor = useMemo(
    () => pickColorByCodeType(props.transaction.type_cd) || '#343a40',
    [props.transaction.type_cd]
  );

  return (
    <div className={props.className}>
      <div>
        <Image
          imgRef={imgRef}
          style={{
            width: '80px',
            height: 'auto',
            verticalAlign: 'middle'
          }}
          src={imgSrc}
          handleImgError={handleImgError}
        />
      </div>

      <div className="contents">
        <h3>{props.transaction.player}</h3>
        <Tag type={props.transaction.type} color={tagColor} />
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

  > * {
    padding: 0.5rem;
  }

  > .contents p {
    font-size: 0.8rem;
  }
`;
