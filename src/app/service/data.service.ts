import { Injectable } from '@angular/core';
import { TIHLocation, TIHResponse, userAllDetails } from '../models';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  searchResults:TIHLocation[] = [];
  keyword = ""
  response!: TIHResponse;
  selectedLocation!: TIHLocation;
  selectedIdx = 0;
  svcUser:userAllDetails = {email:'', numFavs:0,favorites:[]};
  constructor() { }
}
