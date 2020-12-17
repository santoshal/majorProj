import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchQuizeComponent } from './search-quize.component';

describe('SearchQuizeComponent', () => {
  let component: SearchQuizeComponent;
  let fixture: ComponentFixture<SearchQuizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchQuizeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchQuizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
