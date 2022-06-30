import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Input, InputProps, SimpleColors, styled } from '@nextui-org/react';
import React from 'react';

const StyledFileInput = styled('input', {
  display: 'none',
});

export type FileInputProps = Partial<Omit<InputProps, 'type'>> & {
  buttonColor?: SimpleColors;
};

export const FileInput: React.FC<FileInputProps> = ({ accept, buttonColor, ...props }) => {
  const [value, setValue] = React.useState<string>();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef?.current?.click();
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue((event.target.files || [])[0]?.path);
  };

  return (
    <>
      <Input
        {...props}
        contentRightStyling={false}
        value={value}
        contentRight={
          <Button
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
};
