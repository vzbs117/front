import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationlistComponent } from './translationlist.component';

describe('TranslationlistComponent', () => {
  let component: TranslationlistComponent;
  let fixture: ComponentFixture<TranslationlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TranslationlistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TranslationlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
