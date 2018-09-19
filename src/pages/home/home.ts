import { Component, OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import moment from 'moment';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  lastUpdated: string;
  userName: string;

  constructor(public navCtrl: NavController, private storage: Storage) {

  }

  ngOnInit(){
    this.fetchStorage();
  }

  fetchStorage(): void {
    this.storage.get('userName')
      .then(value => {
        this.userName = value;
        return this.storage.get('lastUpdated');
      })
      .then(value => {
        this.lastUpdated = value ? moment(value).format('L [at] LT') : value;
      })
      .catch(reason => console.log(`Error: ${reason}`));
  }

}
