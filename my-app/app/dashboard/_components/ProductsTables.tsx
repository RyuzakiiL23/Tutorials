import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import React from "react";

export default function ProductsTables() {
  const data = [
    {
      id: 1,
      name: "name1",
      image: "image1",
      price: "price1",
      status: "status1",
      collection: "collection1",
    },
    {
      id: 2,
      name: "name2",
      image: "image2",
      price: "price2",
      status: "status2",
      collection: "collection2",
    },
    {
      id: 3,
      name: "name3",
      image: "image3",
      price: "price3",
      status: "status3",
      collection: "collection3",
    },
  ];
  return (
    <div className="border rounded m-4 ">
      <div className="flex relative items-center justify-between border-b">
        <div className="p-2 w-[10%]">img</div>
        <div className="p-2 w-[30%]">name</div>
        <div className="p-2 w-[10%]">price</div>
        <div className="p-2 w-[10%]">status</div>
        <div className="p-2 w-[20%]">collection</div>
        <div className="p-2 w-[5%]">...</div>
      </div>
      {data.map((item) => (
        <div
          key={item.id}
          className="flex relative items-center justify-between h-16"
        >
          <div className="p-2 w-[10%]">{item.image}</div>
          <div className="p-2 w-[30%]">{item.name}</div>
          <div className="p-2 w-[10%]">{item.price}</div>
          <div className="p-2 w-[10%]">{item.status}</div>
          <div className="p-2 w-[20%]">{item.collection}</div>
          <div className="p-2 w-[5%]">...</div>
        </div>
      ))}
    </div>
  );
}
