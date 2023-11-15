import { Component, Input, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {
  
  @Input() title!: string;
  @Input() backButton!: string;
  @Input() isModal!: boolean;

  constructor(private firebaseSvc : FirebaseService, private utilSvc : UtilsService) { }

  ngOnInit() {}

  dismissModal(){
    this.utilSvc.dismissModal();
  }

}
