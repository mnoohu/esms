import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PettyCash } from 'app/shared/model/petty-cash.model';
import { PettyCashService } from './petty-cash.service';
import { PettyCashComponent } from './petty-cash.component';
import { PettyCashDetailComponent } from './petty-cash-detail.component';
import { PettyCashUpdateComponent } from './petty-cash-update.component';
import { PettyCashDeletePopupComponent } from './petty-cash-delete-dialog.component';
import { IPettyCash } from 'app/shared/model/petty-cash.model';

@Injectable({ providedIn: 'root' })
export class PettyCashResolve implements Resolve<IPettyCash> {
    constructor(private service: PettyCashService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((pettyCash: HttpResponse<PettyCash>) => pettyCash.body));
        }
        return of(new PettyCash());
    }
}

export const pettyCashRoute: Routes = [
    {
        path: 'petty-cash',
        component: PettyCashComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'esmsApp.pettyCash.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'petty-cash/:id/view',
        component: PettyCashDetailComponent,
        resolve: {
            pettyCash: PettyCashResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'esmsApp.pettyCash.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'petty-cash/new',
        component: PettyCashUpdateComponent,
        resolve: {
            pettyCash: PettyCashResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'esmsApp.pettyCash.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'petty-cash/:id/edit',
        component: PettyCashUpdateComponent,
        resolve: {
            pettyCash: PettyCashResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'esmsApp.pettyCash.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const pettyCashPopupRoute: Routes = [
    {
        path: 'petty-cash/:id/delete',
        component: PettyCashDeletePopupComponent,
        resolve: {
            pettyCash: PettyCashResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'esmsApp.pettyCash.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
