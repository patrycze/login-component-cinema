import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from "rxjs/observable/forkJoin";
import { HttpClient } from '@angular/common/http';
import { ImdbProvider } from '../../providers/imdb/imdb';
import { HttpClientModule } from '@angular/common/http';



export class User {
  constructor(public name: String, public pass: String) {
  }
}

@IonicPage()
@Component({
  selector: 'page-recomended',
  templateUrl: 'recomended.html',
})
export class RecomendedPage  {
  posts: {};
  show = false;
  user: User;
  value: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient, private imdbProvider: ImdbProvider) {
  }
  
  ngOnInit() {
    this.user = new User(this.navParams.get('name'), this.navParams.get('pass'));

    this.http.get('http://www.omdbapi.com/?apikey=e699f616&s=monty+python')
    .subscribe(posts => {
        this.posts = posts
        console.log(this.user);
        this.show = true;
      })

    // let characterHomeworld = this.http.get('http://www.omdbapi.com/?apikey=e699f616&t=Hydrozagadka');

    // forkJoin([character, characterHomeworld]).subscribe(results => {
    //   // results[0] is our character
    //   // results[1] is our character homeworld
    //   (results[0] as any).homeworld = results[1];
    //   this.posts = results[0];
    //   console.log(this.posts.Search);
    //}
    
  //);
  }

  updateLikes(post) {
    console.log(post);
    let acctual = document.getElementById(`${post.imdbID}`).textContent;
    this.value = parseInt(acctual.slice(0,2)) + 1; 
    console.log(this.value);
    document.getElementById(`${post.imdbID}`).textContent = `${this.value} Likes`;
    this.http.post('http://localhost:8080/api/userfilm/create/', 
    { name: this.user.name,
      password: this.user.pass,
      filmid: post.imdbID
    }).subscribe(result => {
      console.log(result);
    })
    this.http.post('http://localhost:8080/api/post/create/',
    { title : post.Title,
      poster: post.Poster,
      desc: 'test',
      filmid: post.imdbID,
      likesCount: this.value}).subscribe(result => {
        console.log(result);
      })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RecomendedPage');
  }

  
}
