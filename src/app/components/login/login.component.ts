import { Component, OnInit } from '@angular/core';
import { Sonuc } from 'src/app/models/sonuc';
import { Uye } from 'src/app/models/uye';
import { DataserviceService } from 'src/app/services/dataservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(public servis: DataserviceService) { }

  ngOnInit() {}
  oturumAc(mail:any,parola:any){
    this.servis.oturumAc(mail,parola).subscribe(d=> {
      if(d.length > 0){
        var kayit: Uye = d[0];
        localStorage.setItem("adsoyad",kayit.adsoyad);
        localStorage.setItem("admin",kayit.admin.toString());
        location.href = "/";
      } else {
        var sonuc: Sonuc = new Sonuc();
        sonuc.islem = false;
        sonuc.mesaj = "E-Posta Adresi veya Parola Geçersizdir."
        console.log("hatalı giriş")
      }
    })
  }
}
