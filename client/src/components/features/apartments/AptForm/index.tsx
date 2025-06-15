import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@/components/ui";
import { ApartmentFormData, apartmentSchema } from "@/lib/schemas";
import { Apartment } from "@/lib/types";
import {
  useCreateApartmentMutation,
  useUpdateApartmentMutation,
} from "@/store/api/apartmentApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, useEffect } from "react";
import { useForm } from "react-hook-form";

type AptFormProps = {
  apt?: Apartment;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
};

export function AptForm({ apt, setIsOpen }: AptFormProps) {
  const [createApartment, { isSuccess: isCreateSuccess }] =
    useCreateApartmentMutation();
  const [updateApartment, { isSuccess: isUpdateSuccess }] =
    useUpdateApartmentMutation();

  const form = useForm<ApartmentFormData>({
    resolver: zodResolver(apartmentSchema),
    defaultValues: {
      title: apt?.title ?? "",
      description: apt?.description ?? "",
      price: apt?.price ?? undefined,
      rooms: apt?.rooms ?? 1,
    },
  });

  const onSubmit = async (data: ApartmentFormData) => {
    if (apt) {
      await updateApartment({ id: apt._id, data });
    } else {
      await createApartment(data);
    }
  };

  useEffect(() => {
    if (isCreateSuccess || isUpdateSuccess) {
      setIsOpen(false);
    }
  }, [isCreateSuccess, isUpdateSuccess, setIsOpen]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-full mx-auto"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Modern Studio near University" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Highlight what makes your apartment unique and appealing to potential tenants."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price $</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  value={field.value === undefined ? "" : field.value}
                  onChange={(e) => {
                    const val = e.target.value;
                    field.onChange(val === "" ? undefined : Number(val));
                  }}
                  placeholder="2500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rooms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rooms</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={String(field.value || "")}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select number of rooms" />
                  </SelectTrigger>

                  <SelectContent className="max-h-40 overflow-y-auto">
                    <SelectGroup>
                      <SelectItem
                        className="cursor-pointer hover:bg-neutral-100"
                        value="1"
                      >
                        1
                      </SelectItem>
                      <SelectItem
                        className="cursor-pointer hover:bg-neutral-100"
                        value="2"
                      >
                        2
                      </SelectItem>
                      <SelectItem
                        className="cursor-pointer hover:bg-neutral-100"
                        value="3"
                      >
                        3
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}
