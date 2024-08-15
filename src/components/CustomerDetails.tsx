import { Customer } from "../utils/types";
import ImageGrid from "./ImageGrid";

const CustomerDetails = (props: { customer: Customer }) => {
  const { customer } = props;
  return (
    <div className="col-start-4 col-span-full  px-[10%] py-5 gap-y-5 flex flex-col items-center bg-[#fcfcff]">
      <h1 className="text-2xl font-medium tracking-wide text-center">
        {customer.title} {customer.name}
      </h1>
      <p className="text-center">{customer.address}</p>
      <p className="text-center">{customer.description}</p>
      <ImageGrid key={customer.id} />
    </div>
  );
};

export default CustomerDetails;
