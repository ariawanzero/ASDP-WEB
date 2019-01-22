import { MenuItem } from './menu';

export class Authentication {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    menu: MenuItem[];
    scope: string;
    token_type: string;
    clientEmail: string;
    clientName: string;
    clientRoleName: string;
    clientJabatan: string;
    clientExpiredDate: string;
}