import { faCircleXmark, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Input, InputProps, NormalColors, styled } from '@nextui-org/react';
import React from 'react';

export type FileInputProps = Partial<Omit<InputProps, 'type' | 'value' | 'onChange'>> & {
  buttonColor?: NormalColors;
  value?: string | null | undefined;

  onChange: (path: string | undefined) => void;
};

const CommandsWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
});

export const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ accept, buttonColor, onChange, value, readOnly = false, ...props }, ref) => {
    const [inputValue, setInputValue] = React.useState(value);

    React.useEffect(() => {
      setInputValue(value);
    }, [value]);

    const handleDialogOpenButtonClick = async () => {
      const paths = await window.electronDialog.open({ properties: ['openFile'] });

      if (Array.isArray(paths) && paths.length) {
        setInputValue(paths[0]);
        onChange(paths[0]);
      }
    };

    const handleClearButtonClick = () => {
      setInputValue(undefined);
      onChange(undefined);
    };

    return (
      <Input
        ref={ref}
        contentRightStyling={false}
        value={inputValue || ''}
        readOnly
        contentRight={
          !readOnly && (
            <CommandsWrapper>
              {inputValue && inputValue.length > 0 && (
                <Button
                  light
                  size="xs"
                  icon={<FontAwesomeIcon icon={faCircleXmark} />}
                  css={{ minWidth: 10, color: '$accents6', '&:hover': { color: '$accents5' } }}
                  onClick={handleClearButtonClick}
                />
              )}
              <Button
                light
                size="xs"
                color={buttonColor}
                icon={<FontAwesomeIcon icon={faEllipsis} />}
                css={{ minWidth: 24, margin: '0 10px 0 0', '&:hover': { color: '$accents5' } }}
                onClick={handleDialogOpenButtonClick}
              />
            </CommandsWrapper>
          )
        }
        {...props}
      />
    );
  }
);
