import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

@Component({
  selector: "app-store",
  templateUrl: "./store.component.html",
  styleUrls: ["./store.component.css"]
})
export class StoreComponent implements OnInit {
  list_url = "http://localhost:3001/list";

  public producsts_list;

  public users = ["customer", "seller"];

  public actions = [];

  public respondBody;

  private user = "";
  private action = "";
  private productSelect = "";
  private quantity = "";
  private price = "";
  private url = ``;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get(this.list_url).subscribe(data => {
      this.producsts_list = data;
    });
  }

  userOptions(option: string) {
    if (option === "customer") {
      this.user = option;
      this.actions = ["select"];
    } else if (option === "seller") {
      this.user = option;
      this.actions = ["restock", "add", "remove"];
    }
  }

  actionOptions(option: string) {
    this.action = option;
  }

  productOptions(option: string) {
    this.productSelect = option;
    console.log(option);
  }

  inputQuantity(quantity: string) {
    this.quantity = quantity;
    console.log(quantity);
  }

  inputPrice(price: string) {
    this.price = price;
  }

  submitQuery() {
    this.url = `http://localhost:3001/${this.user}`;

    let params = new HttpParams();
    params = params.append("action", this.action);
    params = params.append("name", this.productSelect);
    params = params.append("quantity", this.quantity);
    params = params.append("price", this.price);

    this.http.get(this.url, { params }).subscribe(data => {
      this.respondBody = data;
    });

    this.http.get(this.list_url).subscribe(data => {
      this.producsts_list = data;
    });
  }
}
