import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ProductFromHttp } from "../models/product.model";

@Injectable()
export class HttpService {
    constructor(private http: HttpClient) {}

    dummyJsonAllProducts() {
        return this.http.get<ProductFromHttp>('https://dummyjson.com/products');
    }
}