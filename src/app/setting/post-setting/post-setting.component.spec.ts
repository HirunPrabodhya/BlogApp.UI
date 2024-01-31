import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostSettingComponent } from './post-setting.component';

describe('PostSettingComponent', () => {
  let component: PostSettingComponent;
  let fixture: ComponentFixture<PostSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostSettingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
