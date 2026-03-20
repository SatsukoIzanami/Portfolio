import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { InteractiveShowcase } from '../../components/interactive-showcase/interactive-showcase';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink, InteractiveShowcase],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})
export class HomePage {}
