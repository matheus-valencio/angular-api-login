import { JsonPipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
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
  site = 'http://localhost:8080';
  login = 'admin'; //matheusv
  password = 'admin'; //12345

  auth = null;

  list = null;

  constructor(private http: HttpClient) {}

  header = null;

  formData = new FormData();

  imagem: File;

  nome: string;
  valor: Number;
  categoria: string;

  //Metodo que ativa o auth
  postLogin() {
    this.http
      .post<Auth>(this.site + '/login', {
        login: this.login,
        senha: this.password,
      })
      .subscribe((data) => {
        this.auth = data;
        this.header = {
          headers: new HttpHeaders().set(
            'Authorization',
            `Bearer ${this.auth.token}`
          ),
        };

        console.log(this.header);
      });
  }
  //Metodo que anula o auth
  postLogout() {
    this.auth = null;
  }

  //Metodo de devolução de tabela
  getList() {
    if (this.auth.profile[0] == ['ADMIN']) {
      this.http.get<any>(this.site + '/produtos', {}).subscribe((data) => {
        this.list = data;
        console.log(data);
      });
    }
  }

  deletarProduto(id) {
    this.http
      .delete<any>(this.site + '/produtos/' + id, this.header)
      .subscribe(() => {
        this.getList();
      });
  }

  postimagem() {
    this.formData.append('file', this.imagem);
    this.formData.append('nome', this.nome);
    console.log(this.formData);
    const request = new HttpRequest(
      'POST',
      this.site + '/produtos',
      this.formData,
      this.header
    );
    this.http
      .request(request)
      .subscribe((data) => {
        console.log(data);
      });
  }

  postCategoria() {
    this.http
      .post<any>(this.site + '/categoria', { nome: this.nome }, this.header)
      .subscribe((data) => {
        console.log(data);
      });
  }
}
