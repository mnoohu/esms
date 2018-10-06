import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SponsorCommitments } from 'app/shared/model/sponsor-commitments.model';
import { SponsorCommitmentsService } from './sponsor-commitments.service';
import { SponsorCommitmentsComponent } from './sponsor-commitments.component';
import { SponsorCommitmentsDetailComponent } from './sponsor-commitments-detail.component';
import { SponsorCommitmentsUpdateComponent } from './sponsor-commitments-update.component';
import { SponsorCommitmentsDeletePopupComponent } from './sponsor-commitments-delete-dialog.component';
import { ISponsorCommitments } from 'app/shared/model/sponsor-commitments.model';

@Injectable({ providedIn: 'root' })
export class SponsorCommitmentsResolve implements Resolve<ISponsorCommitments> {
    constructor(private service: SponsorCommitmentsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((sponsorCommitments: HttpResponse<SponsorCommitments>) => sponsorCommitments.body));
        }
        return of(new SponsorCommitments());
    }
}

export const sponsorCommitmentsRoute: Routes = [
    {
        path: 'sponsor-commitments',
        component: SponsorCommitmentsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'esmsApp.sponsorCommitments.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sponsor-commitments/:id/view',
        component: SponsorCommitmentsDetailComponent,
        resolve: {
            sponsorCommitments: SponsorCommitmentsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'esmsApp.sponsorCommitments.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sponsor-commitments/new',
        component: SponsorCommitmentsUpdateComponent,
        resolve: {
            sponsorCommitments: SponsorCommitmentsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'esmsApp.sponsorCommitments.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sponsor-commitments/:id/edit',
        component: SponsorCommitmentsUpdateComponent,
        resolve: {
            sponsorCommitments: SponsorCommitmentsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'esmsApp.sponsorCommitments.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const sponsorCommitmentsPopupRoute: Routes = [
    {
        path: 'sponsor-commitments/:id/delete',
        component: SponsorCommitmentsDeletePopupComponent,
        resolve: {
            sponsorCommitments: SponsorCommitmentsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'esmsApp.sponsorCommitments.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
