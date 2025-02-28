import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProductService } from '../../../services/products/product.service';
import { CustomerService } from '../../../services/customer/customer.service';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  implements OnInit  {
translateXValue: any;
currentIndex: any;

  productList : any;
  response : any;


  imageUrls = [
    { image: "https://as1.ftcdn.net/v2/jpg/00/81/24/72/1000_F_81247213_OYvGTCn5mnQQ2c0gWJ1U5ixcbmNBaMOp.jpg" },
    { image: "https://www.hellotech.com/blog/wp-content/uploads/2020/02/what-is-a-gpu.jpg" },

    { image: "https://i.ibb.co/5Wfs3dj7/ssd.jpg" },
    { image: "https://i.ibb.co/q31bvYx9/ram.jpg" },
    { image: "https://i.ibb.co/3yrd0QnF/hdd.jpg" },
    { image: "https://i.ibb.co/hxL7tvFJ/motherboard.jpg" },
    { image: "https://i.ibb.co/Rkkhw7Gr/gpu.jpg" },
    { image: "https://i.ibb.co/0jjJCNcz/case.jpg" },
    { image: "https://i.ibb.co/XZWxg4sP/psu.jpg" },
    { image: "https://i.ibb.co/7dYFCy3h/cpu.jpg" },
    { image: "https://i.ibb.co/dJkZ9BRK/products.jpg" } // Generic product image
  ];
  constructor(private prodS: ProductService,private custS:CustomerService) {}

  ngOnInit(): void {
    this.prodS.listProduct()
   .subscribe(resp => {
    this.response = resp;
    this.productList = this.response.dati.map((product: any, index: number) => ({
      ...product,
      imageUrl: this.imageUrls[index] || ''
    }));

    this.goToSlide(0);

   });

}


autoMoveCarousel(count = Math.floor(Math.random() * 10)): void {
  if (count <= 0) return; // Stop when count reaches 0

  setTimeout(() => {
    this.moveCarousel('next'); // Move the carousel to the next item
    this.autoMoveCarousel(count - 1); // Call function recursively
  }, 4000);
}



 moveCarousel(direction: string): void {
  const maxIndex = this.productList.length - 1;

  if (direction === 'next') {
    this.currentIndex = this.currentIndex < maxIndex ? this.currentIndex + 1 : 0;
  } else {
    this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : maxIndex;
  }
}

// Go to a specific slide when an indicator is clicked
goToSlide(index: number): void {
  this.currentIndex = index;

}

//da finire

}
