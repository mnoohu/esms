import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ScholarshipDetails } from 'app/shared/model/scholarship-details.model';
import { ScholarshipDetailsService } from './scholarship-details.service';
import { ScholarshipDetailsComponent } from './scholarship-details.component';
import { ScholarshipDetailsDetailComponent } from './scholarship-details-detail.component';
import { ScholarshipDetailsUpdateComponent } from './scholarship-details-update.component';
import { ScholarshipDetailsDeletePopupComponent } from './scholarship-details-delete-dialog.component';
import { IScholarshipDetails } from 'app/shared/model/scholarship-details.model';

@Injectable({ providedIn: 'root' })
export class ScholarshipDetailsResolve implements Resolve<IScholarshipDetails> {
    constructor(private service: ScholarshipDetailsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((scholarshipDetails: HttpResponse<ScholarshipDetails>) => scholarshipDetails.body));
        }
        return of(new ScholarshipDetails());
    }
}

export const scholarshipDetailsRoute: Routes = [
    {
        path: 'scholarship-details',
        component: ScholarshipDetailsComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'esmsApp.scholarshipDetails.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'scholarship-details/:id/view',
        component: ScholarshipDetailsDetailComponent,
        resolve: {
            scholarshipDetails: ScholarshipDetailsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'esmsApp.scholarshipDetails.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'scholarship-details/new',
        component: ScholarshipDetailsUpdateComponent,
        resolve: {
            scholarshipDetails: ScholarshipDetailsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'esmsApp.scholarshipDetails.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'scholarship-details/:id/edit',
        component: ScholarshipDetailsUpdateComponent,
        resolve: {
            scholarshipDetails: ScholarshipDetailsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'esmsApp.scholarshipDetails.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const scholarshipDetailsPopupRoute: Routes = [
    {
        path: 'scholarship-details/:id/delete',
        component: ScholarshipDetailsDeletePopupComponent,
        resolve: {
            scholarshipDetails: ScholarshipDetailsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'esmsApp.scholarshipDetails.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
