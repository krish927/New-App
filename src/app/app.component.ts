import { Component, ViewChild, AfterViewInit, ChangeDetectorRef, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ApiService } from './services/api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit{
  title = 'news-app';
  sources: any = [];
  articles: any = [];
  selectedChannel: string = "Top 10 Trending News"
  @ViewChild(MatSidenav) sideNav: MatSidenav;
  msg: string;
  msgColor: string;
  selected:any = 0;

  constructor(private observer: BreakpointObserver, private cdr: ChangeDetectorRef, private api: ApiService){}

  ngOnInit(): void {
    this.getSources();
    this.getArticles();
  }

  ngAfterViewInit(): void {
    this.sideNav.opened = true;
    this.observer.observe(['(max-width: 767px)']).subscribe((data) => {
      console.log(data);
      if(data?.matches){
        this.sideNav.mode = "over";
        this.sideNav.close();
      }else{
        this.sideNav.mode = "side";
        this.sideNav.open();
      }
    })
    this.cdr.detectChanges();
  }

  getSources(){
    this.api.getSources().subscribe((data: any) => {
      if(data.status === "ok"){
        this.sources = data.sources;
      }
      
    })
  }
  getArticles(){
    this.api.getArticles().subscribe((data: any) => {
      if(data.status === "ok"){
        this.articles = data.articles;
      }
      
    })
  }

  searchSource(source: any){
    this.api.getArticlesBySource(source.id).subscribe((data: any) => {
      if(data.status === "ok"){
        this.articles = data.articles;
        this.selectedChannel = source.name;
      }
    })
  }

  
  // realityCheck(article: any,index:any){
  //     const obj ={
  //       news: article.content
  //     }
  //     console.log(obj);
      
  //     this.api.realityCheck(obj).subscribe((data: any) => {
  //       console.log(data);
  //       let arr = []
  //       for (const key in data) {
  //         if (Object.prototype.hasOwnProperty.call(data, key)) {
  //           const element = data[key].replaceAll(' ','_').toLowerCase();
  //           arr.push(element)
  //         }
  //       }
  //       console.log(arr);
  //       const elementCounts = {}
  //       arr.forEach(item=>{
  //         elementCounts[item] = (elementCounts[item] || 0) + 1;
  //       })
  //       console.log(elementCounts);
  //       if(elementCounts['fake_news'] > 2){
  //         this.msg = "Fake News";
  //         this.msgColor = "rgb(185 28 28)";
  //       }else if(elementCounts['fake_news'] ==  2){
  //         this.msg = "Not Sured";
  //         this.msgColor = "rgb(234 179 8)";
  //       }else{
  //         this.msg = "Not A Fake News";
  //         this.msgColor = "rgb(34 197 94)";
  //       }
  //       this.selected = index;
  //     })
  //   }
    
   
}
