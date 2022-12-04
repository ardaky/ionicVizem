import { ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Kategori } from '../models/kategori';
import { Uye } from '../models/uye';
import { HttpClient } from '@angular/common/http';
import { Sonuc } from '../models/sonuc';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {
  public apiUrl = "http://localhost:3000/";
  public aktifUye: Uye = new Uye();

  constructor(
    public http: HttpClient

  ) { }
  
  oturumAc(mail: string, parola: string) {
    return this.http.get<Uye[]>(this.apiUrl + "users?mail=" + mail + "&parola=" + parola)
  }

  oturumKontrol() {
    if (localStorage.getItem("adsoyad")) {
      this.aktifUyeBilgi();
      return true;
    } else {
      return false;
    }
  }

  aktifUyeBilgi() {
    if (localStorage.getItem("adsoyad")) {
      this.aktifUye.adsoyad = localStorage.getItem("adsoyad") || "";
      var admin = localStorage.getItem("admin") || "0";
      this.aktifUye.admin = parseInt(admin);
    }
  }
  /*Kategori Servisi Başlangıcı*/
  
  kategoriListele() {
    return this.http.get<Kategori[]>(this.apiUrl + "categories");
  }
  kategoriById(id: number) {
    return this.http.get<Kategori[]>(this.apiUrl + "categories/" + id);
  }
  kategoriEkle(kat: Kategori) {
    return this.http.post(this.apiUrl + "categories/", kat);
  }
  kategoriDuzenle(kat: Kategori) {
    return this.http.patch(this.apiUrl + "categories/" + kat.id, kat)
  }
  kategoriSil(id: number) {
    return this.http.delete(this.apiUrl + "categories/" + id)
  }

  /*Kategori Servis Bitişi*/

  /*Üye Servisi Başlangıcı*/
  
  uyeListele() {
    return this.http.get<Uye[]>(this.apiUrl + "users");
  }
  uyeById(id: number) {
    return this.http.get<Uye>(this.apiUrl + "users/" + id)
  }
  uyeEkle(uye:Uye){
    return this.http.post(this.apiUrl+ "users/",uye)
  }
  uyeDuzenle(uye:Uye){
    return this.http.patch(this.apiUrl+"users/"+uye.id,uye)
  }
  uyeSil(id:number){
    return this.http.delete(this.apiUrl+"users/"+id)
  }

  /*Üye Servis Bitişi*/

}
