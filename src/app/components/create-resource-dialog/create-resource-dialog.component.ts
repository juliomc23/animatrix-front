import { NgClass } from '@angular/common';
import { Component, Input, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-resource-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './create-resource-dialog.component.html',
  styleUrl: './create-resource-dialog.component.css',
})
export class CreateResourceDialogComponent implements OnInit {
  @Input({ required: true }) resourceType!: 'anime' | 'manga';
  $resourceModalOpen = signal<boolean>(false);

  resourceFormGroup!: FormGroup;

  ngOnInit(): void {
    this.asignFormGroup();
  }

  createResource() {
    // TODO
  }

  closeModal() {
    // TODO
    this.$resourceModalOpen.set(false);
  }

  openModal() {
    // TODO
    this.$resourceModalOpen.set(true);
  }

  private asignFormGroup(): void {
    if (this.resourceType === 'anime')
      this.resourceFormGroup = new FormGroup({
        name: new FormControl(''),
        episode: new FormControl(),
        episodeMinute: new FormControl(),
        nextEpisode: new FormControl(null),
        url: new FormControl(''),
        comment: new FormControl(null),
      });

    if (this.resourceType === 'manga')
      this.resourceFormGroup = new FormGroup({
        name: new FormControl(''),
        chapter: new FormControl(),
        chapterPage: new FormControl(),
        nextChapter: new FormControl(null),
        url: new FormControl(''),
        comment: new FormControl(null),
      });

    console.log(this.resourceFormGroup);
  }
}
