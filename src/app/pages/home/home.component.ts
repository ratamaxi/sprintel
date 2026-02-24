import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';

type Slide = {
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  subtitle: string;
};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  slides: Slide[] = [
    {
      image: '../../../assets/img/imgHome.jpg',
      alt: 'Plano de trabajo y diseño',
      eyebrow: 'TELAS METÁLICAS',
      title: 'DE CALIDAD',
      subtitle: 'Fabricación y venta de tejidos metálicos para todo tipo de aplicaciones.',
    },
    {
      image: '../../../assets/img/imgSomos1.jpg',
      alt: 'Equipo trabajando',
      eyebrow: 'EXPERIENCIA',
      title: 'QUE RESPALDA',
      subtitle: 'Décadas de trayectoria que se reflejan en terminaciones precisas y calidad constante.',
    },
    {
      image: '../../../assets/img/imgSomos2.jpg',
      alt: 'Logística y entrega',
      eyebrow: 'SERVICIO',
      title: 'A MEDIDA',
      subtitle: 'Asesoramiento cercano y entregas ágiles para acompañar cada proyecto.',
    },
  ];

  currentIndex = 0;

  private intervalId: number | null = null;
  private readonly intervalMs = 2500; // ✅ 2.5 segundos

  ngOnInit(): void {
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  // autoplay
  private startAutoPlay(): void {
    if (this.intervalId !== null) return;
    this.intervalId = window.setInterval(() => this.next(), this.intervalMs);
  }

  private stopAutoPlay(): void {
    if (this.intervalId === null) return;
    window.clearInterval(this.intervalId);
    this.intervalId = null;
  }

  private restartAutoPlay(): void {
    this.stopAutoPlay();
    this.startAutoPlay();
  }

  // navigation
  next(): void {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }

  nextManual(): void {
    this.next();
    this.restartAutoPlay();
  }

  prev(): void {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.restartAutoPlay();
  }

  goTo(index: number): void {
    this.currentIndex = index % this.slides.length;
    this.restartAutoPlay();
  }

  // hover pause
  pause(): void {
    this.stopAutoPlay();
  }

  resume(): void {
    this.startAutoPlay();
  }
}
