import {
  GrpcProtocolType,
  GrpcRequestTab,
  ICreateTabPayload,
  IGrpcRequestTab,
  TabsContainer,
  TabType,
} from '@core';

const TAB_PAYLOAD: IGrpcRequestTab = {
  id: '1',
  active: true,
  order: 1,
  title: 'TestTab',
  type: TabType.GrpcRequest,
  protocol: GrpcProtocolType.Grpc,
  url: '10.10.10.10',
  environmentId: '1',
};

describe('TabsContainer', () => {
  let container: TabsContainer;

  it('should create empty tab container', () => {
    container = new TabsContainer();

    expect(container.getTabs()).toEqual([]);
  });

  it('should create tab container with tab', () => {
    container = new TabsContainer([TAB_PAYLOAD]);

    expect(container.getTabs()).toEqual([TAB_PAYLOAD]);
  });

  it('should throw error on tab container creation if unsuported tab type was passed', () => {
    expect(() => new TabsContainer([{} as IGrpcRequestTab])).toThrow();
  });

  it('should create new tab', () => {
    container = new TabsContainer();

    const tab = container.createTab(TAB_PAYLOAD);

    expect(tab).toEqual(
      expect.objectContaining({
        id: expect.anything(),
        order: 1,
        active: true,
      })
    );
  });

  it('should throw error on new tab creation if unsuported tab type was passed', () => {
    container = new TabsContainer();

    expect(() => container.createTab({} as ICreateTabPayload)).toThrowError('Unsuported tab type.');
  });

  it('should activate tab', () => {
    container = new TabsContainer();

    const firstTab = container.createTab(TAB_PAYLOAD);
    const secondTab = container.createTab(TAB_PAYLOAD);

    container.activateTab(firstTab.id);

    expect(firstTab.active).toEqual(true);
    expect(secondTab.active).toEqual(false);
  });

  it('should close active tab', () => {
    container = new TabsContainer();

    container.createTab(TAB_PAYLOAD);
    container.createTab(TAB_PAYLOAD);
    container.createTab(TAB_PAYLOAD);

    container.closeActiveTab();

    const tabs = container.getTabs();

    expect(tabs[0].active).toEqual(false);
    expect(tabs[1].active).toEqual(true);
    expect(tabs[2]).toBeUndefined();
  });

  it('should close tab', () => {
    container = new TabsContainer();

    container.createTab(TAB_PAYLOAD);
    const secondTab = container.createTab(TAB_PAYLOAD);
    const thirdTab = container.createTab(TAB_PAYLOAD);

    container.closeTab(secondTab.id);

    const tabs = container.getTabs();

    expect(tabs.length).toEqual(2);
    expect(tabs[0]).toEqual(
      expect.objectContaining({
        active: false,
        order: 1,
      })
    );
    expect(tabs[1]).toEqual(
      expect.objectContaining({
        id: thirdTab.id,
        active: true,
        order: 2,
      })
    );
  });

  it('should close all tabs', () => {
    container = new TabsContainer();

    container.createTab(TAB_PAYLOAD);
    container.createTab(TAB_PAYLOAD);
    container.createTab(TAB_PAYLOAD);

    container.closeAllTabs();

    const tabs = container.getTabs();

    expect(tabs.length).toEqual(0);
  });

  it('should move tab', () => {
    container = new TabsContainer();

    const firstTab = container.createTab(TAB_PAYLOAD);
    const secondTab = container.createTab(TAB_PAYLOAD);
    const thirdTab = container.createTab(TAB_PAYLOAD);

    container.moveTab(firstTab.id, thirdTab.id);

    const tabs = container.getTabs();

    expect(tabs[0]).toEqual(
      expect.objectContaining({
        id: secondTab.id,
        order: 1,
      })
    );
    expect(tabs[1]).toEqual(
      expect.objectContaining({
        id: thirdTab.id,
        order: 2,
      })
    );
    expect(tabs[2]).toEqual(
      expect.objectContaining({
        id: firstTab.id,
        order: 3,
      })
    );
  });

  it('should reset environment', () => {
    container = new TabsContainer();

    const firstTab = container.createTab<GrpcRequestTab>(TAB_PAYLOAD);
    const secondTab = container.createTab<GrpcRequestTab>(TAB_PAYLOAD);
    const thirdTab = container.createTab<GrpcRequestTab>({ ...TAB_PAYLOAD, environmentId: '2' });

    container.resetEnvironment('1');

    expect(firstTab.environmentId).toEqual(undefined);
    expect(secondTab.environmentId).toEqual(undefined);
    expect(thirdTab.environmentId).toEqual('2');
  });

  it('should update tabs', () => {
    container = new TabsContainer();

    const firstTab = container.createTab<GrpcRequestTab>(TAB_PAYLOAD);
    const secondTab = container.createTab<GrpcRequestTab>(TAB_PAYLOAD);
    const thirdTab = container.createTab<GrpcRequestTab>({ ...TAB_PAYLOAD, environmentId: '2' });

    container.updateTabs([firstTab.id, secondTab.id], { url: 'test' });

    expect(firstTab.url).toEqual('test');
    expect(secondTab.url).toEqual('test');
    expect(thirdTab.url).toEqual('10.10.10.10');
  });
});
