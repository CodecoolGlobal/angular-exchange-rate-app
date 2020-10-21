import {Observable} from 'rxjs';

export interface Currency {

  base: string;
  result: string;
  img: string;
  amount: Observable<number>;

}
