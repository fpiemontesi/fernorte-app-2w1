import { Component } from '@angular/core';

@Component({
  selector: 'fn-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  
  logout(){
    localStorage.removeItem('tokenLogin');
    window.location.reload();
  }
}
