import { HttpHeaders } from "@angular/common/http";
import { environment } from "environments/environments";

export const eventManagementApiBaseUrl = environment.eventManagementApiUrl;

export const urlPaths = {

};

export const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export const multipartFormDataHttpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' })
};

export const xWwwFormUrlencodedHttpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};