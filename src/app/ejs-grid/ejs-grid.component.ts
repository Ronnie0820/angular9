import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { HttpService } from '../service/http.service';
import { Product } from '../models/product.model';
import {
  FilterSettingsModel,
  GridComponent,
  GroupSettingsModel,
  QueryCellInfoEventArgs,
  ToolbarItems,
} from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-ejs-grid',
  templateUrl: './ejs-grid.component.html',
  styleUrls: ['./ejs-grid.component.scss'],
})
export class EjsGridComponent implements OnInit {
  public products: Product[];
  public data: Product[];
  public data2: Product[];
  public isLoaded = false;
  // Grid
  @ViewChild('grid')
  public grid: GridComponent;
  public columns: Object[];
  public groupOptions: GroupSettingsModel;
  public filterOptions: FilterSettingsModel;
  public pageSettings: Object;
  public toolbarOptions: (ToolbarItems | { template: string })[];

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.isLoaded = false;
    setTimeout(() => {
      this.httpService.dummyJsonAllProducts().subscribe(
        (data) => {
          this.products = data.products.map((item) => ({
            id: item.id,
            title: item.title,
            brand: item.brand,
            category: item.category,
            description: item.description,
            price: item.price,
            rating: item.rating
          }));
        },
        (error) => {},
        () => {
          this.isLoaded = true;
          this.data = this.products;
          this.initializeColumn();
        }
      );
    }, 3000);
  }

  // Grid
  actionComplete(args) {
    if (args.requestType === 'sorting' && !args.columnName) {
      const index = args.target.closest('th').cellIndex;
      const column = this.grid.getColumnByIndex(index).field;
      // here we sort the same column with Ascending direction by using sortColumn method when a repetitive third click on the same column
      this.grid.sortColumn(column, 'Ascending', true);
    }
  }
  async actionBegin(args) {
    switch (args.requestType) {
      case 'sorting':
        console.log(`${args.columnName}: ${args.direction}`);
        this.getData();
        break;
      default:
        break;
    }
  }
  dataBound() {
    this.grid.autoFitColumns();
  }
  initializeGridSettings() {
    this.groupOptions = { columns: ['title'] };
    this.toolbarOptions = ['ColumnChooser'];
  }
  initializeColumn() {
    this.columns = [
      {
        headerText: 'ID',
        field: 'id',
      },
      {
        headerText: 'Title',
        field: 'title',
      },
      {
        headerText: 'Brand',
        field: 'brand',
      },
      {
        headerText: 'Category',
        field: 'category',
      },
      {
        headerText: 'Description',
        field: 'description',
      },
      {
        headerText: 'Price',
        field: 'price',
      },
      {
        headerText: 'Rating',
        field: 'rating',
      },
    ];
  }
  customiseCell(args: QueryCellInfoEventArgs) {
    if (args.cell.innerHTML.match('^https?://'))
      args.cell.innerHTML = `<a href="${args.cell.innerHTML}">${args.cell.innerHTML}</a>`;
  }

  test() {
    this.grid.dataSource = this.data;
    this.grid.refresh();
  }
}
