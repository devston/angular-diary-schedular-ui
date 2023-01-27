import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CacheHttpClientService } from './cache-http-client.service';

describe('CacheHttpClientService', () => {
    let service: CacheHttpClientService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [CacheHttpClientService]
        });

        service = TestBed.inject(CacheHttpClientService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});