import {Observable} from 'rxjs';

export class Currency {

  base: string;
  result: string;
  img: string;
  amount: Observable<number>;

}
