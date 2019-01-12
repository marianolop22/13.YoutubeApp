import { Component, OnInit } from '@angular/core';
import { YoutubeService } from 'src/app/services/youtube.service';

declare var $:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public videos:any[]= [];
  public videoSel: any = "";

  constructor( private _youtube: YoutubeService )  { 

    this._youtube.getVideos ().subscribe ( 
      response => {
        this.videos = response;
    }, reject => {
        console.log ( reject );

    })
  }

  ngOnInit() {
  }

  public verVideo ( video: string) {
    this.videoSel = video;
    $('#myModal').modal();
  }

  public cerrarModal () {
    this.videoSel = null;
    $('#myModal').modal('hide');
  }

  public cargar () {

    this._youtube.getVideos ().subscribe ( 
      response => {
        this.videos.push.apply (this.videos, response );
        console.log (this.videos)
    }, reject => {
        console.log ( reject );

    })
  }



}
