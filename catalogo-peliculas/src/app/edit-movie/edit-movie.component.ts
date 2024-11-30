import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importar FormsModule para usar ngModel

@Component({
  selector: 'app-edit-movie',
  standalone: true, // Declarar como standalone
  imports: [CommonModule, FormsModule], // Importar módulos necesarios
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {
  movie: any = {};

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.get(`http://127.0.0.1:8000/api/movies/${id}`).subscribe((data: any) => {
      this.movie = data;
    });
  }

  onSubmit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.put(`http://127.0.0.1:8000/api/movies/${id}`, this.movie).subscribe(() => {
      alert('Película actualizada con éxito');
      this.router.navigate(['/movies']);
    });
  }
}
