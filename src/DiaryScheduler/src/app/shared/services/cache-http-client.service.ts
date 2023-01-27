import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CacheHttpOptions } from '../interfaces/cache-http-options';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class CacheHttpClientService {
    constructor(
        private httpClient: HttpClient,
        private localStorageService: LocalStorageService
    ) { }

    get<T>(options: CacheHttpOptions): Observable<T> {
        options.cacheMins = options.cacheMins || 0;

        if (options.cacheMins > 0) {
            const data = this.localStorageService.load(options.url);

            if (data !== null) {
                return of<T>(data);
            }
        }

        return this.httpClient.get<T>(options.url, { headers: options.httpHeaders }).pipe(
            switchMap(response => {
                if (options.cacheMins != undefined && options.cacheMins > 0) {
                    this.localStorageService.save({
                        key: options.url,
                        data: response,
                        expirationMins: options.cacheMins
                    });
                }

                return of<T>(response);
            })
        );
    }
}