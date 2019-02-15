import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"]
})
export class CartComponent implements OnInit {
  public cart;
  public respondBody;

  private url = "http://localhost:3001/";

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get(`${this.url}customer?action=cart`).subscribe(data => {
      this.cart = data;
    });
  }

  getTotalCost = () => {
    let cost = 0;
    if (this.cart) {
      this.cart.forEach(item => {
        cost += item.price * item.quantity;
      });
    }
    return cost;
  };

  buyCart = () => {
    this.http.get(`${this.url}customer?action=buy`).subscribe(data => {
      this.respondBody = data;
    });

    this.http.get(`${this.url}customer?action=cart`).subscribe(data => {
      this.cart = data;
    });
  };

  clearCart = () => {
    this.http.get(`${this.url}customer?action=clear`).subscribe(data => {
      this.respondBody = data;
    });

    this.http.get(`${this.url}customer?action=cart`).subscribe(data => {
      this.cart = data;
    });
  };
}
