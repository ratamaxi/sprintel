import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TejidoArtisticoComponent } from './tejido-artistico.component';

describe('TejidoArtisticoComponent', () => {
  let component: TejidoArtisticoComponent;
  let fixture: ComponentFixture<TejidoArtisticoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TejidoArtisticoComponent]
    });
    fixture = TestBed.createComponent(TejidoArtisticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
