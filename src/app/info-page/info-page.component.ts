import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-info-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <main class="info">
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
    </main>
  `,
  styles: [
    `
      .info {
        padding: 80px 24px;
        text-align: center;
      }

      .info h1 {
        font-size: 32px;
        margin-bottom: 12px;
      }

      .info p {
        color: #5b637a;
      }
    `
  ]
})
export class InfoPageComponent {
  title = '';
  description = '';

  constructor(private readonly route: ActivatedRoute) {
    this.route.data.subscribe(data => {
      this.title = data['title'] ?? 'Sección en construcción';
      this.description = data['description'] ?? 'Muy pronto encontrarás más información aquí.';
    });
  }
}
