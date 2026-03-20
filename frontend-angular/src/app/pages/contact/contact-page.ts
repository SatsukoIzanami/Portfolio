import { Component } from '@angular/core';
import { PortfolioContactForm } from '../../components/portfolio-contact-form/portfolio-contact-form';

@Component({
  selector: 'app-contact-page',
  imports: [PortfolioContactForm],
  templateUrl: './contact-page.html',
  styleUrl: './contact-page.css'
})
export class ContactPage {}
