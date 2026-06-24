# db

Database design artifacts only — **not connected to the running app**. The frontend's Redux store is the actual source of truth (seeded from mock data); this schema exists purely to demonstrate relational design for the assignment.

## Schema

`schema.sql` mirrors `client/src/entities/{order,product}/model/types.ts`:

- `orders` — matches `Order` (id, title, description, date).
- `products` — matches `Product`, with `guarantee: { start, end }` flattened into `guarantee_start`/`guarantee_end` columns (relational tables can't nest objects), and the `order` FK renamed to `order_id`.
- `product_prices` — a normalized child table for `Product.price: Price[]`, since a product can have more than one currency (e.g. USD + UAH, one marked default).

`products.order_id` and `product_prices.product_id` both use `ON DELETE CASCADE`, matching the app's actual delete behavior: removing an order also removes its products (`features/delete-order` dispatches `productsRemovedByOrder` alongside `orderRemoved`), and removing a product removes its prices.

## Generating the `.mwb`

MySQL Workbench's `.mwb` is a binary, GUI-authored file — it can't be safely hand-written. To produce one from `schema.sql`:

1. Open MySQL Workbench.
2. **File → Import → Reverse Engineer SQL CREATE Script**.
3. Select `schema.sql`.
4. **File → Save Model As...** → `orders-products.mwb`.
