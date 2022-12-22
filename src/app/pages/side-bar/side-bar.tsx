import { faCog, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Tooltip } from '@nextui-org/react';
import React from 'react';

import { EzyButton, EzyIcon, Kbd, Menu } from '@components';
import { AppContext } from '@context';
import { useSettingsStore } from '@new-storage';

import { CreateCollectionModal } from '../collections';
import { UpdateSettingsModal } from '../settings';
import { CollectionsTree } from './collections-tree';

export const SideBar: React.FC = () => {
  const context = React.useContext(AppContext);
  const { menu, setMenu } = useSettingsStore((store) => store);

  const [updateSettingsModalVisible, setUpdateSettingsModalVisible] = React.useState(false);

  const handleMenuCollapse = (collapsed: boolean) => {
    setMenu({ collapsed });
  };

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
        preventClose
        closeButton
        open={context?.modal.createCollectionModalVisible}
        onClose={() => context?.modal.setCreateCollectionModalVisible(false)}
      />
    </Container>
  );

  const commandBarShortcut =
    context?.platform.os === 'darwin' ? (
      <Kbd key="⌘+K" size="xs">
        ⌘+K
      </Kbd>
    ) : (
      <Kbd key="Ctrl+K" size="xs">
        Ctrl+K
      </Kbd>
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
      {commandBarShortcut}
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
          id: 'Collections',
          icon: <EzyIcon />,
          submenu: collections,
        },
      ]}
      top={top}
      bottom={bottom}
      isCollapsed={menu.collapsed}
      onCollapseChange={handleMenuCollapse}
    />
  );
};
