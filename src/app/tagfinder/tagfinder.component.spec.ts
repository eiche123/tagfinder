import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagfinderComponent } from './tagfinder.component';

describe('TagfinderComponent', () => {
  let component: TagfinderComponent;
  let fixture: ComponentFixture<TagfinderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagfinderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagfinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
