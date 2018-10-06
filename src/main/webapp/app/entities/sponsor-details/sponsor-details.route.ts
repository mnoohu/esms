import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SponsorDetails } from 'app/shared/model/sponsor-details.model';
import { SponsorDetailsService } from './sponsor-details.service';
import { SponsorDetailsComponent } from './sponsor-details.component';
import { SponsorDetailsDetailComponent } from './sponsor-details-detail.component';
import { SponsorDetailsUpdateComponent } from './sponsor-details-update.component';
import { SponsorDetailsDeletePopupComponent } from './sponsor-details-delete-dialog.component';
import { ISponsorDetails } from 'app/shared/model/sponsor-details.model';

@Injectable({ providedIn: 'root' })
export class SponsorDetailsResolve implements Resolve<ISponsorDetails> {
    constructor(private service: SponsorDetailsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((sponsorDetails: HttpResponse<SponsorDetails>) => sponsorDetails.body));
        }
        return of(new SponsorDetails());
    }
}

export const sponsorDetailsRoute: Routes = [
    {
        path: 'sponsor-details',
        component: SponsorDetailsComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'esmsApp.sponsorDetails.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sponsor-details/:id/view',
        component: SponsorDetailsDetailComponent,
        resolve: {
            sponsorDetails: SponsorDetailsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'esmsApp.sponsorDetails.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sponsor-details/new',
        component: SponsorDetailsUpdateComponent,
        resolve: {
            sponsorDetails: SponsorDetailsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'esmsApp.sponsorDetails.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sponsor-details/:id/edit',
        component: SponsorDetailsUpdateComponent,
        resolve: {
            sponsorDetails: SponsorDetailsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'esmsApp.sponsorDetails.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const sponsorDetailsPopupRoute: Routes = [
    {
        path: 'sponsor-details/:id/delete',
        component: SponsorDetailsDeletePopupComponent,
        resolve: {
            sponsorDetails: SponsorDetailsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'esmsApp.sponsorDetails.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
