import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RobotService {
  private apiUrl = 'http://localhost:4000/robots'; // L'URL de votre API backend

  constructor(private http: HttpClient) { }

  // GET: Récupérer tous les robots
  getAllRobots(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // GET: Récupérer un robot par son ID
  getRobotById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // POST: Ajouter un nouveau robot
  addRobot(newRobot: any): Observable<any> {
    return this.http.post(this.apiUrl, newRobot);
  }

  // PUT: Mettre à jour un robot existant
  updateRobot(id: number, updatedRobot: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, updatedRobot);
  }

  // DELETE: Supprimer un robot par son ID
  deleteRobot(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
