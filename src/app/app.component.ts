import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { PlayerService } from './services/player.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  currentRoom: Room;

  pos: PlayerPosition;

  // private imgEle: HTMLImageElement;

  @ViewChild('myRoom') room: HTMLCanvasElement;



  // @ViewChild('myImg') img: ElementRef;

  public context: CanvasRenderingContext2D;

  // public imgE: HTMLImageElement;

  img: HTMLImageElement;

  constructor(private playerService: PlayerService) {
  	// player starting position


  	this.pos = new PlayerPosition();
  	// this.img.src = 'assets/bravoka.png';
  	// this.img 'assets/bravoka.png';
  	// this.imgEle = this.img.nativeElement;
  	// this.imgEle.src = 'assets.bravoka.png';
  	// this.imgE = (<HTMLImageElement>this.img.nativeElement) as HTMLImageElement;




  }

  ngAfterViewInit() {
  	this.context = this.room['nativeElement'].getContext('2d');
  	// this.context = this.room[0].getContext('2d');
  	console.log(this.room);
  	console.log(this.context);
  	this.img = document.getElementById('myImg2') as HTMLImageElement;
  	this.img.src = 'assets/bravoka.png';
  	// this.context.drawImage(this.img,100,100,50,50);
  }

  getPlayer(): void {
  	console.log(this.playerService.player);
  }

  draw(): void {
  	this.context.fillRect(100,100,150,80);
  	this.context.fillText('hello world', 200, 200);
  }

  drawImg(): void {
  	this.context.clearRect(0, 0, this.room['nativeElement'].width, this.room['nativeElement'].height)
  	this.context.drawImage(this.img, this.pos.X, this.pos.Y, 10, 10);
  }

  movePos(): void {
  	this.pos.X++;
  	this.pos.Y++;
  	this.drawImg();
  	
  }
}

export class PlayerPosition {
  X: number;
  Y: number;

  constructor() {
  	this.X = 0;
  	this.Y = 0;
  }

  jumpPosition(x: number, y: number) {
  	this.X = x;
  	this.Y = y;
  }
}

export class Room {

}

export class Map {

}