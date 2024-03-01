import {Component, computed, Input, signal} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {CredentialsService} from "../services/credentials.service";


export type MenuItem = {
    icon: string;
    label: string;
    route?: string;
}

@Component({
    selector: 'app-custom-side-nav',
    templateUrl: './custom-side-nav.component.html',
    styleUrls: ['./custom-side-nav.component.scss']
})
export class CustomSideNavComponent {

    fullName!:string;
    role!:string;
    constructor(private credentialService:CredentialsService,
                private authService:AuthService
                ) {
      console.log("CustomSideNavComponent/constructor/called")
        let firstName =credentialService.credentials?.firstName
      let lastName =credentialService.credentials?.lastName
      this.role =`${credentialService.credentials?.role}`
      console.log("CustomSideNavComponent/constructor/role"+ this.role)
      this.fullName = `${firstName} ${lastName}`
    }
    sideNavCollapsed = signal(false);

    @Input() set collapsed(val: boolean) {
        this.sideNavCollapsed.set(val);
    }

    profilePicSize2 = computed(()=>this.sideNavCollapsed() ? '32' : '100')

    profilePicSize = computed(() => this.sideNavCollapsed() ? '32' : '100');
    menuItems = signal<MenuItem[]>([

        {icon: 'list', label: 'Products', route: '/product'},
        {icon: 'shopping_cart', label: 'Sales', route: 'product/sales'}
        // {icon: 'Category', label: 'Category', route: 'product/category'},
        // {icon: 'color', label: 'Color', route: 'product/color'},
        ]
    )

    logout() {
        if (window.confirm("Are you sure you want to log out")){
            this.authService.logoutUser();
        }
    }

  changePassword() {

  }
}
