// eslint-disable-next-line simple-import-sort/imports
import { styled } from '@nextui-org/react';
import React from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-twilight';

// @ts-ignore
const StyledAceEditor = styled(AceEditor);

export const Editor: React.FC = () => (
  <StyledAceEditor
    mode="json"
    theme="twilight"
    name="UNIQUE_ID_OF_DIV"
    editorProps={{ $blockScrolling: true }}
    setOptions={{
      tabSize: 2,

      useWorker: true,
      displayIndentGuides: true,
    }}
  />
);
