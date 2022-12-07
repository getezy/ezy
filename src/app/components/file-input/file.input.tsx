import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Input, InputProps, NormalColors, Spacer, Text } from '@nextui-org/react';
import React from 'react';

import { EzyButton } from '@components';

export type FileInputProps = Partial<Omit<InputProps, 'type' | 'value' | 'onChange'>> & {
  buttonColor?: NormalColors;
  value?: string | null | undefined;

  onChange: (path: string | undefined) => void;
};

export const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ accept, buttonColor, onChange, value, readOnly, label, ...props }, ref) => {
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

    return (
      <Input
        ref={ref}
        value={inputValue || ''}
        clearable={!readOnly}
        readOnly
        onClearClick={() => onChange(undefined)}
        // @ts-ignore
        label={
          <Container gap={0} display="flex" wrap="nowrap" alignItems="center">
            <Text size={12} css={{ letterSpacing: 'unset', fontFamily: '$sans' }}>
              {label}
            </Text>
            <Spacer x={0.5} />
            <EzyButton
              size="xs"
              bordered
              borderWeight="light"
              disabled={readOnly}
              icon={<FontAwesomeIcon size="sm" icon={faPlus} />}
              css={{ minWidth: 10, color: '$accents8', borderColor: '$accents3' }}
              onClick={handleDialogOpenButtonClick}
            />
          </Container>
        }
        css={{
          '.nextui-input': {
            cursor: 'default',
          },
          '.nextui-input-clear-button': {
            cursor: 'pointer',
          },
        }}
        {...props}
      />
    );
  }
);
