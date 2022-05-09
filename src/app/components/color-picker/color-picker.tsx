import { Popover, styled } from '@nextui-org/react';
import React from 'react';
import { ChromePicker, ColorChangeHandler } from 'react-color';

const StyledChromePicker = styled(ChromePicker);

export interface ColorPickerProps {
  trigger: React.ReactNode;

  color: string;

  isOpen: boolean;

  onOpenChange: (isOpen: boolean) => void;
  onColorChange: ColorChangeHandler;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  isOpen,
  trigger,
  color,
  onColorChange,
  onOpenChange,
}) => (
  <Popover isOpen={isOpen} onOpenChange={onOpenChange} placement="right">
    <Popover.Trigger>{trigger}</Popover.Trigger>
    <Popover.Content>
      <StyledChromePicker color={color} onChange={onColorChange} disableAlpha />
    </Popover.Content>
  </Popover>
);
