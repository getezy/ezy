import { ActionId, ActionImpl, KBarPortal, KBarResults, useMatches } from '@getezy/kbar';
import { Container } from '@nextui-org/react';
import React, { PropsWithChildren } from 'react';

import { Kbd } from '@components';

import {
  StyledActionWrapper,
  StyledGroupName,
  StyledKBarAnimator,
  StyledKBarPositioner,
  StyledKBarSearch,
  StyledResultItem,
  StyledShortcutWrapper,
} from './kbar.styled';

function makeOsRelatedShortcut(os: string, shortcut: string): string[] {
  const keys = shortcut.split('+');

  const osRelatedShortcut = keys.map((key) => {
    if (key === '$mod') {
      return os === 'darwin' ? '⌘' : 'Ctrl';
    }

    return key;
  });

  return osRelatedShortcut;
}

const ResultItem = React.forwardRef(
  (
    {
      action,
      active,
      currentRootActionId,
      os,
    }: {
      action: ActionImpl;
      active: boolean;
      currentRootActionId: ActionId | null | undefined;
      os: string;
    },
    ref: React.Ref<HTMLDivElement>
  ) => {
    const ancestors = React.useMemo(() => {
      if (!currentRootActionId) return action.ancestors;
      const index = action.ancestors.findIndex((ancestor) => ancestor.id === currentRootActionId);
      // +1 removes the currentRootAction; e.g.
      // if we are on the "Set theme" parent action,
      // the UI should not display "Set theme… > Dark"
      // but rather just "Dark"
      return action.ancestors.slice(index + 1);
    }, [action.ancestors, currentRootActionId]);

    return (
      <StyledResultItem ref={ref} active={active}>
        <StyledActionWrapper>
          {action.icon && action.icon}
          <Container gap={0} display="flex" direction="column">
            {ancestors.length > 0 &&
              ancestors.map((ancestor) => (
                <React.Fragment key={ancestor.id}>
                  <span
                    style={{
                      opacity: 0.5,
                      marginRight: 8,
                    }}
                  >
                    {ancestor.name}
                  </span>
                  <span
                    style={{
                      marginRight: 8,
                    }}
                  >
                    &rsaquo;
                  </span>
                </React.Fragment>
              ))}
            <span>{action.name}</span>
            {action.subtitle && <span style={{ fontSize: 12 }}>{action.subtitle}</span>}
          </Container>
        </StyledActionWrapper>
        {action.shortcut?.length ? (
          <StyledShortcutWrapper>
            {action.shortcut.map((shortcut) =>
              makeOsRelatedShortcut(os, shortcut).map((sc) => (
                <Kbd key={sc} size="sm">
                  {sc}
                </Kbd>
              ))
            )}
          </StyledShortcutWrapper>
        ) : null}
      </StyledResultItem>
    );
  }
);

interface RenderResultsProps {
  os: string;
}

const RenderResults: React.FC<RenderResultsProps> = ({ os }) => {
  const { results, rootActionId } = useMatches();

  return (
    <KBarResults
      items={results}
      // eslint-disable-next-line react/no-unstable-nested-components
      onRender={({ item, active }) =>
        typeof item === 'string' ? (
          <StyledGroupName>{item}</StyledGroupName>
        ) : (
          <ResultItem action={item} active={active} currentRootActionId={rootActionId} os={os} />
        )
      }
    />
  );
};

export interface KBarProps {
  os: string;
}

export const KBar: React.FC<PropsWithChildren<KBarProps>> = ({ children, os }) => (
  <>
    <KBarPortal>
      <StyledKBarPositioner>
        <StyledKBarAnimator>
          <StyledKBarSearch />
          <RenderResults os={os} />
        </StyledKBarAnimator>
      </StyledKBarPositioner>
    </KBarPortal>
    {children}
  </>
);
