import { HttpClient } from '@angular/common/http';
import { Component, VERSION } from '@angular/core';

//interface que reproduz o q o mecanismo de autenticação retorna
interface Auth {
  token: string;
  username: string;
  profile: Array<string>;
}
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'My spring boot app';
  site = 'https://app-api-cardapio.herokuapp.com';
  login = 'matheusv'; //matheusv
  password = '12345'; //12345

  auth = null;

  list = null;

  constructor(private http: HttpClient) {}

  //Metodo que ativa o auth
  postLogin() {
    this.http
      .post<Auth>(this.site + '/login', {
        login: this.login,
        senha: this.password,
      })
      .subscribe((data) => {
        this.auth = data;
      });
  }
  //Metodo que anula o auth
  postLogout() {
    this.auth = null;
  }

  //Metodo de devolução de tabela
  getList() {
    this.http
      .get<any>((this.site = '/produtos'), {
        //Padrao de autorizacao por token
        headers: { Authorization: 'Bearer' + this.auth.token },
      })
      .subscribe((data) => {
        this.list = data;
      });
  }
}
