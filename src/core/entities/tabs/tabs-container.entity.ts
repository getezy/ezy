import { arrayMove } from '@dnd-kit/sortable';

import { AbstractTab } from './abstract-tab.entity';
import { GrpcRequestTab, IGrpcRequestTab } from './grpc-request-tab.entity';
import { IAbstractTab } from './interfaces';

export class TabsContainer {
  public tabs: AbstractTab[];

  constructor(tabs: IAbstractTab[]) {
    this.tabs = tabs.map((tab) => new GrpcRequestTab(tab as IGrpcRequestTab));
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
      tab.active = true;
    }
  }

  public closeAllTabs() {
    this.tabs = [];
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
      // eslint-disable-next-line no-param-reassign
      tab.order = index + 1;
    });
  }
}
