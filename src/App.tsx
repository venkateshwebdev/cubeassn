import { useState } from "react";
import "./App.css";
import CustomerDetails from "./components/CustomerDetails";
import Sidebar from "./components/Sidebar";
import { Customer } from "./utils/types";

function App() {
  // set active customer id to 1 by default.
  const [activeCustomerId, setActiveCustomerId] = useState(1);
  const [customers, setCustomers] = useState<Customer[]>([]);
  // find the active customer from the list of customers
  const activeCustomer = customers.find(
    (customer) => customer.id === activeCustomerId
  );

  return (
    <div className="grid grid-cols-12 h-[100svh]">
      <Sidebar
        activeCustomerId={activeCustomerId}
        setActiveCustomerId={setActiveCustomerId}
        setCustomers={setCustomers}
        customers={customers}
      />
      {activeCustomer && <CustomerDetails customer={activeCustomer} />}
    </div>
  );
}

export default App;
