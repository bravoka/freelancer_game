import { Injectable } from '@angular/core';

@Injectable()
export class PlayerService {
  player: Player;
  location: string; // Location Interface (later)

  constructor() { }

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

  constructor() {
  	// code...
  }
}