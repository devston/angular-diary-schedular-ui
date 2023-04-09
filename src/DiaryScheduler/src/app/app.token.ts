import {InjectionToken} from '@angular/core';

export const APP_STORAGE_KEYS = new InjectionToken<string[]>('StoreKeys');
export const APP_LOCAL_STORAGE_KEY = new InjectionToken<string[]>('appStorage');
