import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowProfileComponent } from './show-profile.component';

describe('ShowProfileComponent', () => {
  let component: ShowProfileComponent;
  let fixture: ComponentFixture<ShowProfileComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ShowProfileComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have name "Pablo"', () => {
    expect(component.name).toEqual('Pablo');
  });
});