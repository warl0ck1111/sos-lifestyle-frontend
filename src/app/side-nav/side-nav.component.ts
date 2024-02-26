import {Component, EventEmitter, HostListener, Output} from '@angular/core';
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";
import {navbarData} from "./nav-data";
import {Router} from "@angular/router";
import {fadeInOut, INavbarData} from "./helper";
import {SidebarService} from "../services/sidebar/sidebar.service";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent {
  options = this._formBuilder.group({
    bottom: 0,
    fixed: false,
    top: 0,
  });

  constructor(private _formBuilder: FormBuilder) {}

}
