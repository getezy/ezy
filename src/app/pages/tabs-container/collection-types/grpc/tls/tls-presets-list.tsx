import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Container, Radio, Text } from '@nextui-org/react';
import React from 'react';

import { Tree, TreeNode, TreeNodeRendererProps } from '../../../../../components';
import { TlsPreset } from '../../../../../storage';

const ReponseNode: React.FC<TreeNodeRendererProps<TlsPreset>> = ({
  data,
  isOpen,
  onCollapseToggle,
}) => {
  const content = (
    <Radio
      value={data.id}
      size="xs"
      color="success"
      isSquared
      css={{ justifyContent: 'center', flex: 1, paddingLeft: 10 }}
    >
      <Container gap={0.5} fluid css={{ flex: 1 }}>
        <Text size={14}>{data.name}</Text>
      </Container>
    </Radio>
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
      icon={<FontAwesomeIcon icon={faEdit} />}
    />
  );

  return (
    <TreeNode
      id={data.id}
      key={data.id}
      content={content}
      commandsContent={commandsContent}
      isOpen={isOpen}
      onCollapseToggle={onCollapseToggle}
      css={{
        height: 50,
        paddingRight: 5,
      }}
    />
  );
};

export interface TlsPresetsListProps {
  selectedTlsPresetId?: string;

  presets: TlsPreset[];
}

export const TlsPresetsList: React.FC<TlsPresetsListProps> = ({ selectedTlsPresetId, presets }) => (
  <Container gap={0} fluid css={{ overflow: 'auto' }}>
    <Radio.Group defaultValue={selectedTlsPresetId}>
      <Tree<TlsPreset> data={presets}>
        {presets.map((preset) => (
          <ReponseNode id={preset.id} key={preset.id} data={preset} />
        ))}
      </Tree>
    </Radio.Group>
  </Container>
);
