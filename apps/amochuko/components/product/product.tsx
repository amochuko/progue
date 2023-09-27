import { useState } from 'react';



interface ProductProps {
  category: any;
}

export function ProductCategoryRow({ category }: ProductProps) {
  return (
    <tr>
      <th colSpan={2}>{category}</th>
    </tr>
  );
}

interface ProductRowProps {
  product: any;
}

function ProductRow({ product }: ProductRowProps) {
  const name = product.stocked ? (
    product.name
  ) : (
    <span style={{ color: 'red' }}>{product.name}</span>
  );

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

interface ProductTableProps {
  product: any;
  filterText: string;
  inStockOnly: boolean;
}
function ProductTable({ product, filterText, inStockOnly }: ProductTableProps) {
  const rows: any[] = [];
  let lastCategory: any = null;

  product.forEach((prod: any) => {
    if (prod.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }

    if (inStockOnly && !prod.stocked) {
      return;
    }

    if (prod.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow category={prod.category} key={prod.category} />
      );
    }

    rows.push(<ProductRow product={prod} key={prod.name} />);

    lastCategory = prod.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

interface SearchBarProps {
  filterText: string;
  inStockOnly: boolean;
  onFilterTxtChaange: Function;
  onInStockOnlyChaange: Function;
}
function SearchBar({
  filterText,
  inStockOnly,
  onFilterTxtChaange,
  onInStockOnlyChaange,
}: SearchBarProps) {
  return (
    <form>
      <input
        type='text'
        placeholder='Search...'
        value={filterText}
        onChange={(e) => onFilterTxtChaange(e.target.value)}
      />
      <label htmlFor=''>
        <input
          type='checkbox'
          checked={inStockOnly}
          onChange={(e) => onInStockOnlyChaange(e.target.checked)}
        />
        Only show products in stock
      </label>
    </form>
  );
}

interface FilterableProductTableProps {
  products: any;
}
export function FilterableProductTable({
  products,
}: FilterableProductTableProps) {
  const [filterText, setFilterText] = useState<string>('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTxtChaange={setFilterText}
        onInStockOnlyChaange={setInStockOnly}
      />
      <ProductTable
        product={products}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </div>
  );
}
