import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  // https://www.googleapis.com/youtube/v3/playlistItems
  url: string = "https://www.googleapis.com/youtube/v3";
  apiKey: string = "AIzaSyAUf08WwgF2RGnYNVsezd7By9GPAJELg_s";
  nextPage:string = "";


  constructor( private http:HttpClient ) { }

  public getVideos (): Observable<any> {

    let url = `${this.url}/playlistItems`;

    let params:any = {
      'part': 'snippet',
      'maxResults': '10',
      'playlistId': 'UUqwMD9d8T4TNeN5C6LZfCTw',
      'key': this.apiKey

    }
    
    if ( this.nextPage ) {
      params.pageToken = this.nextPage ;
    }

    return this.http.get ( url, {params}  ).pipe(
      map ( (response:any)=>{
        this.nextPage = response.nextPageToken;
        
        let videos: any[] = [];
        for ( let video of response.items ) {

          videos.push ( video.snippet);
          
        }

        return videos;

      }) 



    );


  }


}
