import { Injectable } from '@angular/core';
import {initializeApp} from "firebase/app";
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAdWqekkBtz7u3-MrbuYh0EDSHtHZB_H0Q",
  authDomain: "catalogo-images.firebaseapp.com",
  projectId: "catalogo-images",
  storageBucket: "catalogo-images.appspot.com",
  messagingSenderId: "170776833210",
  appId: "1:170776833210:web:083432b033b04edfa7e683"
};

const app = initializeApp(firebaseConfig);

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storage = getStorage()
  private storageRef = ref(this.storage, new Date().getMilliseconds().toString());

  constructor() { }
  async subirImagen(imgBase64:any):Promise<string>{
    try {
      await uploadBytes(this.storageRef, imgBase64)
      return await getDownloadURL(this.storageRef) // DEVUELVE EL URL DE LA IMAGEN
    } catch (e) {
      return e as string;
    }
  }
}
