import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsvPanelPageComponent } from './csv-panel-page.component';

describe('CsvPanelPageComponent', () => {
  let component: CsvPanelPageComponent;
  let fixture: ComponentFixture<CsvPanelPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CsvPanelPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CsvPanelPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
