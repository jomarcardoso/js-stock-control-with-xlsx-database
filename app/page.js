import { Bar } from './components/bar';
import { Table } from './components/table';
import { Dialog } from './components/dialog';

export default function Home() {
  return (
    <>
      <div className="px-5 pb-36">
        {/* <ul className="grid gap-2">
          {rows.map((row, index) => (
            <li>
              <Item
                onClick={() => current === index && setCurrent(undefined)}
                onChange={() =>
                  setCurrent(current === index ? undefined : index)
                }
                checked={current === index}
                key={row[0]}
                product={row[0]}
                quantity={row[1]}
                supplier={row[2]}
                price={row[3]}
                name="product"
                value={row[0]}
              />
            </li>
          ))}
        </ul> */}

        <Table />

        <Bar />

        {/* <Form /> */}
      </div>
      <Dialog />
    </>
  );
}
