import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';

const platformStub = {
  ready: (): Promise<string> => new Promise<string>((resolve, reject) => resolve('ready'))
};

const statusBarStub = {
  styleDefault: (): void => undefined
};
const splashScreenStub = {
  hide: (): void => undefined
};

describe('MyApp', () => {
  let instance: MyApp;
  let fixture: ComponentFixture<MyApp>;
  let storage: Storage;

  const storageStub = {
    get: (key: string): Promise<any> => Promise.resolve(undefined),
    set: (key: string, value: any): Promise<any> => Promise.resolve(undefined),
    clear: (): Promise<null> => Promise.resolve(null)
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [MyApp],
      providers: [
        { provide: Platform, useValue: platformStub },
        { provide: StatusBar, useValue: statusBarStub },
        { provide: SplashScreen, useValue: splashScreenStub },
        { provide: Storage, useValue: storageStub }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyApp);
    instance = fixture.debugElement.componentInstance;
    storage = fixture.debugElement.injector.get(Storage);
  });

  it('should create the root page', () => {
    expect(instance).toBeTruthy();
  });

  it('should create the root page with two pages with title predefined', () => {
    expect(instance.pages[0].title).toStrictEqual('Home');
    expect(instance.pages[1].title).toStrictEqual('List');
    expect(instance.splashScreen).toBeTruthy();
    expect(instance.statusBar).toBeTruthy();
  });

  it('should create the root page with splashscreen and status bar', () => {
    expect(instance.splashScreen).toBeTruthy();
    expect(instance.statusBar).toBeTruthy();
  });
});
