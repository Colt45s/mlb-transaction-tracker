import React from 'react';
import styled from 'styled-components';

type Props = {
  imgRef: React.RefObject<HTMLImageElement>;
  src: string;
  alt?: string;
  handleImgError: () => void;
  className?: string;
};

const View: React.FC<Props> = props => (
  <img
    ref={props.imgRef}
    src={props.src}
    onError={props.handleImgError}
    className={props.className}
  />
);

export const Image = styled(View)`
  width: 100%;
  height: auto;
  vertical-align: middle;
`;
