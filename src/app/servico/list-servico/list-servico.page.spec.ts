import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListServicoPage } from './list-servico.page';

describe('ListServicoPage', () => {
  let component: ListServicoPage;
  let fixture: ComponentFixture<ListServicoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListServicoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListServicoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
