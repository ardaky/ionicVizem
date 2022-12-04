
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { DataserviceService } from "./dataservice.service";


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    public servis: DataserviceService
  ) {

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    var sonuc: boolean = false;
    if (this.servis.oturumKontrol()) {
      sonuc = true;
    } else {
      location.href = "/login";
    }
    return sonuc;
  }

}