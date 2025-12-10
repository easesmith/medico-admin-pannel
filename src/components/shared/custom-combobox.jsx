"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Spinner } from "../ui/spinner";

export function CustomCombobox({
  items,
  value,
  onChange,
  placeholder = "Select...",
  labelKey = "label",
  valueKey = "value",
  search,
  setSearch,
  className,
  loading,
  disabled=false,
}) {
  const [open, setOpen] = useState(false);

  console.log("items", items);

  const selectedLabel =
    items.find((i) => String(i[valueKey]) === value)?.[labelKey] ?? "";

  return (
    <Popover open={open} onOpenChange={setOpen} modal={false}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[200px] justify-between", className)}
          disabled={disabled}
        >
          {selectedLabel || placeholder}
          <ChevronsUpDown className="opacity-50 h-4 w-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[200px] p-0">
        <Command shouldFilter={false}>
          <CommandInput
            value={search}
            onValueChange={setSearch}
            placeholder={`Search...`}
            className="h-9"
          />
          <CommandList key={items.length}>
            {loading && (
              <div className="flex justify-center items-center w-full py-1">
                <Spinner />
              </div>
            )}

            {!loading && items.length === 0 && (
              <CommandEmpty>No results found.</CommandEmpty>
            )}

            <CommandGroup>
              {items.map((item, idx) => {
                const val = String(item[valueKey]);
                const lbl = String(item[labelKey]);

                return (
                  <CommandItem
                    key={idx}
                    value={val}
                    onSelect={(currentValue) => {
                      onChange(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    {lbl}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        value === val ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
