import { Component } from '@angular/core';
import {SidebarService} from "../services/sidebar/sidebar.service";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private sidebarService: SidebarService, private authService:AuthService) {}

  toggleSidebar() {
    // Check if the button click event is registered
    this.sidebarService.toggleSidebar();
    // Check if the visibility state is changing
  }
}
