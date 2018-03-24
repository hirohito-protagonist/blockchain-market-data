import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { fromBlockchainDataStatisticsEntity } from './../entities/index.entity';
import { ChartsQuery } from './../blockchain-data.type';


@Injectable()
export class StatisticsService {

  private API_Path = 'https://api.blockchain.info/';

  constructor(private http: HttpClient) {}

  stats(): Observable<fromBlockchainDataStatisticsEntity.StatisticEntity> {

    return this.http.get<fromBlockchainDataStatisticsEntity.StatisticEntity>(`${this.API_Path}stats?cors=true`);
  }

  pools(timespan: string = '4days'): Observable<{ [key: string]: number; }> {

    return this.http.get<{ [key: string]: number; }>(`${this.API_Path}pools?cors=true&timespan=${timespan}`);
  }

  charts(query: ChartsQuery): Observable<any> {

    const q = {
      timespan: '1year',
      rollingAverage: '',
      start: '',
      format: 'json',
      sampled: true,
      ...query
    };

    return this.http.get<any>(`${this.API_Path}charts/${q.name}/?cors=true` + [
      `&timespan=${q.timespan}`,
      `&rollingAverage=${q.rollingAverage}`,
      `&start=${q.start}`,
      `&format=${q.format}`,
      `&sampled=${q.sampled}`
    ].join(''));
  }
}
