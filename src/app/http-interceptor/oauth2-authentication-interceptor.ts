import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";

import { CookieService } from 'ngx-cookie-service';
import { Observable } from "rxjs";

export class Oauth2AuthenticationInterceptor implements HttpInterceptor {
    constructor(
        private cookieService: CookieService
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with oauth2 credentials if available
        let currentKey: any = this.cookieService.get('key');
        if (currentKey) {
            request = request.clone({
                setHeaders: { 
                    Authorization: currentKey
                }
            });
        }

        return next.handle(request);
    }
}
