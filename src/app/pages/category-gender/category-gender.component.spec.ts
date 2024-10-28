import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryGenderComponent } from './category-gender.component';

describe('CategoryGenderComponent', () => {
  let component: CategoryGenderComponent;
  let fixture: ComponentFixture<CategoryGenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryGenderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryGenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
