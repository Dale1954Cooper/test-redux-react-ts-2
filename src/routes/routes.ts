import {Component, FC, ReactNode} from 'react';

import Login from "../pages/Login";
import Event from "../pages/Event";

export interface IRoute {
    path: string;
    component: Component | FC | ReactNode;
}

export enum RouteNames {
    LOGIN = '/login',
    EVENT = '/',
}

export const publicRoutes: IRoute[] = [
    {path: RouteNames.LOGIN, component: Login}
];

export const privateRoutes: IRoute[] = [
    {path: RouteNames.EVENT, component: Event}
];
