import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClothingRankingComponent } from './clothing-ranking.component';

describe('ClothingRankingComponent', () => {
  let component: ClothingRankingComponent;
  let fixture: ComponentFixture<ClothingRankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClothingRankingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClothingRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
