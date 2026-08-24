window.APP_CONFIG = {
  title: "Online Market Catalog",
  subtitle: "Manage products, descriptions, prices and stock levels.",
  entity: "product",
  plural: "products",
  accent: "#be123c",
  apiBaseUrl: "/api",
  fields: [
  {
    "name": "name",
    "label": "Product name",
    "type": "text",
    "required": true
  },
  {
    "name": "description",
    "label": "Description",
    "type": "text",
    "required": true
  },
  {
    "name": "price",
    "label": "Price",
    "type": "number",
    "required": true,
    "min": 0
  },
  {
    "name": "category",
    "label": "Category",
    "type": "text",
    "required": true
  },
  {
    "name": "stock",
    "label": "Stock",
    "type": "number",
    "required": false,
    "min": 0
  }
],
  actions: [
  {
    "id": "sell_one",
    "label": "Sell one",
    "type": "increment",
    "field": "stock",
    "amount": -1,
    "min": 0
  },
  {
    "id": "discount",
    "label": "10% discount",
    "type": "multiply",
    "field": "price",
    "factor": 0.9,
    "min": 0
  }
]
};
