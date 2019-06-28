import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

import { Cliente } from './cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) { }

  getAll() {
    return this.db.list('clientes').snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
  }

  save(cliente: Cliente) {
    return this.db.list("clientes").push(cliente)
    // .then(
    //   res => {
    //     cliente.id = res.key;
    //     res.set(cliente);
    //   }
    // );
  }

  remove(key) {
    return this.db.list("clientes").remove(key);
  }

  update(key, cliente: Cliente) {
    return this.db.list("clientes").update(key, cliente);
  }

  get(key) {
    return this.db.object<Cliente>("clientes/" + key).valueChanges();
  }

  saveAuth(cliente: Cliente) {
    return this.afAuth.auth.createUserWithEmailAndPassword(cliente.email, cliente.pws);
  }

}