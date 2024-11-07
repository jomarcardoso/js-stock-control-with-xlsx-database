import { Bar } from './components/bar';
import { Table } from './components/table';
import { Dialog } from './components/dialog';

export default function Home() {
  return (
    <>
      <div className="mt-4 pb-24">
        <Table />

        <Bar />

        {/* <Form /> */}
      </div>
      <Dialog />
    </>
  );
}
