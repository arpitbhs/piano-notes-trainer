import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrotchetComponent } from './crotchet.component';

describe('CrotchetComponent', () => {
  let component: CrotchetComponent;
  let fixture: ComponentFixture<CrotchetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrotchetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrotchetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
