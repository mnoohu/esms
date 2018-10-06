import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Street } from 'app/shared/model/street.model';
import { StreetService } from './street.service';
import { StreetComponent } from './street.component';
import { StreetDetailComponent } from './street-detail.component';
import { StreetUpdateComponent } from './street-update.component';
import { StreetDeletePopupComponent } from './street-delete-dialog.component';
import { IStreet } from 'app/shared/model/street.model';

@Injectable({ providedIn: 'root' })
export class StreetResolve implements Resolve<IStreet> {
    constructor(private service: StreetService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((street: HttpResponse<Street>) => street.body));
        }
        return of(new Street());
    }
}

export const streetRoute: Routes = [
    {
        path: 'street',
        component: StreetComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'esmsApp.street.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'street/:id/view',
        component: StreetDetailComponent,
        resolve: {
            street: StreetResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'esmsApp.street.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'street/new',
        component: StreetUpdateComponent,
        resolve: {
            street: StreetResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'esmsApp.street.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'street/:id/edit',
        component: StreetUpdateComponent,
        resolve: {
            street: StreetResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'esmsApp.street.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const streetPopupRoute: Routes = [
    {
        path: 'street/:id/delete',
        component: StreetDeletePopupComponent,
        resolve: {
            street: StreetResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'esmsApp.street.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
