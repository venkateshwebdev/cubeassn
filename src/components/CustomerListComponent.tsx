import { Customer } from "../utils/types";

const CustomerListComponent = ({ name, description }: Customer) => {
  return (
    <div className="p-7">
      <h1 className="text-xl font-medium tracking-wide">{name}</h1>
      <p className="mt-3 text-sm">
        {description.length > 200
          ? description.slice(0, 200) + "..."
          : description}
      </p>
    </div>
  );
};

export default CustomerListComponent;
