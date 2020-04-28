import React from 'react';
import styled from 'styled-components';
import { Image } from './image';

type Props = {
  imgRef: React.RefObject<HTMLImageElement>;
  imgSrc: string;
  handleImgError: () => void;
  className?: string;
};

const View: React.FC<Props> = props => (
  <div className={props.className}>
    <Image
      imgRef={props.imgRef}
      src={props.imgSrc}
      handleImgError={props.handleImgError}
    />
  </div>
);

export const PlayerIcon = styled(View)`
  width: 80px;
`;
