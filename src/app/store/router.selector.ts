import { getSelectors, RouterReducerState } from "@ngrx/router-store";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export const routerFeatureKey = 'router';

export const routerStateSelector = createFeatureSelector<RouterReducerState<any>>(routerFeatureKey);

export const { selectRouteParam } = getSelectors(routerStateSelector);

export const logIdSelector = createSelector(
    selectRouteParam('logId'),
    logId => logId
)

export const logTemplateIdSelector = createSelector(
    selectRouteParam('logTemplateId'),
    logTemplateId => logTemplateId
)