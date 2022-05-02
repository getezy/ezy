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
  userSelect: 'none',
  '&:focus': {
    outline: 'none',
  },

  variants: {
    active: {
      true: {
        background: '$accents2',
      },
      false: {
        background: '$accents1',
      },
    },
  },
});

export interface TabProps {
  id: string;

  title: string;

  active: boolean;

  closable?: boolean;

  disabled?: boolean;
}

const Tab: React.FC<TabProps> = ({
  id,
  title,
  active = false,
  closable = false,
  disabled = false,
}) => (
  // @ts-ignore
  <StyledTab key={id} disabled={disabled} active={active}>
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
