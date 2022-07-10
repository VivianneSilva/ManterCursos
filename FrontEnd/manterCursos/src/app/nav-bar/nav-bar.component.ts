import { NavBarService } from './../nav-bar/nav-bar.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  LogoPath = 'assets/img/cursoLogo.jpg';

  constructor(private router: Router, public navbarService: NavBarService) { }

  ngOnInit(): void {
  }

}
