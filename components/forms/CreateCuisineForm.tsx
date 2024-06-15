"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";

import { useCreateCuisine } from "@/lib/hooks/api/cuisines/useCreateCuisine";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui//Button";
import { Input } from "@/components/ui/Input";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { z } from "zod";

interface Props {
  storeId?: string;
}

export const CuisineFormSchema = z.object({
  name: z.string().min(3, {
    message: "Cuisine name must be at least three characters.",
  }),
  value: z.string().min(1, {
    message: "Cuisine value must be at least three characters.",
  }),
});

const CreateCuisineForm = ({ storeId }: Props) => {
  // init create store hook
  const mutation = useCreateCuisine(storeId);

  // init loading state
  const isLoading = mutation.isPending;
  // init form
  const form = useForm<z.infer<typeof CuisineFormSchema>>({
    resolver: zodResolver(CuisineFormSchema),
    defaultValues: {
      name: "",
      value: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof CuisineFormSchema>) => {
    await toast.promise(mutation.mutateAsync(values), {
      loading: <span className="animate-pulse">Creating cuisine...</span>,
      success: "Cuisine created",
      error: "Something went wrong",
    });

    form.reset();
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="grid grid-cols-3 gap-8">
            {/* Name */}
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cuisine Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Cuisine name for your store"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Value */}
            <FormField
              name="value"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cuisine Value</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Cuisine value for your store"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Submit */}
          <Button disabled={isLoading} type="submit" size="sm">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                <span className="animate-pulse">Creating cuisine...</span>
              </>
            ) : (
              <>
                <span>Create Cuisine</span>
              </>
            )}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default CreateCuisineForm;
