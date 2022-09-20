import { EzyButton, EzyIcon, Menu } from '@components';
import { faCog, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Tooltip } from '@nextui-org/react';
import { useSettingsStore } from '@storage';
import React from 'react';

import { AppContext } from '../../context';
import { CreateCollectionModal } from '../collections';
import { UpdateSettingsModal } from '../settings';
import { CollectionsTree } from './collections-tree';

export const SideBar: React.FC = () => {
  const context = React.useContext(AppContext);
  const { isMenuCollapsed, setIsMenuCollapsed } = useSettingsStore((store) => store);

  const [updateSettingsModalVisible, setUpdateSettingsModalVisible] = React.useState(false);

  const top = (
    <Container gap={0} display="flex" justify="center" alignItems="center" css={{ padding: 10 }}>
      <Tooltip content="Create collection" placement="right" enterDelay={500}>
        <EzyButton
          auto
          size="sm"
          light
          icon={<FontAwesomeIcon icon={faPlus} />}
          onClick={() => context?.modal.setCreateCollectionModalVisible(true)}
        />
      </Tooltip>
      <CreateCollectionModal
        fullScreen
        closeButton
        open={context?.modal.createCollectionModalVisible}
        onClose={() => context?.modal.setCreateCollectionModalVisible(false)}
      />
    </Container>
  );

  const bottom = (
    <Container gap={0} display="flex" justify="center" alignItems="center" css={{ padding: 10 }}>
      <Tooltip content="Settings" placement="right" enterDelay={500}>
        <EzyButton
          auto
          size="sm"
          light
          icon={<FontAwesomeIcon icon={faCog} />}
          onClick={() => setUpdateSettingsModalVisible(true)}
        />
      </Tooltip>
      <UpdateSettingsModal
        closeButton
        blur
        open={updateSettingsModalVisible}
        onClose={() => setUpdateSettingsModalVisible(false)}
      />
    </Container>
  );

  const collections = <CollectionsTree />;

  return (
    <Menu
      items={[
        {
          key: 'Collections',
          icon: <EzyIcon />,
          submenu: collections,
        },
      ]}
      top={top}
      bottom={bottom}
      isCollapsed={isMenuCollapsed}
      onCollapseChange={setIsMenuCollapsed}
    />
  );
};
