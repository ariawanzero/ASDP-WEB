import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";

export class Oauth2AuthenticationInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with oauth2 credentials if available
        let currentKey: any = localStorage.getItem('key')
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
