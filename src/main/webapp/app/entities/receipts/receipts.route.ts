import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Receipts } from 'app/shared/model/receipts.model';
import { ReceiptsService } from './receipts.service';
import { ReceiptsComponent } from './receipts.component';
import { ReceiptsDetailComponent } from './receipts-detail.component';
import { ReceiptsUpdateComponent } from './receipts-update.component';
import { ReceiptsDeletePopupComponent } from './receipts-delete-dialog.component';
import { IReceipts } from 'app/shared/model/receipts.model';

@Injectable({ providedIn: 'root' })
export class ReceiptsResolve implements Resolve<IReceipts> {
    constructor(private service: ReceiptsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((receipts: HttpResponse<Receipts>) => receipts.body));
        }
        return of(new Receipts());
    }
}

export const receiptsRoute: Routes = [
    {
        path: 'receipts',
        component: ReceiptsComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'esmsApp.receipts.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'receipts/:id/view',
        component: ReceiptsDetailComponent,
        resolve: {
            receipts: ReceiptsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'esmsApp.receipts.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'receipts/new',
        component: ReceiptsUpdateComponent,
        resolve: {
            receipts: ReceiptsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'esmsApp.receipts.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'receipts/:id/edit',
        component: ReceiptsUpdateComponent,
        resolve: {
            receipts: ReceiptsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'esmsApp.receipts.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const receiptsPopupRoute: Routes = [
    {
        path: 'receipts/:id/delete',
        component: ReceiptsDeletePopupComponent,
        resolve: {
            receipts: ReceiptsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'esmsApp.receipts.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
