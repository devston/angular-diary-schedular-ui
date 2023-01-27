import { HttpHeaders } from "@angular/common/http";

export interface CacheHttpOptions {
    url: string;
    httpHeaders?: HttpHeaders;
    cacheMins?: number;
}