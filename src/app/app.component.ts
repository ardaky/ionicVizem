import { Component } from '@angular/core';
import { DataserviceService } from './services/dataservice.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(public servis: DataserviceService) {}

  
  oturumKapat(){
    localStorage.clear();
    location.href = "/";
}
}
