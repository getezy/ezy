import { faFill } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Spacer, styled } from '@nextui-org/react';
import React from 'react';

import { ColorCircle } from '../color-circle';
import { ColorPicker } from './color-picker';

const StyledWrapper = styled('div', {
  display: 'flex',
  flexWrap: 'nowrap',
  alignItems: 'center',
});

export interface ColorPickerInputProps {
  value: string;

  onChange: (color: string) => void;
}

export const ColorPickerInput: React.FC<ColorPickerInputProps> = ({ value, onChange }) => {
  const [colorPickerVisible, setColorPickerVisible] = React.useState(false);

  return (
    <StyledWrapper>
      <ColorCircle size="md" color={value} shadow />
      <Spacer x={0.25} />
      <ColorPicker
        trigger={
          <Button light size="sm" icon={<FontAwesomeIcon icon={faFill} />} css={{ minWidth: 10 }} />
        }
        isOpen={colorPickerVisible}
        onOpenChange={(isVisible) => setColorPickerVisible(isVisible)}
        color={value}
        onColorChange={(newColor) => onChange(newColor.hex)}
      />
    </StyledWrapper>
  );
};
