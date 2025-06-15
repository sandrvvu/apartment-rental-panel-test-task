"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Label,
  Input,
} from "@/components/ui";
import { PriceFilter } from "@/lib/types";

export function AptFilterBar({
  onRoomChange,
  onPriceChange,
}: {
  onRoomChange: (value: number | null) => void;
  onPriceChange: (value: PriceFilter) => void;
}) {
  const [price, setPrice] = useState<PriceFilter>({
    from: undefined,
    to: undefined,
  });

  const handlePriceChange = (type: "from" | "to", value: number) => {
    const updated = { ...price, [type]: value || undefined };
    setPrice(updated);
    onPriceChange(updated);
  };

  return (
    <div className="my-3 flex flex-row gap-4 items-start sm:items-end">
      <div>
        <Label htmlFor="roomSelect" className="mb-1 block">
          Number of Rooms
        </Label>
        <Select
          onValueChange={(val) =>
            onRoomChange(val === "-1" ? null : parseInt(val))
          }
        >
          <SelectTrigger id="roomSelect" className="w-34 sm:w-40">
            <SelectValue placeholder="Select rooms" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="-1">All</SelectItem>
            <SelectItem value="1">1 Room</SelectItem>
            <SelectItem value="2">2 Rooms</SelectItem>
            <SelectItem value="3">3 Rooms</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="priceFrom" className="mb-1 block">
          Price From
        </Label>
        <Input
          id="priceFrom"
          type="number"
          min={0}
          placeholder="e.g. 500"
          onChange={(e) => handlePriceChange("from", +e.target.value)}
          className="w-20 sm:w-32"
        />
      </div>

      <div>
        <Label htmlFor="priceTo" className="mb-1 block">
          Price To
        </Label>
        <Input
          id="priceTo"
          type="number"
          placeholder="e.g. 1500"
          min={1}
          onChange={(e) => handlePriceChange("to", +e.target.value)}
          className="w-20 sm:w-32"
        />
      </div>
    </div>
  );
}
