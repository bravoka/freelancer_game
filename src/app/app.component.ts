import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { PlayerService } from './services/player.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  currentRoom: Room;

  @ViewChild('myRoom') room: ElementRef;

  public context: CanvasRenderingContext2D;

  constructor(private playerService: PlayerService) {
  	// code...
  }

  ngAfterViewInit() {
  	this.context = (<HTMLCanvasElement>this.room.nativeElement).getContext('2d');
  }

  getPlayer(): void {
  	console.log(this.playerService.player);
  }

  draw(): void {
  	this.context.fillRect(100,100,150,80);
  	this.context.fillText('hello world', 200, 200);
  }
}


export class Room {
  
}

export class Map {

}