import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'fn-register-article',
  templateUrl: './register-article.component.html',
  styleUrls: ['./register-article.component.css']
})
export class RegisterArticleComponent {

  categories: String[] = [
      
  ]
    constructor() { }

    formArticle = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      modelo: new FormControl('', [Validators.required]),
      marca: new FormControl('', [Validators.required]),
      minorista: new FormControl(0, [Validators.required]),
      mayorista: new FormControl(0, [Validators.required]), // Inicializado en 0 como número
      dimensiones: new FormControl(0, [Validators.required]), // Inicializado en 0 como número
      peso: new FormControl(0, [Validators.required]), // Inicializado en 0 como número
      color: new FormControl('', [Validators.required]),
      material: new FormControl('', [Validators.required]),
      pais: new FormControl('', [Validators.required]),
      categorias: new FormControl('', [Validators.required]),    
    });




    addElement(){
      if(this.formArticle.value.categorias != 'Abrir Menu' && this.formArticle.value.categorias != null){
        for(let i = 0; i < this.categories.length; i++){
          if(this.categories[i] == this.formArticle.value.categorias){
            return;
          }
        }
        this.categories.push(this.formArticle.value.categorias);;
      }
    }
    

    removeCategory(categories: any){
      this.categories.splice(this.categories.indexOf(categories), 1);
    }

    
    onSubmit() {
      alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.formArticle.value, null, 4));
    }

}
