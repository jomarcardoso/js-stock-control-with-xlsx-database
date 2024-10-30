export function Item({ product, quantity, supplier, price, ...props }) {
  return (
    <div
      className="shadow p-2 rounded-lg border-2 bg-gray-100 has-[input:checked]:border-pink-500 relative"
      {...props}
    >
      <input
        type="radio"
        className="appearance-none absolute inset-0"
        {...props}
      />

      <h3 className="text-xl font-semibold">{product}</h3>
      <p>
        quantidade: <b>{quantity}</b>
      </p>
      <p>
        fornecedor: <b>{supplier}</b>
      </p>
      <p>
        preço: <b>{price}</b>
      </p>
    </div>
  );
}
