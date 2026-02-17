import { StaticImageData } from "next/image";
import img1 from "../assets/carousels/card1.jpg";
import img2 from "../assets/carousels/card2.jpg";
import img3 from "../assets/carousels/card3.jpg";
import img4 from "../assets/carousels/card4.jpg";
import Boomber1 from "../assets/carousels/BoomberJactes-1.jpg";
import Boomber2 from "../assets/carousels/BoomberJactes-2.jpg";
import spiderman1 from "../assets/carousels/Hoodie-T-shirt-Spider-Man- Saving The Spider-Verse.jpg";
import spiderman2 from "../assets/carousels/Hoodie-T-shirt-Spider-Man- Saving The Spider-Verse-3.jpg";
import BatMan2 from "../assets/carousels/T-shirt-Batman-4.jpg";
import BatMan1 from "../assets/carousels/T-shirt-Batman.jpg";
import Superman1 from "../assets/carousels/Superman Rise To The Top-1.jpg";
import Superman2 from "../assets/carousels/Superman Rise To The Top-2.jpg";
import menOversizedHoodie1 from "../assets/carousels/menOversizedHoodie-type-1-2.jpg";
import menOversizedHoodie2 from "../assets/carousels/menOversizedHoodie-2.jpg";
import jacketPolar1 from "../assets/carousels/jacket polar fleece-1.jpg";
import jacketPolar2 from "../assets/carousels/jacket polar fleece-2.jpg";
import pant1 from "../assets/carousels/pant-1-2.jpg";
import pant2 from "../assets/carousels/pant-1.jpg";
import pant22 from "../assets/carousels/pant-2-1.jpg";
import pant21 from "../assets/carousels/pant-2.jpg";
// import n from "../assets/carousels/";


export type VariantOption = {
  size: string;
  stock: number;
};

export type ProductVariant = {
  id: string;
  name: string;
  price: number;
  istrending ?: Boolean,
  Product_name: string;
  mainImage: StaticImageData;
  lookImages: StaticImageData[];
  options: VariantOption[];
};

export type Product = {
  id: number; // or string later
  gender: string,
  category: string;
  subCategory : string;
  tags?: string[],
  description: string;
  baseDescription: string;
  variants: ProductVariant[];
};

export const products: Product[] = [
  {
    id: 1,
    gender: "MEN",
    category: "SHIRT",
    subCategory : "Active wear",
    description: "Marvel Graphic Hoodie",
    baseDescription: "Premium cotton hoodie with front print",
    tags: ["TRENDING"],
    
    variants: [
      {
        id: "1-black",
        name: "Black",
        price: 1799,
        Product_name: "Marvel printed hoodie",
        istrending: true,
        mainImage: img1,
        lookImages: [img1, img1],

        options: [
          { size: "S", stock: 5 },
          { size: "M", stock: 10 },
          { size: "L", stock: 4 },
          { size: "XL", stock: 4 },

        ]
      }
    ]
  },

  // ---------------------------
  // Jacket
  // ---------------------------
  {
    id: 2,
    gender: "MEN",
    category: "T-Shirt",
    subCategory : "OverSized",
    description: "Denim Jacket",
    baseDescription: "Slim fit denim jacket",

    tags: ["TRENDING"],

    variants: [
      {
        id: "2-blue",
        name: "Blue",

        price: 2499,
        Product_name: "Naruto : T-Shirt",

        mainImage: img2,
        lookImages: [img2, img2],

        options: [
          { size: "M", stock: 6 },
          { size: "L", stock: 5 },
          { size: "XL", stock: 5 },

        ]
      }
    ]
  },

  // ---------------------------
  // Oversized T-Shirt
  // ---------------------------
  {
    id: 3,
    gender: "MEN",
    category: "SHIRT",
    subCategory :"OverSized Shirts",
    description: `The shirt that gets it - sometimes you just want to look good without any fuss or tightness! This relaxed fit gives you all the room you need while still looking put-together and sharp.
    
                  Perfect for guys who want to feel comfortable in their own skin without sacrificing style.","Style Tip: Wear it open over a tee with chinos for layered casual cool, or button it up with jeans for classic versatile styling.`,
    baseDescription: "240 GSM oversized cotton tee",

    tags: ["TRENDING"],
    variants: [
      {
        id: "3-white",
        name: "White",
        price: 999,
        Product_name: "Denim : Green Oversized Shirt",
        mainImage: img3,
        lookImages: [img3, img3],
        options: [
          { size: "S", stock: 8 },
          { size: "M", stock: 10 },
          { size: "L", stock: 2 }
        ]
      },
      {
        id: "Black",
        name: "Black",
        price: 1999,
        Product_name: "Denim : Black Oversized Shirt",
        mainImage: img4,
        lookImages: [img4, img4],
        options: [
          { size: "S", stock: 8 },
          { size: "M", stock: 10 },
          { size: "L", stock: 3 },
          { size: "XL", stock: 1 },
          { size: "XXL", stock: 0 },
        ]
      },
    ]
  },

  // ---------------------------
  // Shirt
  // ---------------------------
  {
    id: 4,
    gender: "MEN",
    category: "JACKET",
    subCategory: "OverSized Jacket",
    description: "Checked Casual Shirt",
    baseDescription: "Regular fit casual shirt",
    variants: [
      {
        id: "4-red",
        name: "Red",
        price: 1599,
        Product_name: "checked cotton shirt",
        istrending: true,
        mainImage: jacketPolar1,
        lookImages: [jacketPolar1,jacketPolar2],

        options: [
          { size: "M", stock: 6 },
          { size: "L", stock: 5 }
        ]
      }
    ]
  },

  // ---------------------------
  // High Top Quality dress
  // ---------------------------
  {
    id: 5,
    gender: "MEN",
    category: "JACKET",
    subCategory : "Bomber Jackets",
    description: "Design inspired by Ben 10",
    baseDescription: "Street style Hoodie",

    variants: [
      {
        id: "5-black",
        name: "Black",

        price: 999,
        Product_name: "Ben 10: Tennyson",

        mainImage: Boomber2,
        lookImages: [Boomber1, Boomber2],

        options: [
          { size: "S", stock: 1 },
          { size: "M", stock: 10 },
          { size: "L", stock: 0 },
          { size: "XL", stock: 0 },
          { size: "XXL", stock: 2 },
        ]
      }
    ]
  },
    {
    id: 6,
    gender: "MEN",
    category: "HOODIE",
    subCategory : "OverSized Hoodie",
    description: "",
    baseDescription: "",

    variants: [
      {
        id: "5-black",
        name: "Black",
        price: 1999,
        Product_name: "spidy",
        mainImage: spiderman1,
        lookImages: [spiderman1, spiderman2],

        options: [
          { size: "S", stock: 0 },
          { size: "M", stock: 44 },
          { size: "L", stock: 6 },
          { size: "XL", stock: 0 },
          { size: "XXL", stock: 0 },
        ]
      }
    ]
  },
      {
    id: 7,
    gender: "MEN",
    category: "T-Shirt",
    subCategory : "OverSized",
    description: "High Top Quality dress",
    baseDescription: "Street style high top Quality dress",

    variants: [
      {
        id: "5-black",
        name: "white",

        price: 1599,
        Product_name: "Batman : OverSized-T-Shirt",

        mainImage: BatMan1,
        lookImages: [BatMan1, BatMan2],

        options: [
          { size: "S", stock: 0 },
          { size: "M", stock: 0 },
          { size: "L", stock: 10 },
          { size: "XL", stock: 2 },
          { size: "XXL", stock: 6 },
        ]
      }
    ]
  },
      {
    id: 8,
    gender: "MEN",
    category: "PANT",
    subCategory : "Cotton Pants",
    description: "High Top Quality dress",
    baseDescription: "Street style high top Quality dress",

    variants: [
      {
        id: "5-black",
        name: "Black",

        price: 2999,
        Product_name: "Black high top Quality dress",

        mainImage: pant1,
        lookImages: [pant1, pant2],

        options: [
          { size: "S", stock: 5 },
          { size: "M", stock: 4 },
          { size: "L", stock: 6 }
        ]
      }
    ]
  },
      {
    id: 9,
    gender: "MEN",
    category: "T-Shirt",
    subCategory : "OverSized",
    description: "",
    baseDescription: "Street style high top Quality dress",

    variants: [
      {
        id: "5-black",
        name: "Black",

        price: 2999,
        Product_name: "Superman : Oversized T-shirt",

        mainImage: Superman1,
        lookImages: [Superman1,Superman2],

        options: [
          { size: "S", stock: 5 },
          { size: "M", stock: 4 },
          { size: "L", stock: 6 },
          { size: "XL", stock: 0 },
          { size: "XXL", stock: 0 },

        ]
      }
    ]
  }
  ,    {
    id: 10,
    gender: "MEN",
    category: "HOODIE",
    subCategory : "Hoodies",
    description: "",
    baseDescription: "Street style high top Quality dress",

    variants: [
      {
        id: "5-black",
        name: "Black",

        price: 2999,
        Product_name: "Gray : Oversized Hoodie",

        mainImage: menOversizedHoodie1,
        lookImages: [menOversizedHoodie1, menOversizedHoodie2],

        options: [
          { size: "S", stock: 5 },
          { size: "M", stock: 4 },
          { size: "L", stock: 6 }
        ]
      }
    ]
  },    {
    id: 11,
    gender: "WOMEN",
    category: "PANT",
    subCategory : "Chinos Pants",
    description: "High Top Quality dress",
    baseDescription: "Street style high top Quality dress",

    variants: [
      {
        id: "5-black",
        name: "Black",
        price: 2999,
        Product_name: "Black Chinos",
        mainImage: pant21,
        lookImages: [pant21, pant22],

        options: [
          { size: "S", stock: 1 },
          { size: "M", stock: 44 },
          { size: "L", stock: 16 },
          { size: "XL", stock: 2 },
          { size: "XXL", stock: 0 },
        ]
      }
    ]
  },
];
