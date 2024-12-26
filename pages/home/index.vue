<template>
  <header>
    <h1>Header</h1>
   
  </header>

  <div>hello world</div>
  <div v-for="category in mockData">
    <h1>{{ category.name }}</h1>
    <slider :data="category" />
  </div>
</template>

<script setup>
// type Product = {
//     id: number;
//     url: string;
//     name: string;
//     price: number;
// };

// type Category = {
//     id: number;
//     name: string;
//     products: Product[];
// };

// Mock data
const mockData = [
  {
    id: 1,
    name: "Electronics",
    products: [
      {
        id: 1,
        url: "https://www.oh-joy.co.il/wp-content/uploads/2017/01/SG-281116-0002.jpg",
        name: "Smartphone",
        price: 699,
      },
      {
        id: 2,
        url: "https://www.oh-joy.co.il/wp-content/uploads/2017/01/SG-281116-0002.jpg",
        name: "Laptop",
        price: 999,
      },
      {
        id: 3,
        url: "https://www.oh-joy.co.il/wp-content/uploads/2017/01/SG-281116-0002.jpg",
        name: "Tablet",
        price: 499,
      },
      {
        id: 4,
        url: "https://www.oh-joy.co.il/wp-content/uploads/2017/01/SG-281116-0002.jpg",
        name: "Smartwatch",
        price: 199,
      },
      {
        id: 5,
        url: "https://www.oh-joy.co.il/wp-content/uploads/2017/01/SG-281116-0002.jpg",
        name: "Headphones",
        price: 149,
      },
    ],
  },
  {
    id: 2,
    name: "Home Appliances",
    products: [
      {
        id: 6,
        url: "https://www.oh-joy.co.il/wp-content/uploads/2017/01/SG-281116-0002.jpg",
        name: "Vacuum Cleaner",
        price: 299,
      },
      {
        id: 7,
        url: "https://www.oh-joy.co.il/wp-content/uploads/2017/01/SG-281116-0002.jpg",
        name: "Microwave Oven",
        price: 199,
      },
      {
        id: 8,
        url: "https://www.oh-joy.co.il/wp-content/uploads/2017/01/SG-281116-0002.jpg",
        name: "Air Conditioner",
        price: 799,
      },
      {
        id: 9,
        url: "https://www.oh-joy.co.il/wp-content/uploads/2017/01/SG-281116-0002.jpg",
        name: "Refrigerator",
        price: 999,
      },
      {
        id: 10,
        url: "https://www.oh-joy.co.il/wp-content/uploads/2017/01/SG-281116-0002.jpg",
        name: "Washing Machine",
        price: 599,
      },
    ],
  },
  {
    id: 3,
    name: "Fashion",
    products: [
      {
        id: 11,
        url: "https://www.oh-joy.co.il/wp-content/uploads/2017/01/SG-281116-0002.jpg",
        name: "T-shirt",
        price: 29,
      },
      {
        id: 12,
        url: "https://www.oh-joy.co.il/wp-content/uploads/2017/01/SG-281116-0002.jpg",
        name: "Jeans",
        price: 49,
      },
      {
        id: 13,
        url: "https://www.oh-joy.co.il/wp-content/uploads/2017/01/SG-281116-0002.jpg",
        name: "Sneakers",
        price: 79,
      },
      {
        id: 14,
        url: "https://www.oh-joy.co.il/wp-content/uploads/2017/01/SG-281116-0002.jpg",
        name: "Jacket",
        price: 99,
      },
      {
        id: 15,
        url: "https://www.oh-joy.co.il/wp-content/uploads/2017/01/SG-281116-0002.jpg",
        name: "Sunglasses",
        price: 59,
      },
    ],
  },
];
</script>
