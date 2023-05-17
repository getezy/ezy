import { faCheck, faClone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Container, Placement, Spacer, Text, Tooltip, useTheme } from '@nextui-org/react';
import React from 'react';
import { useCopyToClipboard } from 'react-use';

export type CopyToClipboardButtonProps = {
  content: string;

  placement?: Placement;
};

export const CopyToClipboardButton: React.FC<CopyToClipboardButtonProps> = ({
  content,
  placement = 'top',
}) => {
  const { theme } = useTheme();
  const [, copyToClipboard] = useCopyToClipboard();
  const [isCopied, setIsCopied] = React.useState(false);

  const handleCopyButtonClick = () => {
    setIsCopied(true);
    copyToClipboard(content);
  };

  const handleTooltipVisibleChange = (visible: boolean) => {
    if (!visible && isCopied) {
      setIsCopied(false);
    }
  };

  const tooltipContent = isCopied ? (
    <Container
      display="flex"
      direction="row"
      justify="center"
      alignItems="center"
      gap={0}
      css={{ width: 70 }}
    >
      <FontAwesomeIcon
        icon={faCheck}
        color={theme?.colors.green700.value}
        // @ts-ignore
        flip
        style={{
          animationIterationCount: 1,
        }}
      />
      <Spacer x={0.3} />
      <Text size="$xs">Copied</Text>
    </Container>
  ) : (
    <Text size="$xs">Copy</Text>
  );

  return (
    <Tooltip
      rounded
      animated={false}
      placement={placement}
      content={tooltipContent}
      trigger="hover"
      onVisibleChange={handleTooltipVisibleChange}
      css={{ zIndex: 9999 }}
    >
      <Button
        light
        size="xs"
        color="warning"
        css={{
          minWidth: 10,
          color: '$accents9',
          '&:hover': {
            color: '$warning',
            backgroundColor: '$accents0',
          },
        }}
        icon={<FontAwesomeIcon icon={faClone} />}
        onClick={handleCopyButtonClick}
      />
    </Tooltip>
  );
};
