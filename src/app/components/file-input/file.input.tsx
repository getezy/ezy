import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Input, InputProps, NormalColors, styled } from '@nextui-org/react';
import React from 'react';

const StyledFileInput = styled('input', {
  display: 'none',
});

export type FileInputProps = Partial<Omit<InputProps, 'type' | 'value' | 'onChange'>> & {
  buttonColor?: NormalColors;
  value?: string;

  onChange: (path: string) => void;
};

export const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ accept, buttonColor, value, onChange = () => {}, ...props }, ref) => {
    const [inputValue, setInputValue] = React.useState(value);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleClick = () => {
      inputRef?.current?.click();
    };

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
      const path = (event.target.files || [])[0]?.path || '';
      setInputValue(path);
      onChange(path);
    };

    return (
      <>
        <Input
          {...props}
          ref={ref}
          contentRightStyling={false}
          value={inputValue}
          contentRight={
            <Button
              light
              size="xs"
              color={buttonColor}
              icon={<FontAwesomeIcon icon={faEllipsis} />}
              css={{ minWidth: 24, margin: '0 10px' }}
              onClick={handleClick}
            />
          }
        />
        <StyledFileInput ref={inputRef} type="file" accept={accept} onChange={handleChange} />
      </>
    );
  }
);
