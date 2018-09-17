import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { MyApp } from './app.component';

describe('MyApp', () => {
  let component: MyApp;
  let fixture: ComponentFixture<MyApp>;

  beforeEach(async(() => {
      TestBed.configureTestingModule({
          declarations: [ MyApp ]
      });
      fixture = TestBed.createComponent(MyApp);
      component = fixture.componentInstance;
  }));

  test('should exist', () => {
      expect(component).toBeDefined();
  });
});