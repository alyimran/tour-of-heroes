import { Component, OnInit } from '@angular/core';
import {hero, hero, hero} from '../hero';
import {HeroService} from '../hero.service'

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes : hero [];
  constructor(private heroService : HeroService) { 

  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

  gatHeroes () : void {
    this.heroService.getHeroes ().subscribe(heroes => this.heroes = heroes);
  }

  ngOnInit() {
    this.gatHeroes();
  }

}
