import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Container, Radio, Spacer, Text } from '@nextui-org/react';
import React from 'react';

import { Tree, TreeNode, TreeNodeRendererProps } from '../../../../../components';
import { TlsPreset } from '../../../../../storage';
import { SystemBadge } from './system.badge';

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
      <Container gap={0.5} fluid display="flex" alignItems="center" css={{ flex: 1 }}>
        {data.system && (
          <>
            <SystemBadge />
            <Spacer x={0.5} />
          </>
        )}
        <Text size={14}>{data.name}</Text>
      </Container>
    </Radio>
  );

  const commandsContent = (
    <Container gap={0} display="flex" css={{ marginLeft: 'auto' }}>
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
      <Button
        light
        size="xs"
        color="error"
        css={{
          minWidth: 10,
          color: '$accents9',
          '&:hover': {
            color: '$error',
            backgroundColor: '$accents0',
          },
        }}
        icon={<FontAwesomeIcon icon={faTrash} />}
      />
    </Container>
  );

  return (
    <TreeNode
      id={data.id}
      key={data.id}
      content={content}
      commandsContent={!data.system && commandsContent}
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

  onTlsPresetChange: (id: string) => void;
}

export const TlsPresetsList: React.FC<TlsPresetsListProps> = ({
  selectedTlsPresetId,
  presets,
  onTlsPresetChange,
}) => (
  <Container gap={0} fluid>
    <Radio.Group defaultValue={selectedTlsPresetId} onChange={onTlsPresetChange}>
      <Tree<TlsPreset> data={presets}>
        {presets.map((preset) => (
          <ReponseNode id={preset.id} key={preset.id} data={preset} />
        ))}
      </Tree>
    </Radio.Group>
  </Container>
);
