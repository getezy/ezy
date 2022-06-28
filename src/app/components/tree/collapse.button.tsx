import { faAngleDown, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@nextui-org/react';
import React from 'react';

export type CollapseButtonProps = {
  isOpen: boolean;

  onClick: (isOpen: boolean) => void;
};

export const CollapseButton: React.FC<CollapseButtonProps> = ({ isOpen, onClick }) => (
  <Button
    auto
    light
    size="xs"
    animated={false}
    css={{
      padding: 0,
      margin: 0,
      minWidth: 10,
      marginLeft: 'auto',
      '&:hover': {
        color: '$warning',
        backgroundColor: '$accents0',
      },
    }}
    icon={<FontAwesomeIcon icon={isOpen ? faAngleDown : faAngleLeft} />}
    onClick={() => onClick(!isOpen)}
  />
);
