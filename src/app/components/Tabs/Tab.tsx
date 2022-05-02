import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, styled } from '@nextui-org/react';
import React from 'react';
import { Tab as ReactTab } from 'react-tabs';

// @ts-ignore
const StyledTab = styled(ReactTab, {
  display: 'flex',
  paddingLeft: 10,
  paddingRight: 10,
  borderTopLeftRadius: 5,
  borderTopRightRadius: 5,
  border: 'solid $accents1 2px',
  background: '$accents2',
  userSelect: 'none',
  '&:focus': {
    outline: 'none',
  },
});

export interface TabProps {
  id: string;

  title: string;

  closable?: boolean;

  disabled?: boolean;
}

const Tab: React.FC<TabProps> = ({ id, title, closable = false, disabled = false }) => (
  <StyledTab key={id} disabled={disabled}>
    {title}
    {closable && (
      <Button
        auto
        light
        size="xs"
        animated={false}
        iconRight={<FontAwesomeIcon icon={faCircleXmark} />}
      />
    )}
  </StyledTab>
);

// @ts-ignore
Tab.tabsRole = 'Tab';

export { Tab };
