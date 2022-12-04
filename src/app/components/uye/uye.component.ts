import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Sonuc } from 'src/app/models/sonuc';
import { Uye } from 'src/app/models/uye';
import { DataserviceService } from 'src/app/services/dataservice.service';
import { ModalController, ToastController } from '@ionic/angular';
import { MytoastService } from 'src/app/services/mytoast.service';
import { Router, RouterEvent, RouterLink } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-uye',
  templateUrl: './uye.component.html',
  styleUrls: ['./uye.component.scss'],
})
export class UyeComponent implements OnInit {
  presentingElement = null;
  presentingElement2 = null;
  presentingElement3 = null;
  formum: FormGroup = new FormGroup({
    id: new FormControl(),
    adsoyad: new FormControl(),
    mail: new FormControl(),
    admin: new FormControl(),
    parola: new FormControl(),
    kayTarih: new FormControl(),
    duztarih: new FormControl()
  })
  uyeler!: Uye[];
  modalBaslik: string = "";
  secUye!:Uye;
  uyeSonuc!:Sonuc;
  sonuc: Sonuc = new Sonuc();
  frm: FormGroup = new FormGroup({
  id: new FormControl(),
  adsoyad: new FormControl(),
  mail: new FormControl(),
  admin: new FormControl(),
  parola: new FormControl(),
  kayTarih: new FormControl(),
  duztarih: new FormControl()
  });
  constructor(
    public servis: DataserviceService,
    public toast: MytoastService,
    public router:Router,
    public modalim:ModalController
  ) { }
  
  handlerMessage = '';
  roleMessage = '';
  
  ngOnInit() {
    this.uyeListele();
    
  }
 

  uyeEkleDuzenle(){
    var yeniuye: Uye = this.frm.value;
    var tarih = new Date();
    if (!yeniuye.id){
      var filtre = this.uyeler.filter(s=> s.mail == yeniuye.mail);
      if(filtre.length > 0){
        this.sonuc.islem= false;
        this.sonuc.mesaj = "Girilen E-Posta Adresi Kayıtlıdır !";
        this.toast.ToastUygula(this.sonuc);
      }
      else{
        yeniuye.kayittarihi = tarih.getTime().toString();
        yeniuye.duzenlemetarihi = tarih.getTime().toString();
        this.servis.uyeEkle(yeniuye).subscribe(d=> {
          this.sonuc.islem = true;
          this.sonuc.mesaj = "Üye Eklendi";
          this.toast.ToastUygula(this.sonuc);
          this.uyeListele();
        })
      }
    } 
  }

  uyeDuzenle(){
    var uye: Uye = this.formum.value;
    var tarih = new Date();
    uye.duzenlemetarihi = tarih.getTime().toString();
    this.servis.uyeDuzenle(uye).subscribe(d=> {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Üye Düzenlendi.";
      this.toast.ToastUygula(this.sonuc);
      this.uyeListele();
      this.modalim.dismiss(); 
    }
    )
  }
  pathvaluegetir(uye:Uye){
    this.formum.patchValue(uye);
  }
  

  uyeEkle(el: HTMLElement){
    this.frm.reset();
    this.frm.patchValue({admin:0});

  }
  
  uyeListele() {
    this.servis.uyeListele().subscribe(d => {
      this.uyeler = d;
    })};
  
  ekle(el: HTMLElement){
    this.frm.reset();
    this.frm.patchValue({admin:0});
  }

  

  sil(uye:Uye){
    this.secUye = uye;
    this.modalBaslik = "Üye Sil";


  }

 

  uyeSil(){
    this.servis.uyeSil(this.secUye.id).subscribe(d=> {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Üye Silindi.";
      this.toast.ToastUygula(this.sonuc);
      this.uyeListele();
      this.modalim.dismiss();

    })
  }

  
}
