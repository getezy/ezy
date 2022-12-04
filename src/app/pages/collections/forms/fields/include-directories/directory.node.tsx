import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Container, Row, Text } from '@nextui-org/react';
import React from 'react';

import { TreeData, TreeNode, TreeNodeRendererProps } from '@components';

export type DirectoryNodeData = TreeData & {
  value: string;
};

export const DirectoryNode: React.FC<
  TreeNodeRendererProps<DirectoryNodeData> & { onDirectoryRemove: (id: string) => void }
> = ({ data, onDirectoryRemove }) => {
  const content = (
    <Container gap={0} fluid css={{ overflow: 'hidden' }}>
      <Row gap={1} align="center" wrap="nowrap" css={{ whiteSpace: 'nowrap', userSelect: 'none' }}>
        <Text size="$xs">{data.value}</Text>
      </Row>
    </Container>
  );

  const handleRemoveButtonClick = () => {
    onDirectoryRemove(data.id);
  };

  const commandsContent = (
    <Button
      light
      size="xs"
      color="error"
      css={{
        float: 'right',
        minWidth: 10,
        color: '$accents9',
        '&:hover': {
          color: '$error',
          backgroundColor: '$accents0',
        },
      }}
      icon={<FontAwesomeIcon icon={faTrash} />}
      onClick={handleRemoveButtonClick}
    />
  );

  return (
    <TreeNode
      id={data.id}
      key={data.id}
      content={content}
      commandsContent={commandsContent}
      defaultPadding
    />
  );
};
