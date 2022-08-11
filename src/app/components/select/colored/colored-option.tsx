import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { styled, VariantProps } from '@nextui-org/react';
import React from 'react';
import { components, OptionProps } from 'react-select';

import { ColorCircle } from '../../color-circle';
import { ColoredSelectOption } from './interfaces';

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

  borderRadius: '$squared',
  width: 24,
  height: 24,
  color: '$accents9',

  '&:hover': {
    color: '$error',
    backgroundColor: '$accents0',
  },
});

export type ColoredOptionProps = OptionProps<ColoredSelectOption> & {
  selectProps: VariantProps<typeof StyledSpan> & {
    onRemove: (item: ColoredSelectOption) => void;
  };
};

export const ColoredOption: React.FC<ColoredOptionProps> = ({ children, innerProps, ...props }) => {
  const { selectProps, data } = props;
  const { onRemove } = selectProps;

  const handleRemoveButtonClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
    onRemove(data);
    event.stopPropagation();
  };

  return (
    <components.Option {...props} innerProps={innerProps}>
      <StyledSpan size={selectProps.size}>
        <ColorCircle size={selectProps.size} color={data.color} shadow />
        <span style={{ overflow: 'hidden' }}>{data.label}</span>
        <div style={{ marginLeft: 'auto', height: 24 }}>
          {props.isFocused && (
            <RemoveButton onClick={handleRemoveButtonClick}>
              <FontAwesomeIcon icon={faTrash} size="sm" />
            </RemoveButton>
          )}
        </div>
      </StyledSpan>
    </components.Option>
  );
};
