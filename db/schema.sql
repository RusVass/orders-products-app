-- Documentation-only design artifact - not wired to the running app.
-- Mirrors client/src/entities/{order,product}/model/types.ts.

CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  date DATETIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  serial_number INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  type VARCHAR(100) NOT NULL,
  specification VARCHAR(255),
  is_new BOOLEAN NOT NULL DEFAULT TRUE,
  photo VARCHAR(255),
  guarantee_start DATETIME NOT NULL,
  guarantee_end DATETIME NOT NULL,
  order_id INT NOT NULL,
  date DATETIME NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- One-to-many: a product can be priced in more than one currency
-- (e.g. USD + UAH, with one marked default), matching Price[] on Product.
CREATE TABLE product_prices (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT NOT NULL,
  value DECIMAL(10, 2) NOT NULL,
  currency ENUM('USD', 'UAH') NOT NULL,
  is_default BOOLEAN NOT NULL DEFAULT FALSE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
