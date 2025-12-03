import { JSX, useState } from "react";
import { useForm } from "react-hook-form";

import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

import { StarPicker } from "@/components/star-picker";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { ReviewGetOneOutput } from "@/modules/reviews/types";

interface ReviewFormProps {
  productId: string;
  initialData?: ReviewGetOneOutput;
}

const formSchema = z.object({
  rating: z.number().min(1, "Rating is required").max(5),
  description: z.string().min(1, "Description is required"),
});

/**
 * ReviewForm component
 * @description This component is used to create and update reviews
 * @param productId - The id of the product
 * @param initialData? - The initial data of the review
 * @returns {JSX.Element} ReviewForm component
 */
export const ReviewForm = ({
  productId,
  initialData,
}: ReviewFormProps): JSX.Element => {
  const [isPreview, setIsPreview] = useState(!!initialData);

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const createReview = useMutation(
    trpc.reviews.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(
          trpc.reviews.getOne.queryOptions({
            productId,
          })
        );
        setIsPreview(true);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const updateReview = useMutation(
    trpc.reviews.update.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(
          trpc.reviews.getOne.queryOptions({
            productId,
          })
        );
        setIsPreview(true);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rating: initialData?.rating ?? 0,
      description: initialData?.description ?? "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (initialData) {
      updateReview.mutate({
        reviewId: initialData.id,
        rating: values.rating,
        description: values.description,
      });
    } else {
      createReview.mutate({
        rating: values.rating,
        description: values.description,
        productId,
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4"
      >
        <p className="font-medium">
          {isPreview ? "Your rating:" : "Liked it? Give it a rating"}
        </p>
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <StarPicker
                  value={field.value}
                  onChange={field.onChange}
                  disabled={isPreview}
                />
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
              <FormControl>
                <Textarea
                  placeholder="Want to leave a written review?"
                  disabled={isPreview}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {!isPreview && (
          <Button
            variant="elevated"
            disabled={createReview.isPending || updateReview.isPending}
            size="lg"
            type="submit"
            className="text-white bg-black hover:bg-pink-400 hover:text-primary w-fit"
          >
            {!!initialData ? "Update review" : "Post review"}
          </Button>
        )}
        {isPreview && (
          <Button
            onClick={() => setIsPreview(false)}
            size="lg"
            className="mt-4 w-fit"
            variant="elevated"
            type="button"
          >
            Edit
          </Button>
        )}
      </form>
    </Form>
  );
};

/**
 * Review form skeleton
 * @returns {JSX.Element} Review form skeleton
 */
export const ReviewFormSkeleton = (): JSX.Element => {
  return (
    <div className="flex flex-col gap-y-4">
      <p className="font-medium">Liked it? Give it a rating</p>
      <StarPicker disabled />
      <Textarea placeholder="Want to leave a written review?" disabled />
      <Button
        variant="elevated"
        size="lg"
        type="button"
        className="text-white bg-black hover:bg-pink-400 hover:text-primary w-fit"
        disabled
      >
        Post review
      </Button>
    </div>
  );
};
