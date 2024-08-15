import { dummyAddresses, dummyNames, salutations } from "../utils/data";
import { Customer } from "../utils/types";

// Function to fetch customers ( paginated )
const fetchCustomers = async (
  start: number,
  limit: number
): Promise<Customer[]> => {
  // Simulating an API call
  return new Promise((resolve) => {
    // wait for 1.5 seconds before returning the data
    setTimeout(() => {
      const newCustomers = Array.from({ length: limit }, (_, index) => {
        // Randomly select a name, address, and salutation
        const randomName =
          dummyNames[Math.floor(Math.random() * dummyNames.length)];
        const randomAddress =
          dummyAddresses[Math.floor(Math.random() * dummyAddresses.length)];
        const randomSalutation =
          salutations[Math.floor(Math.random() * salutations.length)];
        return {
          id: start + index,
          name: randomName,
          title: randomSalutation,
          address: randomAddress,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        } as Customer;
      });
      resolve(newCustomers);
    }, 1500);
  });
};

export default fetchCustomers;
