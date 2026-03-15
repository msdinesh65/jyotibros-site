# Catalog Upload Template – Jyoti & Bros

Use **Catalog-Upload-Template.csv** (or save as `.xlsx` in Excel) to add products. The agent or import script will read this and update the catalog and website.

## Template rules

- **One row per variant (colour).** Same product with 4 colours = 4 rows with the same `Product_ID`, `Title`, `Category`, etc., but different `Image_Path`, `Color`, and `Stock`.
- **Product_ID** – Unique id for the product (e.g. `2026_1001`). Same on every row for that product.
- **Category** – Use exactly one of: `Summer Collections`, `Winter Collections`, `Sarees`, `Ethnic Wear`, `Sale`.
- **Sub_Category** – Optional. Use exactly one of: `Cotton/Linen Suits`, `Party Wear`, `Premium Collection`. Products with a subcategory will appear under the matching menu (e.g. Suits → Summer Collection → Cotton/Linen Suits).
- **Image_Path** – Path under `public/`, e.g. `/images/2026_1001-blue.jpg`. Place image files in `public/images/`.
- **Color (optional)** – You can leave **Color** blank. If blank, it is **auto-detected from the image filename**:
  - Filename pattern: `something-color.jpg` or `something-color.png` (e.g. `2026_1001-blue.jpg` → Blue, `suit-red.png` → Red).
  - Supported words in filename (case-insensitive): blue, green, red, yellow, pink, black, white, maroon, navy, orange, purple, grey, brown, beige, sky, lime, dusty, rose, amber, emerald. Others fall back to the filename segment or “Default”.

## Column reference

| Column           | Required | Example / notes |
|------------------|----------|------------------|
| Product_ID       | Yes      | 2026_1001        |
| Title            | Yes      | Pure Cambric Matching Suit |
| Subtitle         | No       | Short line under title     |
| Category         | Yes      | Summer Collections (exact value) |
| Sub_Category     | No       | Cotton/Linen Suits (exact value) |
| Tags             | No       | Comma-separated: New Arrival, cotton-linen |
| Price            | Yes      | 900 (number, no ₹) |
| Original_Price    | No       | 1200 (for showing strikethrough) |
| Badge            | No       | New, -50%, -25%   |
| Is_New_Arrival   | No       | Y or N (default N) |
| Is_Best_Seller   | No       | Y or N (default N) |
| Description      | Yes      | One paragraph     |
| Detail_1–4       | No       | Bullet points (one per column) |
| Image_Path       | Yes      | /images/filename.jpg |
| Color            | No       | Blue (or leave blank for auto from filename) |
| Stock            | No       | 5 (number, default 0) |

## Where products show on the site

- **Menus:** Products appear under the menu that matches their **Category** and **Sub_Category** (e.g. Suits → Summer Collection → Cotton/Linen Suits shows all products with Sub_Category = Cotton/Linen Suits).
- **Homepage:** New Arrivals (Is_New_Arrival = Y), Best Sellers (Is_Best_Seller = Y), Sales (products with a Badge like -50%).
- **Product page:** `/products/<slug>` (slug is generated from Product_ID or Title).
- **Budget pages:** Under ₹999, ₹1000–1999, ₹2000+ based on Price.

Save your file as CSV or Excel in the `public/` folder and ask the agent to “add products from [filename] to the catalog and website”.
