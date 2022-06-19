import { nanoid } from 'nanoid';
import React from 'react';

import { CodeEditor, Tab, Tabs } from '../../../components';
// import { useTabsStore } from '../../../storage';

const data = [
  {
    title: 'Request',
    tabKey: nanoid(),
    key: nanoid(),
  },
  {
    title: 'Metadata',
    tabKey: nanoid(),
    key: nanoid(),
  },
];

export const Request: React.FC = () => {
  // const { updateTab } = useTabsStore((store) => store);

  const tabs = data.map((tab) => (
    <Tab title={tab.title} id={tab.tabKey} key={tab.key}>
      <CodeEditor maxHeight="calc(100vh - 150px)" maxWidth="100%" />
    </Tab>
  ));

  return (
    // for horizontal alignment height: 100%
    <div style={{ width: '100%' }}>
      <Tabs activeKey={tabs[0].props.id} activeBar={{ color: 'secondary' }}>
        {tabs}
      </Tabs>
    </div>
  );
};
