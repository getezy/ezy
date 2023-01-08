import { Badge, Container, Row, Spacer } from '@nextui-org/react';
import React from 'react';

import { CodeEditor, CopyToClipboardButton, TreeNode, TreeNodeRendererProps } from '@components';
import { GrpcStreamMessage } from '@storage';

import { StreamIcons, StreamMessageTypeText } from './stream-icons';

export const ReponseNode: React.FC<TreeNodeRendererProps<GrpcStreamMessage>> = ({
  data,
  isOpen,
  onCollapseToggle,
}) => {
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

  const commandsContent = <CopyToClipboardButton content={data.value || ''} placement="left" />;

  return (
    <TreeNode
      id={data.id}
      key={data.id}
      content={content}
      commandsContent={data.value && commandsContent}
      isOpen={isOpen}
      onCollapseToggle={onCollapseToggle}
      defaultPadding={false}
      css={{
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 5,
      }}
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
