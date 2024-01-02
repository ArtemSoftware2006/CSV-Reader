import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllFilesPageComponent } from './all-files-page.component';

describe('AllFilesPageComponent', () => {
  let component: AllFilesPageComponent;
  let fixture: ComponentFixture<AllFilesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllFilesPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllFilesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
