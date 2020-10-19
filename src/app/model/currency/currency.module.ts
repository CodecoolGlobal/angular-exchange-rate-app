import {Observable} from 'rxjs';

export class Currency {

  base: string;
  rate: string;
  img: string;
  amount: Observable<number>;

}
