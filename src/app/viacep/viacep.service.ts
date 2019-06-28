import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Address } from './address';

@Injectable({
  providedIn: 'root'
})
export class ViacepService {

  private address:Address = new Address

  constructor(
    private http: HttpClient
  ) { }

  public onClickZipcode(zipcode: string) {
    zipcode = zipcode.replace('-', '');
    if (zipcode.length === 8) {
      //let address: Address;
      this.http.get<Address>(`https://viacep.com.br/ws/${zipcode}/json/`)
        .subscribe(
          res => {
            if (res.erro === true) {
              this.address = null
            } else {
              this.address = res
            }
            console.log(this.address);
          },
          error => {
            console.log('Error: ${error.message}.', 'Ops...');
          }
        );
      return this.address
    }
  }
}