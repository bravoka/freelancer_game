import { Component, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
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

  @HostListener('window: keydown', ['$event'])

  keyEvent(event: KeyboardEvent) {
    console.log(event);

    if (event.keyCode === 39)
    {
      console.log('right');
      this.movePos(1, 0);
    }
    else if (event.keyCode === 37) {
      console.log('kleft');
      this.movePos(-1, 0);
    }
    else if (event.keyCode === 40) {
      console.log('down');
      this.movePos(0, 1);
    }
    else if (event.keyCode === 38) {
      console.log('up');
      this.movePos(0, -1);
    }


  }

  // @ViewChild('myImg') imgRef: ElementRef;

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
  	// this.img = this.imgRef as HTMLImageElement;
  	// this.context = this.room[0].getContext('2d');
  	console.log(this.room);
  	console.log(this.context);
  	this.img = document.getElementById('myImg2') as HTMLImageElement;
  	this.img.src = 'assets/bravoka.png';


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

  movePos(x: number, y: number): void {
  	this.pos.X += x;
  	this.pos.Y += y;
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
	StartingPosition: number;
	Width: number;
	Height: number;
}

export class Map {

}