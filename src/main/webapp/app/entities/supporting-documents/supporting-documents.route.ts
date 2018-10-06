import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SupportingDocuments } from 'app/shared/model/supporting-documents.model';
import { SupportingDocumentsService } from './supporting-documents.service';
import { SupportingDocumentsComponent } from './supporting-documents.component';
import { SupportingDocumentsDetailComponent } from './supporting-documents-detail.component';
import { SupportingDocumentsUpdateComponent } from './supporting-documents-update.component';
import { SupportingDocumentsDeletePopupComponent } from './supporting-documents-delete-dialog.component';
import { ISupportingDocuments } from 'app/shared/model/supporting-documents.model';

@Injectable({ providedIn: 'root' })
export class SupportingDocumentsResolve implements Resolve<ISupportingDocuments> {
    constructor(private service: SupportingDocumentsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((supportingDocuments: HttpResponse<SupportingDocuments>) => supportingDocuments.body));
        }
        return of(new SupportingDocuments());
    }
}

export const supportingDocumentsRoute: Routes = [
    {
        path: 'supporting-documents',
        component: SupportingDocumentsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'esmsApp.supportingDocuments.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'supporting-documents/:id/view',
        component: SupportingDocumentsDetailComponent,
        resolve: {
            supportingDocuments: SupportingDocumentsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'esmsApp.supportingDocuments.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'supporting-documents/new',
        component: SupportingDocumentsUpdateComponent,
        resolve: {
            supportingDocuments: SupportingDocumentsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'esmsApp.supportingDocuments.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'supporting-documents/:id/edit',
        component: SupportingDocumentsUpdateComponent,
        resolve: {
            supportingDocuments: SupportingDocumentsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'esmsApp.supportingDocuments.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const supportingDocumentsPopupRoute: Routes = [
    {
        path: 'supporting-documents/:id/delete',
        component: SupportingDocumentsDeletePopupComponent,
        resolve: {
            supportingDocuments: SupportingDocumentsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'esmsApp.supportingDocuments.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
