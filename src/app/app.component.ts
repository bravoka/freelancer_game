import { Component, ViewChild, ElementRef, AfterViewInit, HostListener, Renderer2 } from '@angular/core';
import { PlayerService } from './services/player.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  currentRoom: Room;

  collision: boolean;

  player: Rectangle;
  obstacle: Rectangle;

  obst: HTMLImageElement;
  // private imgEle: HTMLImageElement;

  moveSpeed: number = 1;

  @ViewChild('myRoom') room: HTMLCanvasElement;

  @HostListener('window: keydown', ['$event'])

  keyEvent(event: KeyboardEvent) {

    if (event.keyCode === 39)
    {
      this.movePos(1, 0);
    }
    else if (event.keyCode === 37) {
      this.movePos(-1, 0);
    }
    else if (event.keyCode === 40) {
      this.movePos(0, 1);
    }
    else if (event.keyCode === 38) {
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
  }

  ngAfterViewInit() {
  	this.context = this.room['nativeElement'].getContext('2d');

  	this.img = document.getElementById('myImg2') as HTMLImageElement;
  	this.img.src = 'assets/bravoka.png';

    this.obst = this.renderer.createElement('img');
    this.obst.src = 'assets/obstacle.png';
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