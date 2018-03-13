import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { fromBlockchainDataStatisticsEntity } from './../entities/index.entity';


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

  charts(
    name: string,
    timespan: string = '1year',
    rollingAverage: string = '',
    start: string = '',
    format: string = 'json',
    sampled: boolean = true
  ): Observable<any> {

    return this.http.get<any>(`${this.API_Path}charts/${name}/?cors=true
      &timespan=${timespan}
      &rollingAverage=${rollingAverage}
      &start=${start}
      &format=${format}
      &sampled=${sampled}`
    );
  }
}
