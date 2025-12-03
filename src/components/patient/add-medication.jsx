import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { POST } from "@/constants/apiMethods";
import { useApiMutation } from "@/hooks/useApiMutation";
import { medicationSchema } from "@/schemas/PatientSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { Textarea } from "../ui/textarea";

export const AddMedication = ({ isModalOpen, setIsModalOpen }) => {
  const params = useParams();
  const form = useForm({
    resolver: zodResolver(medicationSchema),
    defaultValues: {
      medication: "",
    },
  });

  const { control, handleSubmit, watch } = form;

  const {
    mutateAsync,
    isPending,
    data: result,
  } = useApiMutation({
    url: `/admin/patient/${params.patientId}/medications`,
    method: POST,
    invalidateKey: ["patients", params.patientId],
  });

  const onSubmit = async (values) => {
    await mutateAsync(values);
  };

  useEffect(() => {
    if (result) {
      setIsModalOpen(false);
    }
  }, [result]);

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="sm:max-w-md w-full">
        <DialogHeader>
          <DialogTitle>Add Medication</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={control}
              name="medication"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Medication</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter Medication"
                      className="resize-none max-h-40"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Actions */}
            <div className="flex gap-4 items-center justify-end">
              <Button variant="medico" type="submit" disabled={isPending}>
                {isPending ? <Spinner /> : "Add"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
