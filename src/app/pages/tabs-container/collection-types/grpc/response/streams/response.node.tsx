import { CodeEditor, TreeNode, TreeNodeRendererProps } from '@components';
import { faClone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge, Button, Container, Row, Spacer } from '@nextui-org/react';
import React from 'react';
import { useCopyToClipboard } from 'react-use';

import { GrpcStreamMessage } from '../../../../../../storage';
import { StreamIcons, StreamMessageTypeText } from './stream-icons';

export const ReponseNode: React.FC<TreeNodeRendererProps<GrpcStreamMessage>> = ({
  data,
  isOpen,
  onCollapseToggle,
}) => {
  const [, copyToClipboard] = useCopyToClipboard();

  const handleCopyButtonClick = () => copyToClipboard(data.value || '');

  const content = (
    <Container gap={0} fluid css={{ overflow: 'hidden' }}>
      <Row gap={1} align="center" wrap="nowrap" css={{ whiteSpace: 'nowrap', userSelect: 'none' }}>
        {StreamIcons[data.type]}
        <Spacer x={0.5} />
        <Badge size="xs" variant="flat" isSquared css={{ border: 0 }}>
          {new Date(data.timestamp).toLocaleTimeString()}
        </Badge>
        <Spacer x={0.5} />
        {StreamMessageTypeText[data.type]}
      </Row>
    </Container>
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
