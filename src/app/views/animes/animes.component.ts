import { Component, OnInit, inject } from '@angular/core';
import { AnimesService } from './services/animes.service';
import { CreateResourceDialogComponent } from '../../components/create-resource-dialog/create-resource-dialog.component';
import { ResourceCardComponent } from '../../components/resource-card/resource-card.component';

@Component({
  selector: 'app-animes',
  standalone: true,
  imports: [CreateResourceDialogComponent, ResourceCardComponent],
  templateUrl: './animes.component.html',
  styleUrl: './animes.component.css',
})
export class AnimesComponent implements OnInit {
  private animesService = inject(AnimesService);

  $animes = this.animesService.getAnimes();

  ngOnInit() {
    this.getAnimesSubscription();
  }

  getAnimesSubscription() {
    this.animesService.getAnimesSubscription().subscribe({
      next: (animes) => this.animesService.setAnimes(animes),
    });
  }
}
