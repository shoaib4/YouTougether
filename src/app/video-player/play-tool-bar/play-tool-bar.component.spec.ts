import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayToolBarComponent } from './play-tool-bar.component';

describe('PlayToolBarComponent', () => {
  let component: PlayToolBarComponent;
  let fixture: ComponentFixture<PlayToolBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayToolBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayToolBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
