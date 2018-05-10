import { Component, OnInit  , Input } from '@angular/core';
import {hero} from '../hero'
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {HeroService} from '../hero.service';

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.css']
})
export class HeroDetailsComponent implements OnInit {

  @Input () hero : hero;
  constructor(private route: ActivatedRoute , private heroService :HeroService , private location : Location ) 
  {

   }

  ngOnInit() {
    this.getHero ();
  }

  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }
 
  goBack(): void {
    this.location.back();
  }

  getHero () : void 
  {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id).subscribe(hero => this.hero = hero);
  }

}
