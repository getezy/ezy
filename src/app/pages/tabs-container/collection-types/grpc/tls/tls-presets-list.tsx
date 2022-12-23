import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Container, Radio, Spacer, styled, Text } from '@nextui-org/react';
import React from 'react';

import { Tree, TreeNode, TreeNodeRendererProps } from '@components';
import { GrpcTlsType } from '@core/types';
import { TlsPreset } from '@database/types';
import { useTlsPresetsStore } from '@new-storage';

import { SystemBadge } from './system.badge';

const TreeWrapper = styled('div', {
  overflow: 'auto',
});

const ReponseNode: React.FC<
  TreeNodeRendererProps<TlsPreset> & { onTlsPresetRemove: (id: string) => void }
> = ({ data, isOpen, onCollapseToggle, onTlsPresetRemove }) => {
  const { removeTlsPreset } = useTlsPresetsStore((store) => store);

  const handleRemoveButtonClick = () => {
    removeTlsPreset(data.id);
    onTlsPresetRemove(data.id);
  };

  const content = (
    <Radio
      value={data.id}
      size="xs"
      color={data.tls.type === GrpcTlsType.INSECURE ? 'error' : 'success'}
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
      onClick={handleRemoveButtonClick}
    />
  );

  return (
    <TreeNode
      id={data.id}
      key={data.id}
      content={content}
      isComandsHoverable={false}
      commandsContent={!data.system && commandsContent}
      isOpen={isOpen}
      onCollapseToggle={onCollapseToggle}
      defaultPadding={false}
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
  onTlsPresetRemove: (id: string) => void;
}

export const TlsPresetsList: React.FC<TlsPresetsListProps> = ({
  selectedTlsPresetId,
  presets,
  onTlsPresetChange,
  onTlsPresetRemove,
}) => (
  <TreeWrapper>
    <Radio.Group
      aria-label="tls-preset-radio"
      onChange={onTlsPresetChange}
      value={selectedTlsPresetId || 'none'}
    >
      <Tree<TlsPreset> data={presets}>
        {presets.map((preset) => (
          <ReponseNode
            id={preset.id}
            key={preset.id}
            data={preset}
            onTlsPresetRemove={onTlsPresetRemove}
          />
        ))}
      </Tree>
    </Radio.Group>
  </TreeWrapper>
);
