import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MoviesModel } from 'src/model/movies';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  Firestore,
  updateDoc,
} from '@angular/fire/firestore';
import { Note } from 'src/model/note';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(
    private http: HttpClient,
    private firestore: Firestore,
    private auth: Auth
  ) {

  }

  getTopRatedMovies(page: number = 1): Observable<MoviesModel> {
    return this.http.get<MoviesModel>(
      `${environment.baseUrl}/movie/popular?api_key=${environment.apiKey}&page=${page}`
    );
  }

  getMoviesDetails(idMovie: any) {
    return this.http.get(
      `${environment.baseUrl}/movie/${idMovie}?api_key=${environment.apiKey}`
    );
  }

  getNotes(): Observable<Note[]> {
    const user = this.auth.currentUser;
    const notesRef = collection(this.firestore, `users/${user.uid}/notas`);
    return collectionData(notesRef, { idField: 'id' }) as Observable<Note[]>;
  }

  getNoteById(id): Observable<Note[]> {
    const user = this.auth.currentUser;
    const noteDocRef = doc(this.firestore, `users/${user.uid}/notas/${id}`);
    return docData(noteDocRef, { idField: 'id' }) as Observable<Note[]>;
  }

  addNote(note: Note) {
    const user = this.auth.currentUser;
    const notesRef = collection(this.firestore, `users/${user.uid}/notas`);
    return addDoc(notesRef, note);
  }

  updateNote(note: Note) {
    const user = this.auth.currentUser;
    const notesRef = doc(this.firestore, `users/${user.uid}/notas/${note.id}`);
    return updateDoc(notesRef, { title: note.title, text: note.text });
  }

  deleteNote(note: Note) {
    const user = this.auth.currentUser;
    const noteDocRef = doc(
      this.firestore,
      `users/${user.uid}/notas/${note.id}`
    );
    return deleteDoc(noteDocRef);
  }
}
