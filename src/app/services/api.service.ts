import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  
  constructor(private http: HttpClient) { }

  public getSources(){
    return this.http.get("https://newsapi.org/v2/sources?language=en&apiKey=" + environment.apiKey);
  }

  public getArticlesBySource(source: string){
    return this.http.get("https://newsapi.org/v2/top-headlines?sources=" + source + "&language=en&apiKey=" + environment.apiKey);
  }

  public getArticles(){
    return this.http.get("https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=" + environment.apiKey);
  }


}
