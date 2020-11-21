import React from 'react';
import 'src/components/organisms/header/navbar/components/style.css';

const STYLES = [
  'link-btn--primary',
  'link-btn--outline',
];

const SIZES = [
  'link-btn--medium',
  'link-btn--large',
];

function Button({
  children, onClick, style, size,
}) {
  const bSize = SIZES.includes(size) ? size : SIZES[0];
  const bStyle = STYLES.includes(style) ? style : STYLES[0];
  return (
    <button className={`link-btn ${bStyle} ${bSize}`} onClick={onClick} type="button">
      {children}
    </button>
  );
}

export { Button };
