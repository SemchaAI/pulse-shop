const PocoC65 = [
  {
    title: 'Brand',
    description: 'Xiaomi',
    productId: 1,
  },
  {
    title: 'Weight',
    description: '192g',
    productId: 1,
  },
  {
    title: 'Display Type',
    description: 'IPS LCD',
    productId: 1,
  },
  {
    title: 'Display Size',
    description: '6.74"',
    productId: 1,
  },
  {
    title: 'Display Resolution',
    description: '720 x 1600 pixels',
    productId: 1,
  },
  {
    title: 'Display Refresh Rate',
    description: '90Hz',
    productId: 1,
  },
];
const PocoX6 = [
  {
    title: 'Brand',
    description: 'Xiaomi',
    productId: 2,
  },
  {
    title: 'Weight',
    description: '181g',
    productId: 2,
  },
  {
    title: 'Display Type',
    description: 'Amoled',
    productId: 2,
  },
  {
    title: 'Display Size',
    description: '6.74"',
    productId: 2,
  },
  {
    title: 'Display Resolution',
    description: '2712 x 1220 pixels',
    productId: 2,
  },
  {
    title: 'Display Refresh Rate',
    description: '120Hz',
    productId: 2,
  },
];
const Redmi13C = [
  {
    title: 'Brand',
    description: 'Xiaomi',
    productId: 3,
  },
  {
    title: 'Weight',
    description: '192g',
    productId: 3,
  },
  {
    title: 'Display Type',
    description: 'IPS LCD',
    productId: 3,
  },
  {
    title: 'Display Size',
    description: '6.74"',
    productId: 3,
  },
  {
    title: 'Display Resolution',
    description: '720 x 1600 pixels',
    productId: 3,
  },
  {
    title: 'Display Refresh Rate',
    description: '90Hz',
    productId: 3,
  },
];
const Pad6 = [
  {
    title: 'Brand',
    description: 'Xiaomi',
    productId: 10,
  },
  {
    title: 'Weight',
    description: '490g',
    productId: 10,
  },
  {
    title: 'Display Type',
    description: 'IPS LCD',
    productId: 10,
  },
  {
    title: 'Display Size',
    description: '11"',
    productId: 10,
  },
  {
    title: 'Display Resolution',
    description: '1800 x 2880 pixels',
    productId: 10,
  },
  {
    title: 'Display Refresh Rate',
    description: '144 Гц',
    productId: 10,
  },
];

const variants = {
  pocoX6: [
    // colors: [2 black ],
    // ram: [2 -8gb , 3 -12gb],
    // memory: [ 3 256gb , 4 512gb ],
    {
      productId: 2, //smartPocoX6
      title: 'Poco X6 8/256 Black',
      img: '8ad1aadf-4590-44b2-b31b-0be38c1c8f5f-kpksgj.webp',
      price: 6499,
      cnt: 5,
      colorId: 2,
      ramId: 2,
      memoryId: 3,
    },
    {
      productId: 2, //smartPocoX6
      title: 'Poco X6 8/512 Black',
      img: '8ad1aadf-4590-44b2-b31b-0be38c1c8f5f-kpksgj.webp',
      price: 6499,
      cnt: 5,
      colorId: 2,
      ramId: 2,
      memoryId: 4,
    },
    {
      productId: 2, //smartPocoX6
      title: 'Poco X6 12/512 Black',
      img: '8ad1aadf-4590-44b2-b31b-0be38c1c8f5f-kpksgj.webp',
      price: 6499,
      cnt: 5,
      colorId: 2,
      ramId: 3,
      memoryId: 3,
    },
    {
      productId: 2, //smartPocoX6
      title: 'Poco X6 12/512 Black',
      img: '8ad1aadf-4590-44b2-b31b-0be38c1c8f5f-kpksgj.webp',
      price: 6499,
      cnt: 5,
      colorId: 2,
      ramId: 3,
      memoryId: 4,
    },
  ],
  pocoC65: [
    // colors: 2 Black 5 Blue,
    // ram: 2 8gb,
    // memory: 2 128gb 3 256gb,
    {
      productId: 1, //pocoC65
      title: 'Poco C65 8/128GB Black',
      img: '541ec2ed-a21e-4657-b512-ff751bf18453-tts8fo.webp',
      price: 3499,
      cnt: 5,
      colorId: 2,
      memoryId: 2,
      ramId: 2,
    },
    {
      productId: 1,
      title: 'Poco C65 8/256GB Black',
      img: '541ec2ed-a21e-4657-b512-ff751bf18453-tts8fo.webp',
      price: 3499,
      cnt: 5,
      colorId: 2,
      memoryId: 3,
      ramId: 2,
    },
    {
      productId: 1, //pocoC65
      title: 'Poco C65 8/128GB Blue',
      img: 'e0e2b184-29fe-420d-a88f-5491a3859d82-hstxl9.webp',
      price: 3499,
      cnt: 5,
      colorId: 5,
      memoryId: 2,
      ramId: 2,
    },
    {
      productId: 1,
      title: 'Poco C65 8/256GB Blue',
      img: 'e0e2b184-29fe-420d-a88f-5491a3859d82-hstxl9.webp',
      price: 3499,
      cnt: 5,
      colorId: 5,
      memoryId: 3,
      ramId: 2,
    },
  ],
  redmi13C: [
    // colors: [2 Black, 4 Green,  5 Blue],
    // ram: [1 4gb],
    // memory: [2 128gb, 3 256gb],
    {
      productId: 3, //redmi13c
      title: 'Redmi 13C 4/128 Black',
      img: '8c2c8881-34d3-4bd3-8668-c5e8018a74b3-6g3he5.webp',
      price: 2399,
      cnt: 5,
      colorId: 2,
      ramId: 1,
      memoryId: 2,
    },
    {
      productId: 3,
      title: 'Redmi 13C 4/256 Black',
      img: '8c2c8881-34d3-4bd3-8668-c5e8018a74b3-6g3he5.webp',
      price: 3499,
      cnt: 5,
      colorId: 2,
      ramId: 1,
      memoryId: 3,
    },
    {
      productId: 3, //redmi13c
      title: 'Redmi 13C 4/128 Green',
      img: '5434e573-2cfc-4039-b9a9-f52ee0ed2938-6iydap.webp',
      price: 2399,
      cnt: 5,
      colorId: 4,
      memoryId: 2,
      ramId: 1,
    },
    {
      productId: 3,
      title: 'Redmi 13C 4/256 Green',
      img: '5434e573-2cfc-4039-b9a9-f52ee0ed2938-6iydap.webp',
      price: 3499,
      cnt: 5,
      colorId: 4,
      ramId: 1,
      memoryId: 3,
    },
    {
      productId: 3, //redmi13c
      title: 'Redmi 13C 4/128 Blue',
      img: '2eebb236-63f3-4c8e-96bb-8f7e68069ec6-7wce42.webp',
      price: 2399,
      cnt: 5,
      colorId: 5,
      ramId: 1,
      memoryId: 2,
    },
    {
      productId: 3,
      title: 'Redmi 13C 4/256 Blue',
      img: '2eebb236-63f3-4c8e-96bb-8f7e68069ec6-7wce42.webp',
      price: 3499,
      cnt: 5,
      colorId: 5,
      ramId: 1,
      memoryId: 3,
    },
  ],
  pad6: [
    // colors: [8 Gray, 9 Gold],
    // ram: [2 8gb],
    // memory: [2 128gb, 3 256gb],
    {
      productId: 10, //redmi13c
      title: 'Xiaomi Pad 6 8/128 Gray',
      img: '39138a79-4149-416d-9408-70608e0cab23-dcw2zm.webp',
      price: 7499,
      oldPrice: 8999,
      cnt: 2,
      colorId: 8,
      ramId: 2,
      memoryId: 2,
    },
    {
      productId: 10, //redmi13c
      title: 'Xiaomi Pad 6 8/256 Gray',
      img: '39138a79-4149-416d-9408-70608e0cab23-dcw2zm.webp',
      price: 7499,
      oldPrice: 8999,
      cnt: 2,
      colorId: 8,
      ramId: 2,
      memoryId: 3,
    },
    // {
    //   productId: 10, //redmi13c
    //   title: 'Xiaomi Pad 6 8/128 Gold',
    //   img: 'e3bfab6d-f221-45f0-abe5-077d967b890a-qi52dg.webp',
    //   price: 7499,
    //   cnt: 2,
    //   colorId: 9,
    //   ramId: 2,
    //   memoryId: 2,
    // },
    {
      productId: 10, //redmi13c
      title: 'Xiaomi Pad 6 8/256 Gold',
      img: 'e3bfab6d-f221-45f0-abe5-077d967b890a-qi52dg.webp',
      price: 7499,
      oldPrice: 8999,
      cnt: 2,
      colorId: 9,
      ramId: 2,
      memoryId: 3,
    },
  ],
};

//thumbnails
const PocoC65Images = {
  black: [
    {
      thumbnails: [
        '6b9df479-9231-4940-89cf-706baf5dd3ba-msblyf.webp',
        'e9e3f215-ca96-4f45-bdba-fd9e76e3d5aa-msblye.webp',
        'a6217ec8-995a-4886-beb8-ec6e0877ee1c-msblyd.webp',
      ],
    },
    {
      thumbnails: [
        '6b9df479-9231-4940-89cf-706baf5dd3ba-msblyf.webp',
        'e9e3f215-ca96-4f45-bdba-fd9e76e3d5aa-msblye.webp',
        'a6217ec8-995a-4886-beb8-ec6e0877ee1c-msblyd.webp',
      ],
    },
  ],
  blue: [
    {
      thumbnails: [
        'fb153d1b-b811-40a6-87dc-3a19b33b25bb-d070qe.webp',
        '553a96d0-08c3-4b2c-b2b7-feca222bfd2f-d070qd.webp',
        'fcf8a5f6-7f28-43ea-bcbe-7d8682e3d577-d070qc.webp',
      ],
    },
    {
      thumbnails: [
        'fb153d1b-b811-40a6-87dc-3a19b33b25bb-d070qe.webp',
        '553a96d0-08c3-4b2c-b2b7-feca222bfd2f-d070qd.webp',
        'fcf8a5f6-7f28-43ea-bcbe-7d8682e3d577-d070qc.webp',
      ],
    },
  ],
};
const PocoX6Images = {
  black: [
    {
      thumbnails: [
        '5ccfe3a8-694c-4b35-bdf7-05a86084cd16-5jfl84.webp',
        'd27028ea-e31f-49aa-a071-fdbb5e6b0bd3-b7zecx.webp',
        'fb182b75-e191-47de-b97d-75580440085d-74b8i0.webp',
        'c80d5eaa-5998-4a72-9855-412a0e74b4de-vfj1l2.webp',
        '3148975d-2643-4e05-8ab3-26efa183c9e8-ym8kzp.webp',
        'b310791b-d76a-4ae2-8d7f-be7f24b372e2-d9tr6f.webp',
        '7480c329-a418-4316-bbe3-5dd6d185d1e2-1cuzhd.webp',
      ],
    },
    {
      thumbnails: [
        '5ccfe3a8-694c-4b35-bdf7-05a86084cd16-5jfl84.webp',
        'd27028ea-e31f-49aa-a071-fdbb5e6b0bd3-b7zecx.webp',
        'fb182b75-e191-47de-b97d-75580440085d-74b8i0.webp',
        'c80d5eaa-5998-4a72-9855-412a0e74b4de-vfj1l2.webp',
        '3148975d-2643-4e05-8ab3-26efa183c9e8-ym8kzp.webp',
        'b310791b-d76a-4ae2-8d7f-be7f24b372e2-d9tr6f.webp',
        '7480c329-a418-4316-bbe3-5dd6d185d1e2-1cuzhd.webp',
      ],
    },
    {
      thumbnails: [
        '5ccfe3a8-694c-4b35-bdf7-05a86084cd16-5jfl84.webp',
        'd27028ea-e31f-49aa-a071-fdbb5e6b0bd3-b7zecx.webp',
        'fb182b75-e191-47de-b97d-75580440085d-74b8i0.webp',
        'c80d5eaa-5998-4a72-9855-412a0e74b4de-vfj1l2.webp',
        '3148975d-2643-4e05-8ab3-26efa183c9e8-ym8kzp.webp',
        'b310791b-d76a-4ae2-8d7f-be7f24b372e2-d9tr6f.webp',
        '7480c329-a418-4316-bbe3-5dd6d185d1e2-1cuzhd.webp',
      ],
    },
    {
      thumbnails: [
        '5ccfe3a8-694c-4b35-bdf7-05a86084cd16-5jfl84.webp',
        'd27028ea-e31f-49aa-a071-fdbb5e6b0bd3-b7zecx.webp',
        'fb182b75-e191-47de-b97d-75580440085d-74b8i0.webp',
        'c80d5eaa-5998-4a72-9855-412a0e74b4de-vfj1l2.webp',
        '3148975d-2643-4e05-8ab3-26efa183c9e8-ym8kzp.webp',
        'b310791b-d76a-4ae2-8d7f-be7f24b372e2-d9tr6f.webp',
        '7480c329-a418-4316-bbe3-5dd6d185d1e2-1cuzhd.webp',
      ],
    },
  ],
};
const Redmi13CImages = {
  black: [
    {
      thumbnails: [
        '40972ed7-611d-4be4-b34e-a554788c9ca7-22ipdt.webp',
        '54aa0c0f-e52f-4ec9-8665-3ebefd4590ca-22ipds.webp',
        '6cb0145c-1321-4854-92bc-59d42e03ed80-22ipdr.webp',
      ],
    },
    {
      thumbnails: [
        '40972ed7-611d-4be4-b34e-a554788c9ca7-22ipdt.webp',
        '54aa0c0f-e52f-4ec9-8665-3ebefd4590ca-22ipds.webp',
        '6cb0145c-1321-4854-92bc-59d42e03ed80-22ipdr.webp',
      ],
    },
  ],
  green: [
    {
      thumbnails: [
        '3ef662c1-7935-44e1-b226-0c4d361fdbd6-2gvo91.webp',
        '3c2ba76f-0869-486d-b68c-bc6ad8e0c589-2gvo90.webp',
        '8417e3af-1def-4a34-8438-ee63ad4eab0b-2gvo8z.webp',
      ],
    },
    {
      thumbnails: [
        '3ef662c1-7935-44e1-b226-0c4d361fdbd6-2gvo91.webp',
        '3c2ba76f-0869-486d-b68c-bc6ad8e0c589-2gvo90.webp',
        '8417e3af-1def-4a34-8438-ee63ad4eab0b-2gvo8z.webp',
      ],
    },
  ],
  blue: [
    {
      thumbnails: [
        '6abbb1b8-40bc-4ec7-ba54-68d949d70878-lvjxt8.webp',
        '5e239a53-8da6-4d81-8363-18290bfab97a-lvjxt9.webp',
        '9b39acd2-053f-4f7e-9aa8-bd59950145d3-lvjxta.webp',
      ],
    },
    {
      thumbnails: [
        '6abbb1b8-40bc-4ec7-ba54-68d949d70878-lvjxt8.webp',
        '5e239a53-8da6-4d81-8363-18290bfab97a-lvjxt9.webp',
        '9b39acd2-053f-4f7e-9aa8-bd59950145d3-lvjxta.webp',
      ],
    },
  ],
};
const Pad6Images = {
  gray: [
    {
      thumbnails: [
        '7d69b073-555a-48ec-9152-b336e356a92a-a2glu4.webp',
        '444d1c1c-714d-4710-b024-f07512e987c8-a2glu5.webp',
        '5de3fe61-e38c-4088-85de-7314b94ef725-a2glu6.webp',
      ],
    },
    {
      thumbnails: [
        '7d69b073-555a-48ec-9152-b336e356a92a-a2glu4.webp',
        '444d1c1c-714d-4710-b024-f07512e987c8-a2glu5.webp',
        '5de3fe61-e38c-4088-85de-7314b94ef725-a2glu6.webp',
      ],
    },
  ],
  gold: [
    {
      thumbnails: [
        '35bcb5a1-9899-4409-8228-f4b00aa65560-7z4oz3.webp',
        '2eb94db5-8ad5-43aa-b8d5-5e468c12217f-7z4oz4.webp',
        '29a39fa1-3ae7-4f58-b81f-6686553ca3a8-7z4oz5.webp',
      ],
    },
    {
      thumbnails: [
        '35bcb5a1-9899-4409-8228-f4b00aa65560-7z4oz3.webp',
        '2eb94db5-8ad5-43aa-b8d5-5e468c12217f-7z4oz4.webp',
        '29a39fa1-3ae7-4f58-b81f-6686553ca3a8-7z4oz5.webp',
      ],
    },
  ],
};

export const Categories = [
  {
    name: 'Smartphones',
  },
  {
    name: 'Tablets',
  },
  {
    name: 'Laptops',
  },
  {
    name: 'Accessories',
  },
  {
    name: 'Test2 Category',
  },
].map((obj, index) => ({ id: index + 1, ...obj }));
///
export const Colors = [
  {
    name: 'White',
  },
  {
    name: 'Black',
  },
  {
    name: 'Red',
  },
  {
    name: 'Green',
  },
  {
    name: 'Blue',
  },
  {
    name: 'Purple',
  },
  {
    name: 'Silver',
  },
  {
    name: 'Gray',
  },
  {
    name: 'Gold',
  },
].map((obj, index) => ({ id: index + 1, ...obj }));
export const Memory = [
  {
    name: '64GB',
  },
  {
    name: '128GB',
  },
  {
    name: '256GB',
  },
  {
    name: '512GB',
  },
  {
    name: '1TB',
  },
].map((obj, index) => ({ id: index + 1, ...obj }));
export const RAM = [
  {
    name: '4GB',
  },
  {
    name: '8GB',
  },
  {
    name: '12GB',
  },
  {
    name: '16GB',
  },
].map((obj, index) => ({ id: index + 1, ...obj }));
///
export const Products = [
  {
    description:
      'Discover the world of mobile technology with the new POCO C65 from Xiaomi, the perfect combination of performance, style and innovation. This smartphone embodies everything you need for communication, entertainment and work. It offers you flawless picture quality on a 6.74-inch IPS LCD display with a 90Hz refresh rate and 720 x 1600 pixel resolution, making every moment smooth and vivid.',
    totalRating: 0,
    categoryId: 1,
    colors: [Colors[4], Colors[1]],
    ram: [RAM[1]],
    memory: [Memory[1], Memory[2]],
  },
  {
    description:
      'A smartphone that embodies power and style, designed for those who value high technology and quality. With a light weight of just 181g and a slim body measuring 161.2 x 74.3 x 8mm, this smartphone fits easily into your pocket or bag while offering impeccable performance and ease of use.',
    totalRating: 5,
    categoryId: 1,
    colors: [Colors[1]],
    ram: [RAM[1], RAM[2]],
    memory: [Memory[2], Memory[3], Memory[4]],
  },
  {
    description:
      'Xiaomi Redmi 13C combines affordability, high technology and stylish design, making it an ideal choice for those looking for a quality smartphone at a reasonable price. This device features a 6.74-inch 90Hz screen that delivers bright and clear images and is also certified for low blue light, making it easy on the eyes to use.',
    totalRating: 3,
    categoryId: 1,
    colors: [Colors[1], Colors[3], Colors[4]],
    ram: [RAM[0]],
    memory: [Memory[1], Memory[2]],
  },
  {
    description: 'Black 50w power bank from xiaomi',
    totalRating: 0,
    categoryId: 4,
    colors: [Colors[1]],
    ram: [],
    memory: [],
  },
  {
    description: 'Silver power bank from xiaomi with 2usb type c ports',
    totalRating: 0,
    categoryId: 4,
    colors: [Colors[6]],
    // ram: [],
    // memory: [],
  },
  {
    description: 'Black Speakers with ir control from xiaomi',
    totalRating: 0,
    categoryId: 4,
    colors: [Colors[1]],
  },
  {
    description: 'Wireless earphones from xiaomi',
    totalRating: 0,
    categoryId: 4,
    colors: [Colors[1]],
  },
  {
    description: 'Wireless earphones from xiaomi',
    totalRating: 0,
    categoryId: 4,
    colors: [Colors[5]],
  },
  {
    description: 'Wireless earphones bluetooth v5.3',
    totalRating: 0,
    categoryId: 4,
    colors: [Colors[4]],
  },
  {
    description:
      'Buy the new Pad 6 from Xiaomi, a premium brand product that offers outstanding performance and design. With a maximum processor speed of 3.2GHz and Snapdragon 870 processor, this tablet delivers fast and smooth performance. The IPS screen with a 144Hz refresh rate and 2880 x 1800 resolution displays crisp, detailed images. The elegant and compact design with an aluminum body and dimensions of 254 x 165.2 x 6.5 mm is impressive at first glance.',
    totalRating: 0,
    categoryId: 2,
    colors: [Colors[7], Colors[8]],
    ram: [RAM[1]],
    memory: [Memory[1], Memory[2]],
  },
].map((obj, index) => ({ id: index + 1, ...obj }));
export const ProductInfo = [...PocoC65, ...PocoX6, ...Redmi13C, ...Pad6];
export const ProductItemThumbnails = [
  ...PocoC65Images.black,
  ...PocoC65Images.blue,
  ...PocoX6Images.black,
  ...Redmi13CImages.black,
  ...Redmi13CImages.green,
  ...Redmi13CImages.blue,
  ...Pad6Images.gray,
  ...Pad6Images.gold,
].map((obj, index) => ({ productItemId: index + 1, ...obj }));
export const ProductItemsSmartphones = [
  ...variants.pocoC65,
  ...variants.pocoX6,
  ...variants.redmi13C,
  ...variants.pad6,
];
export const ProductItemsSimple = [
  {
    productId: 4, // power bank 20000mah
    img: '7cf4c98e-2efb-4cb5-a736-b16b4350555b-68odnw.webp',
    title: 'Mi Power Bank 20000mah',
    price: 1299,
    oldPrice: 1499,
    cnt: 15,
  },
  {
    productId: 5, // silver power bank 10000mah
    img: 'b74ce53b-09b2-4eb3-b7d6-60cb61ae7439-w88i55.webp',
    title: 'Mi 3 Power Bank 10000mah',
    price: 399,
    cnt: 3,
  },
  {
    productId: 6, // smart-speaker-ir-control
    img: '7f31afea-cce6-4c68-8806-6a4d027d572c-uh0r1n.webp',
    title: 'Smart-speaker-ir-control',
    price: 799,
    cnt: 2,
  },
  {
    productId: 7, // smart-speaker-ir-control
    img: 'c9a2d347-d83f-48fa-9c44-e910646a7c0b-7zifgf.webp',
    title: 'Buds 5 black',
    price: 1699,
    oldPrice: 1999,
    cnt: 2,
  },
  {
    productId: 8, // Redmi Buds 5 Pro Aurora Purple
    title: 'Redmi Buds 5 Pro Aurora Purple',
    img: 'b25d4fac-a127-47d1-9a34-4f9e2b4d71c4-ipwn3q.webp',
    price: 1499,
    oldPrice: 1599,
    cnt: 1,
  },
  {
    productId: 9, // Redmi Buds 5 Sky Blue
    title: 'Redmi Buds 5 Sky Blue',
    img: '46518531-f0e4-4876-ba58-77c164d8a49a-b2bp07.webp',
    price: 699,
    cnt: 2,
  },
];

//  {
//   title: 'Material',
//   description: 'Plastic',
//   productId: 1,
// },
// {
//   title: 'Glasses shape',
//   description: 'Square',
//   productId: 1,
// },
// {
//   title: 'Lens width (mm)',
//   description: '52',
//   productId: 1,
// },
// {
//   title: 'Bridge width (mm)',
//   description: '21',
//   productId: 1,
// },
// {
//   title: 'Type',
//   description: 'Sunglasses',
//   productId: 1,
// },
// {
//   title: 'Lens color',
//   description: 'Solid Black',
//   productId: 1,
// },
// {
//   title: 'Frame color',
//   description: 'Black',
//   productId: 1,
// },
// {
//   title: 'Polarized',
//   description: 'No',
//   productId: 1,
// },
// {
//   title: 'Gender',
//   description: 'Woman',
//   productId: 1,
// },
