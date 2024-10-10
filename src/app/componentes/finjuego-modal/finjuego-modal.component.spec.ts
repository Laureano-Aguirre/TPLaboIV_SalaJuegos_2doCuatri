import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinjuegoModalComponent } from './finjuego-modal.component';

describe('FinjuegoModalComponent', () => {
  let component: FinjuegoModalComponent;
  let fixture: ComponentFixture<FinjuegoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinjuegoModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinjuegoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
