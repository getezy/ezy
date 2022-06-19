import { nanoid } from 'nanoid';
import React from 'react';

import { CodeEditor, Tab, Tabs } from '../../../components';

const data = [
  {
    title: 'Response',
    tabKey: nanoid(),
    key: nanoid(),
  },
];

export const Response: React.FC = () => {
  const tabs = data.map((tab) => (
    <Tab title={tab.title} id={tab.tabKey} key={tab.key}>
      <CodeEditor maxHeight="calc(100vh - 150px)" maxWidth="100%" />
    </Tab>
  ));

  return (
    // for horizontal alignment height: 100%
    <div style={{ borderLeft: 'solid 1px $accents2', width: '100%' }}>
      <Tabs activeKey={tabs[0].props.id} activeBar={{ color: 'secondary' }}>
        {tabs}
      </Tabs>
    </div>
  );
};
