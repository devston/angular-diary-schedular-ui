import { TestBed } from "@angular/core/testing";
import { LocalStorageOptions } from "../interfaces/local-storage-save-options";
import { LocalStorageService } from "./local-storage.service";

describe("LocalStorageService", () => {
    let service: LocalStorageService;
    
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(LocalStorageService);
    });

    afterEach(() => {
        localStorage.clear();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('save', () => {
        it('should save item in local storage', () => {
            const someValue1 = { id: 1, name: 'ABC' };
            const options: LocalStorageOptions = {
                data: someValue1,
                key: 'someItem'
            };

            service.save(options);
            const cachedValue = JSON.parse(localStorage.getItem('someItem') as string);

            expect(localStorage.length).toEqual(1);
            expect(cachedValue).not.toBeNull();
        });

        it('should save item with expiration date in local storage', () => {
            const someValue1 = { id: 1, name: 'ABC' };
            const options: LocalStorageOptions = {
                data: someValue1,
                key: 'someItem',
                expirationMins: 5
            };

            service.save(options);
            const cachedValue = JSON.parse(localStorage.getItem('someItem') as string);

            expect(localStorage.length).toEqual(1);
            expect(cachedValue).not.toBeNull();
            expect(cachedValue.hasExpiration).toBeTrue();
            expect(cachedValue.expiration).toBeGreaterThan(new Date().getTime());
        });

        it('should save item without expiration date in local storage', () => {
            const someValue1 = { id: 1, name: 'ABC' };
            const options: LocalStorageOptions = {
                data: someValue1,
                key: 'someItem'
            };

            service.save(options);
            const cachedValue = JSON.parse(localStorage.getItem('someItem') as string);

            expect(localStorage.length).toEqual(1);
            expect(cachedValue).not.toBeNull();
            expect(cachedValue.hasExpiration).toBeFalse();
        });
    });

    describe('load', () => {
        it('should return item from local storage if exists and has no expiration date', () => {
            const someValue1 = { id: 1, name: 'ABC' };
            const options = {
                value: JSON.stringify(someValue1),
                hasExpiration: false,
                expiration: null
            };

            localStorage.setItem('someItem', JSON.stringify(someValue1));
            
            const result = service.load('someItem');

            expect(result).not.toBeNull();
            expect(result.id).toBe(1);
            expect(result.name).toBe('ABC');
        });

        it('should return item from local storage if exists and has not expired', () => {
            const someValue1 = { id: 1, name: 'ABC' };
            const options = {
                value: JSON.stringify(someValue1),
                hasExpiration: false,
                expiration: new Date().getTime() + 99999999
            };

            localStorage.setItem('someItem', JSON.stringify(someValue1));
            
            const result = service.load('someItem');

            expect(result).not.toBeNull();
            expect(result.id).toBe(1);
            expect(result.name).toBe('ABC');
        });

        it('should return null if item exists and has expired', () => {
            const someValue1 = { id: 1, name: 'ABC' };
            const options = {
                value: JSON.stringify(someValue1),
                hasExpiration: false,
                expiration: new Date().getTime() - 99999999
            };

            localStorage.setItem('someItem', JSON.stringify(someValue1));
            
            const result = service.load('someItem');

            expect(result).toBeNull();
        });

        it('should return null if item doesn\'t exist', () => {
            const someValue1 = { id: 1, name: 'ABC' };
            const options = {
                value: JSON.stringify(someValue1),
                hasExpiration: false,
                expiration: new Date().getTime() + 99999999
            };

            localStorage.setItem('someItem', JSON.stringify(someValue1));
            
            const result = service.load('someItemThatIsntWhatWeAdded');

            expect(result).toBeNull();
        });
    });

    describe('remove', () => {
        it('should remove item from local storage', () => {
            const someValue1 = { id: 1, name: 'ABC' };
            const someValue2 = { id: 2, name: 'DEF' };
            localStorage.setItem('someItem1', JSON.stringify(someValue1));
            localStorage.setItem('someItem2', JSON.stringify(someValue2));

            service.remove('someItem1');

            expect(localStorage.length).toBe(1);
        });
    });

    describe('clean local storage', () => {
        it('should clear local storage', () => {
            const someValue1 = { id: 1, name: 'ABC' };
            localStorage.setItem('someItem1', JSON.stringify(someValue1));
            
            service.cleanLocalStorage();

            expect(localStorage.length).toBe(0);
        });
    });
});