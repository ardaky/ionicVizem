import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Kategori } from 'src/app/models/kategori';
import { Sonuc } from 'src/app/models/sonuc';
import { MytoastService } from 'src/app/services/mytoast.service';
import { DataserviceService } from 'src/app/services/dataservice.service';
import { IonModal, ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-kategori',
  templateUrl: './kategori.component.html',
  styleUrls: ['./kategori.component.scss'],
})
export class KategoriComponent implements OnInit {

  kategoriler!: Kategori[];
  secKat!: Kategori;
  sonuc: Sonuc = new Sonuc();
  frm: FormGroup = new FormGroup({
    id: new FormControl(),
    adi: new FormControl(),
    kayittarihi: new FormControl(),
    duzenlenmetarihi: new FormControl(),
  });
  constructor(
    public servis: DataserviceService,
    public toast: MytoastService,
    public modalcik:ModalController
  ) { }
  ngOnInit() {
    this.kategoriListele();
  }
  
  Ekle(el:HTMLElement){
    this.frm.reset();
  }

  kategoriListele() {
    this.servis.kategoriListele().subscribe(d => {
      this.kategoriler = d;
    });  
  }
  presentingElement4 = null;
  presentingElement5 = null;
  presentingElement6 = null;
  kategoriEkleDuzenle() {
    var kat: Kategori = this.frm.value
    var tarih = new Date();
    if (!kat.id) {
      var filtre = this.kategoriler.filter(s => s.adi == kat.adi);
      if (filtre.length > 0) {
        this.sonuc.islem = false;
        this.sonuc.mesaj = "Girilen Kategori Kayıtlıdır!";
        this.toast.ToastUygula(this.sonuc);
      } else {
        kat.kayittarihi = tarih.getTime().toString();
        kat.duzenlemetarihi = tarih.getTime().toString();
        this.servis.kategoriEkle(kat).subscribe(d => {
          this.sonuc.islem = true;
          this.sonuc.mesaj = "Kategori Eklendi";
          this.toast.ToastUygula(this.sonuc);
          this.kategoriListele();
          this.modalcik.dismiss();
        });
      }
    } 
    }

    patchValueGetir(kat:Kategori){
      this.frm.patchValue(kat);
    }

    kategoriDuzenle(){
      var kat: Kategori = this.frm.value;
      var tarih = new Date();
      kat.duzenlemetarihi = tarih.getTime().toString();

      this.servis.kategoriDuzenle(kat).subscribe(d=> {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Kategori Düzenlendi.";
        this.toast.ToastUygula(this.sonuc);
        this.kategoriListele();
        this.modalcik.dismiss(); 
        
      }
      )
    }
    kategoriSil() {
      this.servis.kategoriSil(this.secKat.id).subscribe(d => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Kategori Silindi";
        this.toast.ToastUygula(this.sonuc);
        this.kategoriListele();
        this.modalcik.dismiss(); 
      });
    }
    sil(kat: Kategori) {
      this.secKat = kat;
    }


}
