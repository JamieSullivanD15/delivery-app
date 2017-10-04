import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = 'ProfilePage';
  activePage: any;

  pages: any = [
  { name: 'ProfilePage', icon:'home' },
  { name: 'ShiftPage', icon:'add' },
  { name: 'EarningsPage', icon:'stats' }
];

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen
  ) {
    this.activePage = this.rootPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  read(page) {
    this.nav.setRoot(page.name);
    this.activePage = page.name;
  }

  isActive(page) {
    return page.name == this.activePage;
  }


}
