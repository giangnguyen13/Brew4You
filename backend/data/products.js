const products = [
  {
    title: "Caffe Latte",
    description:
      "The perfect balance of rich expresso combined with smooth, creamy steamed milk and velvety foam.",
    price: 3.49,
    image:
      "http://res.cloudinary.com/dao0fuvre/image/upload/v1634252709/j40fjz7iezkfwxzuqjbq.png",
    rating: 0,
    numReviews: 0,
    category: "coffee",
  },
  {
    title: "Iced Cold Brew",
    description:
      "Our signature Iced Cold Brew Coffee is freshly brewed directly over ice, locking the aromatics and delivering a smoother taste than traditional Iced Coffee. Served over ice.",
    price: 2.49,
    image:
      "https://storage.googleapis.com/gen-atmedia/3/2018/05/9eada0d203bfb580d801b478edd553465c7afb52.jpeg",
    rating: 0,
    numReviews: 0,
    category: "coffee",
  },
  {
    title: "Iced Caramel Macchiato",
    description:
      "We combine our rich, full-bodied expresso with vanilla-flavoured syrup, milk and ice, then top it off with a caramel drizzle for and oh-so-sweet finish.",
    price: 3.52,
    image:
      "https://www.starbucksathome.com/pe/sites/default/files/styles/rdp_banner_image/public/2021-05/10032021_IcedCaramel_Work_CS-min.png?itok=Cwnt2GL9",
    rating: 0,
    numReviews: 0,
    category: "coffee",
  },
  {
    title: "Brewed Iced Tea",
    description:
      "Our premium English Breakfast Tea, perfectly steeped, chilled, and poured over ice.",
    price: 2.75,
    image: "https://i.dlpng.com/static/png/334334_preview.png",
    rating: 0,
    numReviews: 0,
    category: "tea",
  },
  {
    title: "Espresso",
    description:
      "Our smooth signature Espresso Roast with rich flavour and caramelly sweetness is at the very heart of everything we do.",
    price: 2.65,
    image:
      "https://www.pngall.com/wp-content/uploads/3/Espresso-PNG-Free-Image.png",
    rating: 0,
    numReviews: 0,
    category: "coffee",
  },
  {
    title: "Iced Caffe Latte",
    description:
      "The perfect balance of rich espresso, combined with cold milk and poured over ice.",
    price: 3.24,
    image:
      "https://www.alphafoodie.com/wp-content/uploads/2020/08/Iced-Latte-1-of-1-2.jpeg",
    rating: 0,
    numReviews: 0,
    category: "coffee",
  },
  {
    title: "Americano",
    description:
      "A full-bodied espresso, with hot water added to equal a cup of coffee.",
    price: 2.75,
    image:
      "https://www.starbucksathome.com/sites/default/files/2021-03/3-CaffeAmericano_ContactShadow_Green_1.png",
    rating: 0,
    numReviews: 0,
    category: "coffee",
  },
  {
    title: "Espresso Frappuccino",
    description:
      "Coffee is combined with a shot of espresso and milk, then blended with ice to give you a nice little jolt and lots of sipping joy.",
    price: 4.21,
    image:
      "https://www.eatthis.com/wp-content/uploads/sites/4/2020/02/Starbucks-Java-Chip-Frappuccino.jpg?quality=82&strip=all",
    rating: 0,
    numReviews: 0,
    category: "coffee",
  },
  {
    title: "Cappuccino",
    description:
      "A soothing sip, combining equal portions of espresso, steamed milk, and foam for an ideal tasting experience.",
    price: 3.25,
    image:
      "https://i.pinimg.com/originals/75/80/b6/7580b66b6335c447f59f13ee128f913b.png",
    rating: 0,
    numReviews: 0,
    category: "coffee",
  },
  {
    title: "Steeped Tea",
    description:
      "Our whole leaf teas are enticing in flavour and soothing to sip.",
    price: 2.76,
    image: "https://theteacupoflife.com/wp-content/uploads/2015/04/STEEPED.jpg",
    rating: 0,
    numReviews: 0,
    category: "tea",
  },
  {
    title: "Chai Latte",
    description:
      "A boldly aromatic tea latte with high cinnamon and cardamom notes combined with Indonesian black tea from the Bandung region.",
    price: 3.09,
    image:
      "https://www.acouplecooks.com/wp-content/uploads/2020/09/Chail-Latte-016.jpg",
    rating: 0,
    numReviews: 0,
    category: "coffee",
  },
  {
    title: "Hot Chocolate",
    description:
      "A creamy blend of steamed milk and rich chocolate. It is the delectable taste of hot chocolate you know and love. Can be served with whipped cream.",
    price: 2.99,
    image:
      "https://images.immediate.co.uk/production/volatile/sites/30/2020/10/Classic-Homemade-Hot-Chocolate-7d8353b.jpg",
    rating: 0,
    numReviews: 0,
    category: "chocolate",
  },
  {
    title: "White Hot Chocolate",
    description:
      "A sweet treat with a twist - rich white chocolate blended with creamy steamed milk for a smooth sip. Can be served with whipped cream.",
    price: 2.99,
    image:
      "https://images-gmi-pmc.edge-generalmills.com/7a9eb112-1908-413b-96cf-60b1bc056a15.jpg",
    rating: 0,
    numReviews: 0,
    category: "chocolate",
  },
  {
    title: "Vanilla Bean Frappuccino",
    description:
      "Subtle hints of vanilla bean fused with espresso and a touch of sweetness.",
    price: 3.62,
    image:
      "https://globalassets.starbucks.com/assets/b68fa7003557464a8abfaf3e04e2704b.jpg?impolicy=1by1_wide_topcrop_630",
    rating: 0,
    numReviews: 0,
    category: "frappuccino",
  },
  {
    title: "Flat White",
    description: "The perfect balance of espresso and velvety steamed milk.",
    price: 2.84,
    image:
      "https://cdn.vox-cdn.com/thumbor/dTVDqXGOSiMQwEIozcIj_ByaUlw=/0x0:1000x750/1400x788/filters:focal(0x0:1000x750):format(jpeg)/cdn.vox-cdn.com/uploads/chorus_image/image/45140100/6792268281_d0822743b8_b.0.0.jpg",
    rating: 0,
    numReviews: 0,
    category: "coffee",
  },
  {
    title: "Caffe Mocha",
    description:
      "A caffè latte with chocolate and whipped cream, made by pouring chocolate sauce into the glass, followed by an espresso shot and steamed milk. ",
    price: 3.12,
    image:
      "https://e7.pngegg.com/pngimages/583/473/png-clipart-caffe-mocha-latte-cream-irish-coffee-coffee-cream-recipe.png",
    rating: 0,
    numReviews: 0,
    category: "coffee",
  },
  {
    title: "Butter Croissant",
    description: "Tender buttery, flaky, and viennoiserie pastry.",
    price: 2.75,
    image:
      "https://cdn.shopify.com/s/files/1/1981/5847/products/IMG_0758_1000x1000.jpg?v=1590527322",
    rating: 0,
    numReviews: 0,
    category: "breakfast",
  },
  {
    title: "Banana Loaf",
    description: "Sweet cake-like loaf made with ripe bananas.",
    price: 2.32,
    image:
      "https://rasamalaysia.com/wp-content/uploads/2019/09/best-banana-bread-thumb.jpg",
    rating: 0,
    numReviews: 0,
    category: "breakfast",
  },
  {
    title: "Double Chocolate Brownie",
    description:
      "Rich chocolate brownie with generous chunks of chocolate made for the passionate chocolate lover.",
    price: 3.75,
    image:
      "https://www.alattefood.com/wp-content/uploads/2014/06/Double-Chocolate-Fudge-Brownies-Recipe-recipe-photo-1.jpg",
    rating: 0,
    numReviews: 0,
    category: "breakfast",
  },
  {
    title: "Everything Bagel",
    description:
      "Locally sourced bagels topped with your choice of premium light cream cheese, cheddar cheese or butter.",
    price: 1.96,
    image:
      "https://cdn.shopify.com/s/files/1/0148/1945/9126/articles/Malik_Bagel_720x.jpg?v=1611356339",
    rating: 0,
    numReviews: 0,
    category: "breakfast",
  },
  {
    title: "Ham & Cheddar Sandwich",
    description:
      "Black Forest-style ham, Cheddar cheese, lettuce, tomato and ranch dressing.",
    price: 4.93,
    image:
      "https://www.pikpng.com/pngl/m/370-3704181_mozzarella-tomato-panini-transparent-clipart.png",
    rating: 0,
    numReviews: 0,
    category: "breakfast",
  },
];

export default products;
