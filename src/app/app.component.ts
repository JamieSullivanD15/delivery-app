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

  pages: any = [
  { name: 'ProfilePage', icon:'person' },
  { name: 'ShiftPage', icon:'paper' },
  { name: 'EarningsPage', icon:'stats' },
  { name: 'SettingsPage', icon:'settings' }
];

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

  }

  read(page) {
    this.nav.setRoot(page.name);
  }


}
