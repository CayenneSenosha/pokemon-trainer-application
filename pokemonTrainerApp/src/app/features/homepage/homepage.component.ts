import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiServiceService } from 'src/app/service/api-service.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  searchForm: any ;
  isLoading: boolean = false;
  error: any = "";
  data: any  ;
  constructor(private formBuilder: FormBuilder , private _apiServiceService: ApiServiceService) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      search: '',
    });
    this.onChanges();
  }
  addToFav(data: any){
    localStorage.setItem(data.id,JSON.stringify(data));
  }

  onSearch(event:any){
   console.log(event);
  }
  onChanges(): void {
    this.searchForm.valueChanges.subscribe((val:any) => {
      this.isLoading = true;
      this._apiServiceService.getPokemon(val.search).subscribe((data) =>{
        this.isLoading = false ;
        this.data = data;
        console.log(data);
        this.error = undefined;
        
      } , (err) =>{
        this.isLoading=false;
        this.error = err.message;
        this.data = undefined;
      })
    });
  }

  get f(){
    return this.searchForm?.controls;
  }
  onSubmit(){
    console.log(this.f['search'].value);
  }
}
