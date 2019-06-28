import { Address } from '../viacep/address';

export class Cliente {
    id: string;
    nome: string;
    email: string;
    pws: string;
    foto: string;
    ativo: boolean = true;
    endereco: Address = new Address;
}
