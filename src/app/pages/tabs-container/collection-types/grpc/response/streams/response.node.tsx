import { faClone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Spacer, styled } from '@nextui-org/react';
import React from 'react';
import { useCopyToClipboard } from 'react-use';

import { CodeEditor, TreeNode, TreeNodeRendererProps } from '../../../../../../components';
import { GrpcStreamMessage } from '../../../../../../storage';
import { StreamIcons, StreamMessageTypeText } from './stream-icons';

const ContentWrapper = styled('div', {
  display: 'flex',
  flexWrap: 'nowrap',
  flex: 1,

  paddingLeft: 5,
  marginRight: 10,

  overflow: 'hidden',
  userSelect: 'none',
});

export const ReponseNode: React.FC<TreeNodeRendererProps<GrpcStreamMessage>> = ({
  data,
  isOpen,
  onCollapseToggle,
}) => {
  const [, copyToClipboard] = useCopyToClipboard();

  const handleCopyButtonClick = () => copyToClipboard(data.value || '');

  const content = (
    <ContentWrapper>
      {StreamIcons[data.type]}
      <Spacer x={0.5} />
      {StreamMessageTypeText[data.type]}
    </ContentWrapper>
  );

  const commandsContent = (
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
  );

  return (
    <TreeNode
      id={data.id}
      key={data.id}
      content={content}
      commandsContent={data.value && commandsContent}
      isOpen={isOpen}
      onCollapseToggle={onCollapseToggle}
      defaultPadding
    >
      {data.value && (
        <CodeEditor
          maxHeight="250px"
          maxWidth="100%"
          width="100%"
          readOnly
          value={data.value}
          basicSetup={{ highlightActiveLine: false, highlightActiveLineGutter: false }}
        />
      )}
    </TreeNode>
  );
};
