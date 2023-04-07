import { arrayMove } from '@dnd-kit/sortable';
import { v4 as uuid } from 'uuid';

import { AbstractTab } from './abstract-tab.entity';
import { GrpcRequestTab, IGrpcRequestTabCreate } from './grpc-request';
import { IAbstractTab, isGrpcRequestTab } from './interfaces';

export type ICreateTabPayload = Omit<IGrpcRequestTabCreate, 'id' | 'order' | 'active'>;
export type IUpdateTabPayload = Partial<Omit<IGrpcRequestTabCreate, 'id' | 'order' | 'active'>>;

export class TabsContainer {
  private tabs: AbstractTab[];

  constructor(tabs: IAbstractTab[] = []) {
    this.tabs = tabs.map((tab) => {
      if (isGrpcRequestTab(tab)) {
        return new GrpcRequestTab(tab);
      }

      throw new Error('Unsuported tab type.');
    });
  }

  public createTab(payload: ICreateTabPayload) {
    let tab: AbstractTab;

    const tabPayload = {
      id: uuid(),
      order: this.tabs.length + 1,
      active: false,
      ...payload,
    };

    if (isGrpcRequestTab(tabPayload)) {
      tab = new GrpcRequestTab(tabPayload);
    } else {
      throw new Error('Unsuported tab type.');
    }

    this.tabs.push(tab);

    this.activateTab(tab.id);

    return tab;
  }

  public updateTabs(ids: string[], payload: IUpdateTabPayload) {
    const tabs = this.tabs.filter((item) => ids.includes(item.id));

    tabs.forEach((tab) => {
      tab.update(payload);
    });
  }

  public resetEnvironment(environmentId: string) {
    const tabs = this.tabs.filter(
      (tab) => isGrpcRequestTab(tab) && tab.environmentId === environmentId
    ) as GrpcRequestTab[];

    tabs.forEach((tab) => {
      tab.update({ environmentId: undefined });
    });
  }

  public getTabs() {
    return this.tabs;
  }

  public getActiveTab() {
    return this.tabs.find((item) => item.active);
  }

  public activateTab(id: string) {
    const currentActiveTab = this.getActiveTab();

    if (currentActiveTab) {
      currentActiveTab.active = false;
    }

    const tab = this.tabs.find((item) => item.id === id);

    if (tab) {
      tab.update({ active: true });
    }
  }

  public closeAllTabs() {
    this.tabs = [];
  }

  public closeActiveTab() {
    const activeTab = this.getActiveTab();

    if (activeTab) {
      this.closeTab(activeTab.id);
    }
  }

  public closeTab(id: string) {
    const closedTabIndex = this.tabs.findIndex((tab) => tab.id === id);

    if (this.getActiveTab()?.id === id) {
      this.activateTab(this.tabs[closedTabIndex + 1]?.id || this.tabs[closedTabIndex - 1]?.id);
    }

    this.tabs.splice(closedTabIndex, 1);

    this.updateTabsOrder();
  }

  public moveTab(currentId: string, overId: string) {
    const oldIndex = this.tabs.findIndex((item) => item.id === currentId);
    const newIndex = this.tabs.findIndex((item) => item.id === overId);

    this.tabs = arrayMove(this.tabs, oldIndex, newIndex);

    this.updateTabsOrder();
  }

  private updateTabsOrder() {
    this.tabs.forEach((tab, index) => {
      tab.update({ order: index + 1 });
    });
  }
}
