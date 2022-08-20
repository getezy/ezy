import { Container } from '@nextui-org/react';
import { ActionId, ActionImpl, KBarPortal, KBarResults, useMatches } from 'kbar';
import React, { PropsWithChildren } from 'react';

import {
  StyledActionWrapper,
  StyledGroupName,
  StyledKBarAnimator,
  StyledKBarPositioner,
  StyledKBarSearch,
  StyledKbd,
  StyledResultItem,
  StyledShortcutWrapper,
} from './kbar.styled';

const ResultItem = React.forwardRef(
  (
    {
      action,
      active,
      currentRootActionId,
    }: {
      action: ActionImpl;
      active: boolean;
      currentRootActionId: ActionId | null | undefined;
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
            {action.shortcut.map((sc) => (
              <StyledKbd key={sc}>{sc}</StyledKbd>
            ))}
          </StyledShortcutWrapper>
        ) : null}
      </StyledResultItem>
    );
  }
);

const RenderResults: React.FC = () => {
  const { results, rootActionId } = useMatches();

  return (
    <KBarResults
      items={results}
      // eslint-disable-next-line react/no-unstable-nested-components
      onRender={({ item, active }) =>
        typeof item === 'string' ? (
          <StyledGroupName>{item}</StyledGroupName>
        ) : (
          <ResultItem action={item} active={active} currentRootActionId={rootActionId} />
        )
      }
    />
  );
};

export const KBar: React.FC<PropsWithChildren> = ({ children }) => (
  <>
    <KBarPortal>
      <StyledKBarPositioner>
        <StyledKBarAnimator>
          <StyledKBarSearch />
          <RenderResults />
        </StyledKBarAnimator>
      </StyledKBarPositioner>
    </KBarPortal>
    {children}
  </>
);
