import React, { useRef, useCallback, useMemo } from 'react';
import { pickColorByCodeType } from '../../utils/color';
import { Row } from '../transactionTracker';
import { PlayerIcon } from '../PlayerIcon';
import { TransactionDetail } from '../TransactionDetail';

type Props = {
  transaction: Row;
  className?: string;
};

export function Transaction(props: Props) {
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
    <>
      <PlayerIcon
        imgRef={imgRef}
        imgSrc={imgSrc}
        handleImgError={handleImgError}
      />
      <TransactionDetail transaction={props.transaction} tagColor={tagColor} />
    </>
  );
}
