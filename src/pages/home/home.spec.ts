import { async, fakeAsync, tick, TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import moment from 'moment';

import { HomePage } from './home';

describe('HomePage', () => {
  let fixture: ComponentFixture<HomePage>;
  let instance: HomePage;
  let storage: Storage;

  const navControllerStub = {};
  const storageStub = {
    get: (key: string): Promise<any> => Promise.resolve(undefined),
    set: (key: string, value: any): Promise<any> => Promise.resolve(undefined),
    clear: (): Promise<null> => Promise.resolve(null)
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [HomePage],
      providers: [{ provide: NavController, useValue: navControllerStub }, { provide: Storage, useValue: storageStub }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage);
    instance = fixture.debugElement.componentInstance;
    storage = fixture.debugElement.injector.get(Storage);
  });

  it('should create the home page', () => {
    expect(instance).toBeTruthy();
  });

  it('should show a title', () => {
    const h2: HTMLHeadingElement = fixture.debugElement.query(By.css('ion-title')).nativeElement;
    expect(h2.textContent).toContain('Home');
  });

  it('should show a greeting', () => {
    const h2: HTMLHeadingElement = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(h2.textContent).toContain('Testing Ionic2 with Jest!');
  });

  it("should show a link to the Ionic's home page", () => {
    const anchors: HTMLAnchorElement[] = fixture.debugElement
      .queryAll(By.css('a'))
      .map(a => a.nativeElement)
      .filter(a => a.href === 'https://ionicframework.com/');
    expect(anchors.length).toEqual(1);
  });

  it("should show a link to the Jest's home page", () => {
    const anchors: HTMLAnchorElement[] = fixture.debugElement
      .queryAll(By.css('a'))
      .map(a => a.nativeElement)
      .filter(a => a.href === 'https://facebook.github.io/jest/');
    expect(anchors.length).toEqual(1);
  });

  it('should open all links on a new tab', () => {
    const anchors: HTMLAnchorElement[] = fixture.debugElement.queryAll(By.css('a')).map(a => a.nativeElement);
    anchors.map(a => expect(a.target).toBe('_blank'));
  });

  it('should fetch undefined from the storage on init if nothing was stored previously', fakeAsync(() => {
    const spy = jest.spyOn(storage, 'get');
    instance.ngOnInit();
    tick();
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith('userName');
    expect(spy).toHaveBeenLastCalledWith('lastUpdated');
    expect(instance.userName).toBeUndefined();
    expect(instance.lastUpdated).toBeUndefined();
  }));

  it('should fetch the data previously stored on the storage on init', fakeAsync(() => {
    const spy = jest
      .spyOn(storage, 'get')
      .mockReturnValueOnce(Promise.resolve('John Doe'))
      .mockReturnValueOnce(Promise.resolve('2017-05-28T00:00:00.000Z'));
    instance.ngOnInit();
    tick();
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith('userName');
    expect(spy).toHaveBeenLastCalledWith('lastUpdated');
    expect(instance.userName).toBe('John Doe');
  }));
});
