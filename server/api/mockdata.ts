export default defineEventHandler(() => {
    // Mock data
    const mockData = [
      {
        id: 1,
        name: "For Men",
        products: [
          {
            id: 1,
            url: "https://flik-luck.co.il/_ipx/_/https://flik-luck-products.s3.eu-north-1.amazonaws.com/FLP346/main.webp%3Ft=1730211022148",
            name: "Gift 1",
            price: 120,
          },
          {
            id: 2,
            url: "https://flik-luck.co.il/_ipx/_/https://flik-luck-products.s3.eu-north-1.amazonaws.com/FLP334/main.webp%3Ft=1730210776721",
            name: "Gift 2",
            price: 150,
          },
          {
            id: 3,
            url: "https://flik-luck.co.il/_ipx/_/https://flik-luck-products.s3.eu-north-1.amazonaws.com/FLP349/main.webp%3Ft=1730211102172",
            name: "Gift 3",
            price: 200,
          },
          {
            id: 4,
            url: "https://flik-luck.co.il/_ipx/_/https://flik-luck-products.s3.eu-north-1.amazonaws.com/FLP354/main.webp%3Ft=1730212925729",
            name: "Gift 4",
            price: 250,
          },
        ],
      },
      {
        id: 2,
        name: "For Women",
        products: [
          {
            id: 5,
            url: "https://flik-luck.co.il/_ipx/_/https://flik-luck-products.s3.eu-north-1.amazonaws.com/FLP326/main.webp%3Ft=1730213044441",
            name: "Gift 1",
            price: 100,
          },
          {
            id: 6,
            url: "https://flik-luck.co.il/_ipx/_/https://flik-luck-products.s3.eu-north-1.amazonaws.com/FLP312/main.webp%3Ft=1730211053832",
            name: "Gift 2",
            price: 130,
          },
          {
            id: 7,
            url: "https://flik-luck.co.il/_ipx/_/https://flik-luck-products.s3.eu-north-1.amazonaws.com/FLP324/main.webp%3Ft=1730211041338",
            name: "Gift 3",
            price: 160,
          },
          {
            id: 8,
            url: "https://flik-luck.co.il/_ipx/_/https://flik-luck-products.s3.eu-north-1.amazonaws.com/FLP323/main.webp%3Ft=1730210546406",
            name: "Gift 4",
            price: 180,
          },
          {
            id: 9,
            url: "https://flik-luck.co.il/_ipx/_/https://flik-luck-products.s3.eu-north-1.amazonaws.com/FLP325/main.webp%3Ft=1730213058356",
            name: "Gift 5",
            price: 200,
          },
          {
            id: 10,
            url: "https://flik-luck.co.il/_ipx/_/https://flik-luck-products.s3.eu-north-1.amazonaws.com/FLP324/main.webp%3Ft=1730211041338",
            name: "Gift 6",
            price: 220,
          },
        ],
      },
      {
        id: 3,
        name: "For New Mothers",
        products: [
          {
            id: 11,
            url: "https://flik-luck.co.il/_ipx/_/https://flik-luck-products.s3.eu-north-1.amazonaws.com/FLP242/main.webp%3Ft=1730212785072",
            name: "Gift 1",
            price: 180,
          },
          {
            id: 12,
            url: "https://flik-luck.co.il/_ipx/_/https://flik-luck-products.s3.eu-north-1.amazonaws.com/FLP280/second.webp",
            name: "Gift 2",
            price: 200,
          },
          {
            id: 13,
            url: "https://flik-luck.co.il/_ipx/_/https://flik-luck-products.s3.eu-north-1.amazonaws.com/FLP245/main.webp%3Ft=1730212749041",
            name: "Gift 3",
            price: 220,
          },
          {
            id: 14,
            url: "https://flik-luck.co.il/_ipx/_/https://flik-luck-products.s3.eu-north-1.amazonaws.com/FLP279/second.webp",
            name: "Gift 4",
            price: 240,
          },
        ],
      },
    ];
  
    return mockData;
  });
  