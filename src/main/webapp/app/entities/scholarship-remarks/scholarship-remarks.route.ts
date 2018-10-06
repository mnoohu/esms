import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ScholarshipRemarks } from 'app/shared/model/scholarship-remarks.model';
import { ScholarshipRemarksService } from './scholarship-remarks.service';
import { ScholarshipRemarksComponent } from './scholarship-remarks.component';
import { ScholarshipRemarksDetailComponent } from './scholarship-remarks-detail.component';
import { ScholarshipRemarksUpdateComponent } from './scholarship-remarks-update.component';
import { ScholarshipRemarksDeletePopupComponent } from './scholarship-remarks-delete-dialog.component';
import { IScholarshipRemarks } from 'app/shared/model/scholarship-remarks.model';

@Injectable({ providedIn: 'root' })
export class ScholarshipRemarksResolve implements Resolve<IScholarshipRemarks> {
    constructor(private service: ScholarshipRemarksService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((scholarshipRemarks: HttpResponse<ScholarshipRemarks>) => scholarshipRemarks.body));
        }
        return of(new ScholarshipRemarks());
    }
}

export const scholarshipRemarksRoute: Routes = [
    {
        path: 'scholarship-remarks',
        component: ScholarshipRemarksComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'esmsApp.scholarshipRemarks.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'scholarship-remarks/:id/view',
        component: ScholarshipRemarksDetailComponent,
        resolve: {
            scholarshipRemarks: ScholarshipRemarksResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'esmsApp.scholarshipRemarks.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'scholarship-remarks/new',
        component: ScholarshipRemarksUpdateComponent,
        resolve: {
            scholarshipRemarks: ScholarshipRemarksResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'esmsApp.scholarshipRemarks.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'scholarship-remarks/:id/edit',
        component: ScholarshipRemarksUpdateComponent,
        resolve: {
            scholarshipRemarks: ScholarshipRemarksResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'esmsApp.scholarshipRemarks.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const scholarshipRemarksPopupRoute: Routes = [
    {
        path: 'scholarship-remarks/:id/delete',
        component: ScholarshipRemarksDeletePopupComponent,
        resolve: {
            scholarshipRemarks: ScholarshipRemarksResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'esmsApp.scholarshipRemarks.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
