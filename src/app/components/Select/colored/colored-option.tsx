import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { styled, VariantProps } from '@nextui-org/react';
import React from 'react';
import { components, OptionProps } from 'react-select';

import { Environment } from '../../../storage';
import { ColorCircle } from '../../color-circle';

const StyledSpan = styled('span', {
  display: 'flex',
  flexWrap: 'nowrap',
  alignItems: 'center',
  gap: 10,
  userSelect: 'none',
  font: 'inherit',
  fontSize: '$$selectFontSize',

  variants: {
    size: {
      xs: {
        $$selectFontSize: '$fontSizes$xs',
      },
      sm: {
        $$selectFontSize: '$fontSizes$xs',
      },
      md: {
        $$selectFontSize: '$fontSizes$xs',
      },
      lg: {
        $$selectFontSize: '$fontSizes$base',
      },
      xl: {
        $$selectFontSize: '$fontSizes$sm',
      },
    },
  },
});

const RemoveButton = styled('div', {
  display: 'flex',
  alignItems: 'center',
  alignContent: 'center',
  justifyContent: 'center',

  backgroundColor: '$error',
  width: 20,
  borderRadius: 5,
  color: '$text',
  height: 20,

  '&:hover': {
    backgroundColor: '$red500',
  },
});

export type ColoredOptionProps = OptionProps<Environment> & {
  selectProps: VariantProps<typeof StyledSpan> & {
    onRemove: (item: Environment) => void;
  };
};

export const ColoredOption: React.FC<ColoredOptionProps> = ({ children, innerProps, ...props }) => {
  const { selectProps, data } = props;
  const { onRemove } = selectProps;

  return (
    <components.Option {...props} innerProps={innerProps}>
      <StyledSpan size={selectProps.size}>
        <ColorCircle size={selectProps.size} color={data.color} />
        <span style={{ overflow: 'hidden' }}>{data.label}</span>
        <div style={{ marginLeft: 'auto', height: 20 }}>
          {props.isFocused && (
            <RemoveButton
              onClick={(e) => {
                onRemove(data);
                e.stopPropagation();
              }}
            >
              <FontAwesomeIcon icon={faTrash} size="sm" />
            </RemoveButton>
          )}
        </div>
      </StyledSpan>
    </components.Option>
  );
};
