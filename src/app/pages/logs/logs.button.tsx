import { faListSquares } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, ButtonProps, styled } from '@nextui-org/react';
import React from 'react';

export type LogsButtonProps = ButtonProps & {
  badgeVisible: boolean;
};

const Badge = styled('span', {
  position: 'absolute',
  left: 25,
  top: 17,
  backgroundColor: '$error',
  br: '$rounded',
  width: 7,
  height: 7,
  zIndex: 2,
});

export const LogsButton: React.FC<LogsButtonProps> = ({ badgeVisible, ...props }) => (
  <div>
    <Button
      auto
      light
      size="xs"
      color="default"
      animated={false}
      css={{
        marginLeft: 10,
        minWidth: 10,
        color: '$accents9',
        '&:hover': {
          color: '$warning',
          backgroundColor: '$accents1',
        },
      }}
      iconLeftCss={{ zIndex: 1 }}
      icon={<FontAwesomeIcon size="sm" icon={faListSquares} />}
      {...props}
    />
    {badgeVisible && <Badge />}
  </div>
);
