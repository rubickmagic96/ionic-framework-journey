import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { RedditPage } from '../reddit/reddit';
import { SettingPage } from '../setting/setting';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = RedditPage;
  tab2Root = SettingPage;
  tab3Root = AboutPage;

  constructor() {

  }
}
