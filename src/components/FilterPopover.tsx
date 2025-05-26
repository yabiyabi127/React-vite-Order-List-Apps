import { useState, useRef, useEffect } from "react";
import { FilterState } from "../types";
import { originOptions, destinationOptions } from "../constants/filters";
import React from "react";

interface FilterPopoverProps {
  filter: FilterState;
  setFilter: (filter: FilterState) => void;
}

export function FilterPopover({ filter, setFilter }: FilterPopoverProps) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"origin" | "destination">("origin");
  const [originSelected, setOriginSelected] = useState<string[]>(filter.origin_code);
  const [destSelected, setDestSelected] = useState<string[]>(filter.destination_code);
  const [originKeyword, setOriginKeyword] = useState("");
  const [destKeyword, setDestKeyword] = useState("");
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleApply = () => {
    const newFilter = {
      ...filter,
      origin_code: originSelected,
      destination_code: destSelected,
    };
    setFilter(newFilter);
    setOpen(false);
  };

  const handleReset = () => {
    setOriginSelected([]);
    setDestSelected([]);
    setOriginKeyword("");
    setDestKeyword("");
  };

  const displayedOptions = (tab === "origin" ? originOptions : destinationOptions).filter((opt) =>
    opt.label.toLowerCase().includes((tab === "origin" ? originKeyword : destKeyword).toLowerCase())
  );

  const selectedItems = tab === "origin" ? originSelected : destSelected;
  const toggleItem = (value: string) => {
    if (tab === "origin") {
      setOriginSelected((prev) =>
        prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
      );
    } else {
      setDestSelected((prev) =>
        prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
      );
    }
  };

  return (
    <div className="relative" ref={popoverRef}>
      <button
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onClick={() => setOpen((prev) => !prev)}
      >
        Filter
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-gray-400 border border-gray-300 shadow-lg rounded-lg z-50">
          <div className="flex border-b">
            {(["origin", "destination"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setTab(type)}
                className={`flex-1 py-2 text-sm ${tab === type ? "bg-gray-100 text-gray-700" : "bg-gray-600 text-gray-100"}`}
              >
                {type === "origin" ? "Origin" : "Destination"} ({type === "origin" ? originSelected.length : destSelected.length})
              </button>
            ))}
          </div>

          <div className="p-3 space-y-2">
            <input
              type="text"
              className="w-full border px-3 py-1 rounded text-sm"
              placeholder="Cari..."
              value={tab === "origin" ? originKeyword : destKeyword}
              onChange={(e) =>
                tab === "origin" ? setOriginKeyword(e.target.value) : setDestKeyword(e.target.value)
              }
            />

            <div className="max-h-40 overflow-y-auto space-y-1">
              {displayedOptions.map((opt) => (
                <label key={opt.value} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(opt.value)}
                    onChange={() => toggleItem(opt.value)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span className="text-sm">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-between px-4 py-2 border-t">
            <button className="text-sm text-red-700" onClick={handleReset}>Reset Semua</button>
            <button
              className="bg-gray-500 text-white px-4 py-1 rounded text-sm disabled:opacity-50"
              onClick={handleApply}
              disabled={
                filter.origin_code.join() === originSelected.join() &&
                filter.destination_code.join() === destSelected.join()
              }
            >
              Terapkan
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
