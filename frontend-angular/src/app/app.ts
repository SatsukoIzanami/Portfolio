import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PortfolioNav } from './layout/portfolio-nav/portfolio-nav';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PortfolioNav],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
