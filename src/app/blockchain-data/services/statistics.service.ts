import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { fromBlockchainDataStatisticsEntity } from './../entities/index.entity';
import { ChartsQuery, ServiceResponse } from './../blockchain-data.type';


@Injectable()
export class StatisticsService {

  private API_Path = 'https://api.blockchain.info/';

  constructor(private http: HttpClient) {}

  stats(): Observable<ServiceResponse<fromBlockchainDataStatisticsEntity.StatisticEntity>> {

    return this.http.get(`${this.API_Path}stats?cors=true`).pipe(
      map<any, ServiceResponse<fromBlockchainDataStatisticsEntity.StatisticEntity>>((response) => ({
        status: 200,
        response
      })),
      catchError((e) => of({
        status: e.status,
        response: null
      }))
    );
  }

  pools(timespan: string = '4days'): Observable<ServiceResponse<{ [key: string]: number; }>> {

    return this.http.get(`${this.API_Path}pools?cors=true&timespan=${timespan}`).pipe(
      map<any, ServiceResponse<{ [key: string]: number; }>>((response) => ({
        status: 200,
        response
      })),
      catchError((e) => of({
        status: e.status,
        response: null
      }))
    );
  }

  charts(query: ChartsQuery): Observable<ServiceResponse<any>> {

    const q = Object.entries({
      timespan: '1year',
      rollingAverage: '',
      start: '',
      format: 'json',
      sampled: true,
      ...query
    })
    .filter(entry => entry[1] !== '')
    .map((entry) => {
      const [key, value] = entry;
      return `&${key}=${value}`;
    })
    .join('');

    return this.http.get(`${this.API_Path}charts/${query.name}/?cors=true${q}`).pipe(
      map<any, ServiceResponse<any>>((response) => ({
        status: 200,
        response
      })),
      catchError((e) => of({
        status: e.status,
        response: null
      }))
    );
  }
}
