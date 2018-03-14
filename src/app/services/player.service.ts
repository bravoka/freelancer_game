import { Injectable, OnInit } from '@angular/core';

@Injectable()
export class PlayerService implements OnInit {
  player: Player;
  
  location: string; // Location Interface (later)

  constructor() { 
  	this.player = new Player(
  		'Jimbotron',
  		1000,
  		50,
  		[ 'Attribute1', 'Attribute2' ]
	);
  }

  ngOnInit() {

  }

  newGame(player: Player) {
  	this.player = player;
  }

  deltaMoney(money: number) {
  	this.player.Money += money;
  }
  
  deltaHappiness(happiness: number) {
  	this.player.Happiness += happiness;
  }

  gainAttribute(attribute: string) { // Should this be better as enumerable? Ah... dont worry about it for now
  	this.player.Attributes.push(attribute);
  }

  changeLocation(relocate: string) {
  	this.location = relocate;
  }
}

export class Player {
  Name: string;
  //Type: Enumerable<?> // TODO 
  Money: number;
  Happiness: number;
  Attributes: string[]; // enumerable vs string

  constructor(name: string, money: number, happiness: number, attribs: string[]) {
  	this.Name = name;
  	this.Money = money;
  	this.Happiness = happiness;
  	this.Attributes = attribs;
  }
}