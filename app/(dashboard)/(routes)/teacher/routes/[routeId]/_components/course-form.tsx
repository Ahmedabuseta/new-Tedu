'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Pencil, Check, ChevronsUpDown } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getCourses } from '@/actions/route';
import { Course } from '@prisma/client';
import Image from 'next/image';

// interface Course {
//   id: string;
//   title: string;
// }

interface MultiSelectProps {
  initialData: {
    courseIds: string[];
  };
  routeId: string;
  courses: Course[]
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  initialData,
  routeId,
  courses
}) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>(initialData.courseIds);



  const toggleEdit = () => setIsEditing((current) => !current);

  const toggleItem = (item: string) => {
    setSelectedItems((current) =>
      current.includes(item)
        ? current.filter((i) => i !== item)
        : [...current, item]
    );
  };
console.log(selectedItems);

  const onSubmit = async () => {
    try {
      await axios.patch(`/api/routes/${routeId}`, { courseIds: selectedItems });
      toast.success('Route updated');
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="flex flex-col space-y-4 bg-slate-100/40 backdrop-blur-md dark:bg-black/40 p-6 rounded-md w-full">
      <div className="font-medium flex items-center justify-between">
        Courses in this route
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit courses
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div className="flex flex-wrap gap-2">
          {selectedItems.length > 0 ? (
            selectedItems.map((item) => (
              <div key={item} className="bg-blue-100 text-sky-800 text-sm font-medium px-2.5 p-1 rounded">
                {courses.find(course => course.id === item)?.title}
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500 italic">No courses selected</p>
          )}
        </div>
      )}
      {isEditing && (
        <>
          <Popover open={open} onOpenChange={setOpen} >
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="justify-between bg-slate-100/40 backdrop-blur-md dark:bg-black/40 w-full"
              >
                {selectedItems.length > 0
                  ? `${selectedItems.length} course${selectedItems.length > 1 ? 's' : ''} selected`
                  : "Select courses..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className=" w-full p-0 bg-slate-100/40 backdrop-blur-md dark:bg-black/40">
              <Command className='bg-slate-100/40 backdrop-blur-md dark:bg-black/40 w-full'>
                <CommandInput placeholder="Search courses..." />
                <CommandEmpty>No courses found.</CommandEmpty>
                <CommandGroup>
                  {courses.map((course) => (
                    <CommandItem
                      key={course.id}
                      onSelect={() => toggleItem(course.id)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedItems.includes(course.id) ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {course.title}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedItems.map((item) => (
              <div key={item} className="bg-blue-100 text-sky-800 text-sm font-medium px-2.5 p-1 rounded">
                {courses.find(course => course.id === item)?.title}
              </div>
            ))}
          </div>
          <Button onClick={onSubmit} className="mt-4">
            Save
          </Button>
        </>
      )}
    </div>
  );
};

export default MultiSelect;