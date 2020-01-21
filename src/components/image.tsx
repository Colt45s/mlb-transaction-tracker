import React from 'react';

type Props = {
  imgRef: React.RefObject<HTMLImageElement>;
  src: string;
  alt?: string;
  style?: React.CSSProperties;
  handleImgError: () => void;
};

export const Image = React.memo((props: Props) => (
  <img
    ref={props.imgRef}
    style={props.style}
    src={props.src}
    onError={props.handleImgError}
  />
));
