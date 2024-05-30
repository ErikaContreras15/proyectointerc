

import { Injectable } from '@angular/core';
import { Libro } from '../domain/Libro';
import { CollectionReference, DocumentReference, addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Firestore, collectionData, docData } from '@angular/fire/firestore';
import { Observable, firstValueFrom } from 'rxjs';
import { AuthService } from './auth-service.service';



@Injectable({
  providedIn: 'root'
})
export class LibroService {
  
}


  