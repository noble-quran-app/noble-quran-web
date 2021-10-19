import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { delay, retryWhen, scan } from 'rxjs/operators';

export function retryTimes<T>(times: number, delayTime = 0): MonoTypeOperatorFunction<T> {
  return (subscriber: Observable<T>) =>
    subscriber.pipe(
      retryWhen((err) =>
        err.pipe(
          delay(delayTime),
          scan((acc) => {
            if (acc >= times) throw err;
            return acc + 1;
          }, 0)
        )
      )
    );
}
