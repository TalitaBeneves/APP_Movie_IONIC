import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  addDoc,
  collection,
  collectionData,
  doc,
  docData,
  Firestore,
  setDoc,
} from '@angular/fire/firestore';
import { getDownloadURL, ref, Storage } from '@angular/fire/storage';
import { Photo } from '@capacitor/camera';
import { uploadString } from '@firebase/storage';

@Injectable({
  providedIn: 'root',
})
export class AvatarService {
  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private storage: Storage
  ) {}

  getUserProfile() {
    const user = this.auth.currentUser;
    const userDocRef = doc(this.firestore, `users/${user.uid}`);
    return docData(userDocRef);
  }

  getBackgroundImg() {
    const user = this.auth.currentUser;
    const backImg = collection(this.firestore, `users/${user.uid}/imagem/`);
    return collectionData(backImg, { idField: 'id' });
  }

  async uploadImage(cameraFile: Photo) {
    const user = this.auth.currentUser;
    const path = `uploads/${user.uid}/profile.png`;
    const storageRef = ref(this.storage, path);

    try {
      await uploadString(storageRef, cameraFile.base64String, 'base64');
      const imageUrl = await getDownloadURL(storageRef);
      const userDocRef = doc(this.firestore, `users/${user.uid}`);
      await setDoc(userDocRef, {
        imageUrl,
      });
      return true;
    } catch (error) {
      return null;
    }
  }

  async uploadbImage(cameraFile: Photo) {
    const user = this.auth.currentUser;
    const path = `uploads/${user.uid}/background.png`;
    const storageRef = ref(this.storage, path);

    try {
      await uploadString(storageRef, cameraFile.base64String, 'base64');
      const backgroundUrl = await getDownloadURL(storageRef);
      const backColection = collection(this.firestore, `users/${user.uid}/imagem`);
      const backSerDoc = doc(
        this.firestore,
        `users/${user.uid}/imagem/${user.uid}`
      );

      await setDoc(backSerDoc, {
        backgroundUrl,
      });
      return true;
    } catch (error) {
      return null;
    }
  }
}
