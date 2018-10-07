import { LoadingController } from '@ionic/angular';
import { ResApiService } from './../res-api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  programmingLang: any;

  constructor(public api: ResApiService,
    public loadingCtrl: LoadingController,
    public route: ActivatedRoute,
    public router: Router) { }

  ngOnInit() {
    this.getProgrammingList();
  }

  async getProgrammingList() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading'
    });
    await loading.present();
    await this.api.getProgrammingLangById(this.route.snapshot.paramMap.get('id'))
    .subscribe(res => {
      console.log(res);
      this.programmingLang = res;
    }, err => {
      console.log(err);
      loading.dismiss();
    });
  }

  async delete(id) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading'
    });
    await loading.present();
    await this.api.deleteProgrammingLang(id).subscribe(
      res => {
        loading.dismiss();
        this.router.navigate(['/list']);
      }, err => {
        console.log(err);
        loading.dismiss();
      }
    )
  }
}
