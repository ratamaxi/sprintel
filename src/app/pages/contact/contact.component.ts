import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';

type HorarioItem = {
  dia: string;
  hora: string;
};

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  // Mostrado en la UI
  readonly phoneDisplay = '+54 9 11 7000-7600';

  // WhatsApp en formato internacional (sin +, sin espacios)
  readonly whatsappNumber = '5491170007600';

  // Email de contacto
  readonly email = 'informes@sprintel.com.ar';

  // Horario (lo que te faltaba)
  readonly horario: HorarioItem[] = [
    { dia: 'Lunes a Viernes', hora: '09:00 a 18:00' },
    { dia: 'Sábados', hora: 'Cerrado' },
    { dia: 'Domingos', hora: 'Cerrado' },
  ];

  // Links calculados
  get whatsappLink(): string {
    return `https://wa.me/${this.whatsappNumber}`;
  }

  get mailtoLink(): string {
    return `mailto:${this.email}`;
  }
}
