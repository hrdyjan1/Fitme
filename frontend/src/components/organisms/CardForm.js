import React from 'react';
import { Card } from '@material-ui/core';

function CardForm({ header, children }) {
  return (
    <Card>
      <div className="card-form__header">{header}</div>
      <div className="card-form__content">{children}</div>
    </Card>
  );
}

export { CardForm };
