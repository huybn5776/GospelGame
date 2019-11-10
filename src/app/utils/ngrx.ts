import { Observable, of } from 'rxjs';

import { TypedAction } from '@ngrx/store/src/models';

export function onEffectError(
  err,
  action: ((props: { errorMsg: string }) => ({ errorMsg: string } & TypedAction<string>))
): Observable<any> {
  console.error(err);
  return of(action({errorMsg: err.message}));
}
