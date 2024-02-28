import {Component, computed, Input, signal} from '@angular/core';


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

    sideNavCollapsed = signal(false);

    @Input() set collapsed(val: boolean) {
        this.sideNavCollapsed.set(val);
    }

    profilePicSize2 = computed(()=>this.sideNavCollapsed() ? '32' : '100')

    profilePicSize = computed(() => this.sideNavCollapsed() ? '32' : '100');
    menuItems = signal<MenuItem[]>([

        {icon: 'dashboard', label: 'Dashboard', route: 'product/dashboard'},
        {icon: 'products', label: 'Products', route: '/product'},
        {icon: 'Sales', label: 'Sales', route: 'product/sales'}
        // {icon: 'Category', label: 'Category', route: 'product/category'},
        // {icon: 'color', label: 'Color', route: 'product/color'},
        ]
    )
}
