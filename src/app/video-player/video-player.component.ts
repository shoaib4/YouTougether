import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {

  constructor() { }
  public YT : any;
  public player : any;
  public video : any;
  public reframed : Boolean = false;
  public ratioPosition : number = 0;

  isRestricted = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  ngOnInit(): void {
    this.video = 'nRiOw3qGYq4'
    this.init();
    this.getRatioPosition.bind(this)();
  }
  getRatioPosition(){
    // if (window['YT'].PlayerState.PLAYING) {
    //   console.log(this.player.getCurrentTime());
    //   setTimeout(this.getRatioPosition,200);
    // }
    setInterval(() => {
      // console.log(1)
      console.log(window['YT'].Player)
      console.log(this.player.getCurrentTime)
      if(this.player && this.player.getCurrentTime && this.player.getDuration){
        console.log(this.player.getCurrentTime() ,this.player.getDuration() )
        this.ratioPosition = this.player.getDuration() > 0 ? (this.player.getCurrentTime() / this.player.getDuration() ) *100 : 0;
      }
    },200)
  }

  init(){
    if (window['YT']) {
      this.startVideo();
      return;
    }

    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window['onYouTubeIframeAPIReady'] = () => this.startVideo();
  }

  startVideo(){
    this.reframed = false;
    this.player = new window['YT'].Player('player',{
      videoId : this.video,
      playerVars : {
        autoplay : 0,
        modestbranding: 1,
        controls: 0,
        disablekb: 1,
        rel: 0,
        showinfo:0,
        fs:0,
        playsinline: 1
      },
      events: {
        'onStateChange': this.onPlayerStateChange,
        'onError': this.onPlayerError,
        'onReady': this.onPlayerReady,
      }
    })
    // this.player.addEventListener("onStateChange", this.getRatioPosition);
  }

  onPlayerReady(event) {
    if (this.isRestricted) {
      event.target.mute();
      event.target.playVideo();
    } else {
      event.target.playVideo();
    }
  }

  onPlayerStateChange(event) {
    console.log(event);
    console.log(this.player.getCurrentTime)
    switch(event.data){
      case window['YT'].PlayerState.PLAYING:
        if(this.cleanTime() == 0){
          console.log('started' + this.cleanTime())
        }else {
          console.log('playing '+ this.cleanTime())
        }
        break;
      case window['YT'].PlayerState.PAUSED:
        if( this.player.getDuration() - this.player.getCurrentTime() != 0) {
          console.log('paused' + ' # ' + this.cleanTime());
        }
        break;
      case window['YT'].PlayerState.ENDED:
        console.log('ended');
        break;
    }
    // this.getRatioPosition()
  }
  cleanTime() {
    return Math.round(this.player.getCurrentTime())
  }
  onPlayerError(event){
    switch (event.data){
      case 2:
        console.log(''+this.video)
        break
      case 100:
        break
      case 101 || 150:
        break
    }
  }

  stopVideo() {
    this.player.stopVideo();
  }

}

