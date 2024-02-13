import { Injectable } from '@angular/core';
import {HttpClient, HttpParams	} from '@angular/common/http';
import { SearchResponse, Gif} from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GifService {

    public gifList: Gif[] = [];

    private _tagsHistory: string[] = [];
    private apiKey: string = 'y12JiO65XXTFodVJ355x9xaJLldLERTb';
    private serviceURL: string = 'http://api.giphy.com/v1/gifs';

    constructor(private http: HttpClient) {
        this.loadLocalStorage();
        console.log('Gifs Services Listo');
     }
    
    get tagsHistory(){
        return [...this._tagsHistory];
    }

    private organizeHistory(tag: string){
        tag = tag.toLocaleLowerCase();

        if(this._tagsHistory.includes(tag)){
            this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag)
        }
        this._tagsHistory.unshift(tag);
        this._tagsHistory = this._tagsHistory.splice(0,10);
        this.saveLocalStorage();
    }

    private saveLocalStorage(){
        localStorage.setItem('history', JSON.stringify(this._tagsHistory));
    }

    private loadLocalStorage(){
        if(!localStorage.getItem('history')){
            return;
        }
        this._tagsHistory = JSON.parse(localStorage.getItem('history')! );

        if(this._tagsHistory.length === 0){
            return;
        }
        this.searchTag(this._tagsHistory[0]);
    }

    searchTag(tag: string): void{
        if(tag.length === 0 ) return;
        this.organizeHistory(tag);

        const params = new HttpParams()
        .set('api_key', this.apiKey)
        .set('limit', '16')
        .set('q', tag)

        this.http.get<SearchResponse>(`${this.serviceURL}/search`, {params})
            .subscribe(resp =>{

             this.gifList = resp.data;

        });

        

    }
}