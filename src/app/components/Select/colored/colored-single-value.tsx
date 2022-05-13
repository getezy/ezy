import React from 'react';
import { SingleValueProps } from 'react-select';

import { ColorCircle } from '../../color-circle';

export const ColoredSingleValue: React.FC<SingleValueProps> = ({ data }) => (
  <div>
    <ColorCircle color={(data as { color: string }).color} />
  </div>
);
