import { Component, OnInit } from '@angular/core';
import {
  ModalController,
  NavParams,
} from "@ionic/angular";
import { CommonService } from '../common.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Helper } from '../provider/helper';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  modalTitle: string;
  modelId: number;
  name: any;
  address: any;
  id: any;
  valbutton = "Save";
  errorMessage: any;
  userForm: FormGroup;
  constructor(
    public navParams: NavParams, fb: FormBuilder,
    private newService: CommonService,
    public helper: Helper,
    // public viewCtrl: ViewController,
    public modalCtrl: ModalController,
  ) {
    // console.log('facture', params.get('facture'));
    this.userForm = fb.group({
      id: [""],
      name: ["", Validators.required],
      address: ["", Validators.required]
    });
  }

  ngOnInit() {
    console.table(this.navParams);
    this.id = this.navParams.data.id;
    this.name = this.navParams.data.name;
    this.address = this.navParams.data.address;
    this.valbutton = this.navParams.data.valbutton;
  }
  onSave(user) {
    console.log(this.userForm.value)
    user.mode = this.valbutton;
    this.newService.saveUser(user)
      .subscribe(data => {
        // alert(data.data);
        this.helper.showMessage(data.data);
        this.modalCtrl.dismiss();
      }
        , error => this.errorMessage = error)

  }
  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalCtrl.dismiss(onClosedData);
  }
}
