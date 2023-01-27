import { Injectable } from '@angular/core';
import { LocalStorageOptions } from '../interfaces/local-storage-save-options';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    save(options: LocalStorageOptions): void {
        options.expirationMins = options.expirationMins || 0;
        
        const expirationMS = options.expirationMins !== 0 ? options.expirationMins * 60 * 1000 : 0;

        const record = {
            value: typeof options.data === 'string'? options.data : JSON.stringify(options.data),
            expiration: expirationMS !== 0 ? new Date(Date.now() + expirationMS) : null,
            hasExpiration: expirationMS !== 0 ? true : false
        }

        localStorage.setItem(options.key, JSON.stringify(record));
    }

    load(key: string): any {
        const item = localStorage.getItem(key);

        if (item !== null) {
            const record = JSON.parse(item);
            const now = new Date().getTime();
            
            return !record || (record.hasExpiration && record.expiration <= now)
                ? null
                : JSON.parse(record.value);
        }

        return null;
    }

    remove(key: string): void {
        localStorage.removeItem(key);
    }

    cleanLocalStorage(): void {
        localStorage.clear();
    }
}