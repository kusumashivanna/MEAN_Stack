import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, } from '@angular/forms';
import { CommonService } from './common.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ModalController } from '@ionic/angular';
import { HomePage } from './home/home.page';
import { Helper } from './provider/helper';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  name: any;
  address: any;
  id: any;
  Repdata: any;
  valbutton = "Save";
  errorMessage: any;
  addUser = false;
  dataReturned: any;
  query: string;
  constructor(private newService: CommonService, public helper: Helper, public modalCtrl: ModalController, ) { }
  ngOnInit() {
    this.getdata();
  }
  getdata() {
    this.newService.GetUser().subscribe(data => this.Repdata = data);
  }
  onSave(user) {
    console.log(user);
    user.mode = this.valbutton;
    this.newService.saveUser(user)
      .subscribe(data => {
        // alert(data.data);
        this.helper.showMessage(data.data);
        this.ngOnInit();
      }
        , error => this.errorMessage = error)

  }
  async edit(kk) {
    this.id = kk._id;
    this.name = kk.name;
    this.address = kk.address;
    this.valbutton = "Update";
    const modal = await this.modalCtrl.create({
      component: HomePage,
      componentProps: {
        "id": this.id,
        "name": this.name,
        "address": this.address,
        "valbutton": this.valbutton
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      this.getdata();
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
        //alert('Modal Sent Data :'+ dataReturned);
      }
    });

    return await modal.present();
  }

  delete(id) {
    this.newService.deleteUser(id)
      .subscribe(data => {
        // alert(data.data);
        this.helper.showMessage(data.data);
        this.ngOnInit();
      }, error => this.errorMessage = error)
  }
  SerachUser(query) {
    if (this.query) {
      this.newService.SerachUser(this.query)
        .subscribe(data => this.Repdata = data);
    }
    else {
      this.getdata();
    }
  }

  async addUsers() {
    const modal = await this.modalCtrl.create({
      component: HomePage,
      componentProps: {
        "id": "",
        "name": "",
        "address": "",
        "valbutton": "Save"
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      this.getdata();
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
        //alert('Modal Sent Data :'+ dataReturned);
      }
    });

    return await modal.present();
  }
}
