import { useEffect, useRef, useState } from "react";
import { ImageData } from "../utils/types";

const ImageGrid = () => {
  const [imageData, setImageData] = useState<ImageData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const intervalRef = useRef<any>(null);

  // load images based on the current page
  async function fetchImages(currentPage: number) {
    const url = `https://picsum.photos/v2/list?page=${currentPage}&limit=9`;
    const response = await fetch(url);
    const data = await response.json();
    setImageData(
      data.map((img: ImageData) => {
        // replace the download_url with a 200x200 image [ for faster image access & less data usage ]
        const parts = img.download_url.split("/");
        const baseUrl = parts.slice(0, -2).join("/");
        return {
          ...img,
          download_url: `${baseUrl}/${200}`,
        };
      })
    );
  }

  // load images on initial render
  useEffect(() => {
    fetchImages(currentPage);
  }, [currentPage]);

  // increment page size every 10 seconds
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentPage((prev) => prev + 1);
    }, 10000);
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  //   console.log("imageData", imageData);
  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-x-5 gap-y-5 flex-1  place-items-center items-center justify-center w-[680px]">
      {imageData.map((img) => (
        <img
          src={img.download_url ?? "https://picsum.photos/200"}
          alt="placeholder"
          key={img.id}
          className=" h-[200px] w-[200px] rounded-xl bg-cover"
        />
      ))}
    </div>
  );
};

export default ImageGrid;
