export function Item({ product, quantity, supplier, price, ...props }) {
  return (
    <div
      className="shadow p-4 rounded-lg border-2 bg-gray-100 has-[input:checked]:border-pink-500 relative"
      {...props}
    >
      <input
        type="radio"
        className="appearance-none absolute inset-0"
        {...props}
      />

      <h3 className="text-xl font-semibold">{product}</h3>
      <p>Quantity: {quantity}</p>
      <p>Supplier: {supplier}</p>
      <p>Price: {price}</p>
    </div>
  );
}
