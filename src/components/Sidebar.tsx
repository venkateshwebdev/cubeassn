import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Customer, PAGE_SIZE } from "../utils/types";
import CustomerListComponent from "./CustomerListComponent";
import fetchCustomers from "../services/fetchCustomers";

const Sidebar = (props: {
  activeCustomerId: number;
  setActiveCustomerId: (id: number) => void;
  customers: Customer[];
  setCustomers: Dispatch<SetStateAction<Customer[]>>;
}) => {
  const { activeCustomerId, setActiveCustomerId, customers, setCustomers } =
    props;

  const [loading, setLoading] = useState<boolean>(false);
  const page = useRef<number>(2);
  const containerRef = useRef<HTMLDivElement>(null);

  const loadMoreCustomers = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    const newCustomers = await fetchCustomers(
      (page.current - 1) * PAGE_SIZE + 1,
      PAGE_SIZE
    );
    setCustomers((prevCustomers) => [...prevCustomers, ...newCustomers]);
    setLoading(false);
    page.current += 1;
  }, [loading]);

  // load 5 initial customers.
  useEffect(() => {
    (async () => {
      setLoading(true);
      const initialCards = await fetchCustomers(1, PAGE_SIZE);
      setCustomers(initialCards);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    const handleScroll = async () => {
      const container = containerRef.current;
      if (!container) return;

      // if the user has scrolled to the bottom of the container load more customers.
      if (
        container.scrollHeight - container.scrollTop ===
        container.clientHeight
      ) {
        loadMoreCustomers();
      }
    };
    const container = containerRef.current;
    if (container) container.addEventListener("scroll", handleScroll);

    // cleanup
    return () => container?.removeEventListener("scroll", handleScroll);
  }, [loadMoreCustomers]);

  return (
    <div
      ref={containerRef}
      className="col-start-1 col-end-4 fixed w-[25%] overflow-y-scroll h-screen shadow-xl">
      {customers.map((customer) => (
        <div
          key={customer.id}
          className={`p-5 cursor-pointer ${
            activeCustomerId === customer.id
              ? "bg-gray-200 border-r-2 border-r-gray-400"
              : ""
          }`}
          onClick={() => setActiveCustomerId(customer.id)}>
          <CustomerListComponent {...customer} key={customer.id} />
        </div>
      ))}
      {loading && (
        <div className="w-full grid place-content-center">
          <div className="rounded-full grid place-content-center h-10 w-64 animate-pulse bg-gray-300 my-4">
            Loading more...
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
