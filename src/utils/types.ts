export type Customer = {
  id: number;
  name: string;
  address: string;
  title: string;
  description: string;
};

export type ImageData = {
  id: string;
  url: string;
  download_url: string;
};

export const PAGE_SIZE = 5;
