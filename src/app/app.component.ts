import { Component, ViewChild, ElementRef, AfterViewInit, HostListener, Renderer2 } from '@angular/core';
import { PlayerService } from './services/player.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  currentRoom: Room;

  collisionX: boolean;
  collisionY: boolean;

  collision: boolean;

  // playerPos: Point;

  player: Rectangle;
  obstacle: Rectangle;

  // playerWidth: number = 10;
  // playerHeight: number = 10;

  // obstaclePos: Point;

  // obstacleWidth: number = 15;
  // obstacleHeight: number = 15;

  obst: HTMLImageElement;
  // private imgEle: HTMLImageElement;

  moveSpeed: number = 1;

  @ViewChild('myRoom') room: HTMLCanvasElement;

  @HostListener('window: keydown', ['$event'])

  keyEvent(event: KeyboardEvent) {
    // console.log(event);

    if (event.keyCode === 39)
    {
      // console.log('right');
      this.movePos(1, 0);
    }
    else if (event.keyCode === 37) {
      // console.log('kleft');
      this.movePos(-1, 0);
    }
    else if (event.keyCode === 40) {
      // console.log('down');
      this.movePos(0, 1);
    }
    else if (event.keyCode === 38) {
      // console.log('up');
      this.movePos(0, -1);
    }


  }

  // @ViewChild('myImg') imgRef: ElementRef;

  public context: CanvasRenderingContext2D;

  // public imgE: HTMLImageElement;

  img: HTMLImageElement;

  constructor(private playerService: PlayerService, private renderer: Renderer2) {
  	// player starting position

    this.player = new Rectangle(new Point(0,0), 10, 10);

    this.obstacle = new Rectangle(new Point(100, 100), 15, 15);

  	// this.playerPos = new Point();
    // this.obstaclePos = new Point();
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
  	// console.log(this.room);
  	// console.log(this.context);
  	this.img = document.getElementById('myImg2') as HTMLImageElement;
  	this.img.src = 'assets/bravoka.png';

    // this.obstacle.Position.X = 100;
    // this.obstacle.Position.Y = 100;

    this.obst = this.renderer.createElement('img');
    this.obst.src = 'assets/obstacle.png';
    // obst.width = 30;
    // obst.height = 30;
    // this.renderer.appendChild(this.room['nativeElement'], this.obst);

    // this.context.drawImage(obst, 20, 20, 15, 15);
  }

  getPlayer(): void {
  	console.log(this.playerService.player);
  }

  draw(): void { // Just for testing and reference, delete this
  	this.context.fillRect(100,100,150,80);
  	this.context.fillText('hello world', 200, 200);
  }

  drawImg(): void {
  	this.context.clearRect(0, 0, this.room['nativeElement'].width, this.room['nativeElement'].height)
  	this.context.drawImage(this.img, this.player.Position.X, this.player.Position.Y, this.player.Width, this.player.Height);
    this.context.drawImage(this.obst, this.obstacle.Position.X, this.obstacle.Position.Y, this.obstacle.Width, this.obstacle.Height);

    this.collision = this.checkForCollision(this.obstacle);
  }

  movePos(x: number, y: number): void {
  	this.player.Position.X += x * this.moveSpeed;
  	this.player.Position.Y += y * this.moveSpeed;
  	this.drawImg();
  }

  mouseMove(event) {
    let rect = this.room['nativeElement'].getBoundingClientRect();
    // console.log(rect);
    // console.log(event);

    let x = event.clientX - rect.x;
    let y = event.clientY - rect.y;

    this.jumpPosition(x, y);
    this.drawImg();
  }



  jumpPosition(x: number, y: number) {
    this.player.Position.X = x;
    this.player.Position.Y = y;
  }


  // if (RectA.X1 < RectB.X2 && RectA.X2 > RectB.X1 &&
  // RectA.Y1 < RectB.Y2 && RectA.Y2 > RectB.Y1) 
  // Maybe this should take an array of objects.....? How can I attach behavior to this? Add it ot the INTERACTIVE OBJECT class perhaps??
  // TODO: Revisit this again later.
  checkForCollision(obstacle: Rectangle): boolean {
    //Check for player's left edge
    // if (this.player.Position.X >= obstacle.Position.X && this.player.Position.X <= obstacle.Position.X + obstacle.Width) {
    //   if (this.player.Position.Y >= obstacle.Position.Y && this.player.Position.Y <= obstacle.Position.Y + obstacle.Height) {
    //     return true
    //   }
    // }
    if (this.player.Position.X < obstacle.Position.X + obstacle.Width && this.player.Position.X + this.player.Width > obstacle.Position.X && 
      this.player.Position.Y < obstacle.Position.Y + obstacle.Height && this.player.Position.Y + this.player.Height > obstacle.Position.Y) {
      return true;
    }
    return false;
  }
}

export class Rectangle {
  Position: Point;
  Width: number;
  Height: number;

  constructor(position: Point, width: number, height: number) {
    this.Position = position;
    this.Width = width;
    this.Height = height;
  }
}

export class Point {
  X: number;
  Y: number;

  constructor(x: number, y: number) {
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