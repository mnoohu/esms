import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ZakaathAmount } from 'app/shared/model/zakaath-amount.model';
import { ZakaathAmountService } from './zakaath-amount.service';
import { ZakaathAmountComponent } from './zakaath-amount.component';
import { ZakaathAmountDetailComponent } from './zakaath-amount-detail.component';
import { ZakaathAmountUpdateComponent } from './zakaath-amount-update.component';
import { ZakaathAmountDeletePopupComponent } from './zakaath-amount-delete-dialog.component';
import { IZakaathAmount } from 'app/shared/model/zakaath-amount.model';

@Injectable({ providedIn: 'root' })
export class ZakaathAmountResolve implements Resolve<IZakaathAmount> {
    constructor(private service: ZakaathAmountService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((zakaathAmount: HttpResponse<ZakaathAmount>) => zakaathAmount.body));
        }
        return of(new ZakaathAmount());
    }
}

export const zakaathAmountRoute: Routes = [
    {
        path: 'zakaath-amount',
        component: ZakaathAmountComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'esmsApp.zakaathAmount.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'zakaath-amount/:id/view',
        component: ZakaathAmountDetailComponent,
        resolve: {
            zakaathAmount: ZakaathAmountResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'esmsApp.zakaathAmount.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'zakaath-amount/new',
        component: ZakaathAmountUpdateComponent,
        resolve: {
            zakaathAmount: ZakaathAmountResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'esmsApp.zakaathAmount.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'zakaath-amount/:id/edit',
        component: ZakaathAmountUpdateComponent,
        resolve: {
            zakaathAmount: ZakaathAmountResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'esmsApp.zakaathAmount.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const zakaathAmountPopupRoute: Routes = [
    {
        path: 'zakaath-amount/:id/delete',
        component: ZakaathAmountDeletePopupComponent,
        resolve: {
            zakaathAmount: ZakaathAmountResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'esmsApp.zakaathAmount.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
