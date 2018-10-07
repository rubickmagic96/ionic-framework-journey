import { Component, OnInit } from '@angular/core';
import { ResApiService } from '../res-api.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  programmingLang: any;
  constructor(public api: ResApiService, private loadingCtrl: LoadingController) {
    
  }

  ngOnInit() {
    this.getProgrammingLang();
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }

  async getProgrammingLang() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading'
    });
    await loading.present();
    await this.api.getProgrammingLang().subscribe(
      res => {
        console.log(res);
        this.programmingLang = res;
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      }
    )
  }
}
