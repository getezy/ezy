import { Text } from '@nextui-org/react';
import React from 'react';

import { Tree, TreeNode, TreeNodeRendererProps } from '../../../../../components';
import { TlsPreset } from '../../../../../storage';

const ReponseNode: React.FC<TreeNodeRendererProps<TlsPreset>> = ({
  data,
  isOpen,
  onCollapseToggle,
}) => {
  const content = <Text size={14}>{data.name}</Text>;

  return (
    <TreeNode
      id={data.id}
      key={data.id}
      content={content}
      isOpen={isOpen}
      onCollapseToggle={onCollapseToggle}
    />
  );
};

export interface TlsPresetsListProps {
  presets: TlsPreset[];
}

export const TlsPresetsList: React.FC<TlsPresetsListProps> = ({ presets }) => (
  <Tree<TlsPreset> data={presets}>
    {presets.map((preset) => (
      <ReponseNode id={preset.id} key={preset.id} data={preset} />
    ))}
  </Tree>
);
