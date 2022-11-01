import { TestBed } from '@angular/core/testing';

import { LogParserService } from './log-parser.service';

describe('LogParserService', () => {
  let service: LogParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
