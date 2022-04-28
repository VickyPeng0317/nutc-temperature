
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


export function Post (actionInfo: ApiActionInfo) {
  return function (target: any, name: any) {
    target[name] = getResponseFunction(actionInfo, 'Post');
  };
}

export function Get (actionInfo: ApiActionInfo) {
  return function (target: any, name: any) {
    target[name] = getResponseFunction(actionInfo, 'Get');
  };
}

function getResponseFunction(actionInfo: ApiActionInfo, type: 'Get' | 'Post') {
  const { path, mockData, alwaysMock} = actionInfo;
  const apiUrl = environment.nutcApi;
  const hasMockData = !!mockData;
  const useMock = alwaysMock || environment.isMock;
  const functionStrategy = [
    {
      logic: hasMockData && useMock,
      function: function (): Observable<any> {
        return of(mockData).pipe(delay(300));
      },
      http: {}
    },
    {
      logic: true,
      function: function (params = {params: JSON.stringify({})}): Observable<any> {
        return type === 'Get'
          ? this.http.get(apiUrl + path)
          : this.http.post(apiUrl + path, params);
      },
      http: <any>{}
    }
  ];
  const matchStrategy = functionStrategy.find(strategy => strategy.logic);
  return matchStrategy?.function;
}

export interface ApiActionInfo {
  /**
   * api path
   */
  path: string;
  /**
   * mock data
   */
  mockData?: any;
  /**
   * 一直 mock
   */
  alwaysMock?: boolean;
}

export type ApiAction<Req, Res> = (params: Req) => Observable<Res>;
