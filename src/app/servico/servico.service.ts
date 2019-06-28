import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

import { Servico } from './servico';

@Injectable({
  providedIn: 'root'
})
export class ServicoService {

  constructor(private db: AngularFireDatabase) { }

  getAll() {
    return this.db.list('servicos').snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
  }

  save(servico: Servico) {
    return this.db.list("servicos").push(servico)
      // .then(
      //   res => {
      //     servico.id = res.key;
      //     res.set(servico);
      //   }
      // );
  }

  
  remove(key) {
    return this.db.list("servicos").remove(key);
  }

  update(key, servico: Servico) {
    return this.db.list("servicos").update(key, servico);
  }

  get(key) {
    return this.db.object<Servico>("servicos/" + key).valueChanges();
  }

}