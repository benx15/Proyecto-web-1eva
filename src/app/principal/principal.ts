import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './principal.html',
  styleUrls: ['./principal.css'],
})
export class Principal {

}
