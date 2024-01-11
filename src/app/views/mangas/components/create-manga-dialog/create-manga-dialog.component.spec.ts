import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMangaDialogComponent } from './create-manga-dialog.component';

describe('CreateMangaDialogComponent', () => {
  let component: CreateMangaDialogComponent;
  let fixture: ComponentFixture<CreateMangaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateMangaDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateMangaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
