"use client";

import { H1 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { serviceSchema } from "@/schemas/ServicesSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadCloud } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Controller, useForm } from "react-hook-form";

const DEFAULT = {
  name: "Nursing",
  description:
    "Professional medical consultation and examination by qualified doctors",
  basePrice: 500,
  equipmentCharges: 0,
  taxPercentage: 18,
  modes: ["Home Service", "Visit Provider Location"],
  supportsDuration: true,
  defaultDuration: 30,
  durationOptions: [30, 45, 60],
  paymentMode: "Both",
  icon: "doctor-icon.png",
  image: "doctor-service.jpg",
};

const CreateService = () => {
   const [serverError, setServerError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(DEFAULT.image || "");
  const [iconPreview, setIconPreview] = useState(DEFAULT.icon || "");

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(serviceSchema),
    defaultValues: DEFAULT,
    mode: "onBlur",
  });

  const supportsDuration = watch("supportsDuration");

  // ===== Image upload using react-dropzone (frontend-only demo) =====
  const onDropImage = useCallback((acceptedFiles) => {
    if (!acceptedFiles || acceptedFiles.length === 0) return;
    const file = acceptedFiles[0];
    const url = URL.createObjectURL(file);
    setImagePreview(url);
    // store in form as placeholder filename (in real app upload to server/cloud and store returned URL)
    setValue("image", file.name);
  }, [setValue]);

  const onDropIcon = useCallback((acceptedFiles) => {
    if (!acceptedFiles || acceptedFiles.length === 0) return;
    const file = acceptedFiles[0];
    const url = URL.createObjectURL(file);
    setIconPreview(url);
    setValue("icon", file.name);
  }, [setValue]);

  const { getRootProps: getRootImageProps, getInputProps: getInputImageProps } = useDropzone({
    onDrop: onDropImage,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  const { getRootProps: getRootIconProps, getInputProps: getInputIconProps } = useDropzone({
    onDrop: onDropIcon,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  // ===== Submit handler (demo) =====
  async function onSubmit(values) {
    setServerError("");
    setUploading(true);

    // In a real app you'd upload files to S3/Cloudinary and then submit the payload to your API.
    // Here we'll simulate a network request and log the final payload.
    try {
      const payload = {
        ...values,
        // if image/icon are local filenames, replace by preview URL for demo
        image: imagePreview || values.image,
        icon: iconPreview || values.icon,
      };

      // Simulate network
      await new Promise((r) => setTimeout(r, 700));
      console.log("Service payload to submit:", payload);
      alert("Service saved (demo). Check console for payload.");
    } catch (err) {
      console.error(err);
      setServerError("Something went wrong uploading the service. Try again.");
    } finally {
      setUploading(false);
    }
  }

  // helper to render a small badge input for durations
  function DurationChips({ values = [], onChange }) {
    return (
      <div className="flex gap-2 flex-wrap">
        {values.map((d) => (
          <button
            key={d}
            type="button"
            className="px-3 py-1 rounded-lg border text-sm hover:shadow"
            onClick={() => {
              // toggle
              const current = watch("durationOptions") || [];
              const exists = current.includes(d);
              const next = exists ? current.filter((x) => x !== d) : [...current, d].sort((a,b)=>a-b);
              setValue("durationOptions", next);
            }}
          >
            {d} min
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <H1>Add Service</H1>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Add / Edit Service</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...{ control, handleSubmit }}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Name</Label>
                <Input placeholder="Service name" {...register("name")} />
                {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <Label>Base Price (₹)</Label>
                <Input type="number" step="1" {...register("basePrice", { valueAsNumber: true })} />
                {errors.basePrice && <p className="text-xs text-red-600 mt-1">{errors.basePrice.message}</p>}
              </div>

              <div className="md:col-span-2">
                <Label>Description</Label>
                <Textarea rows={4} placeholder="Short description" {...register("description")} />
                {errors.description && <p className="text-xs text-red-600 mt-1">{errors.description.message}</p>}
              </div>

              <div>
                <Label>Equipment Charges (₹)</Label>
                <Input type="number" {...register("equipmentCharges", { valueAsNumber: true })} />
                {errors.equipmentCharges && <p className="text-xs text-red-600 mt-1">{errors.equipmentCharges.message}</p>}
              </div>

              <div>
                <Label>Tax Percentage (%)</Label>
                <Input type="number" {...register("taxPercentage", { valueAsNumber: true })} />
                {errors.taxPercentage && <p className="text-xs text-red-600 mt-1">{errors.taxPercentage.message}</p>}
              </div>

              <div className="md:col-span-2">
                <Label>Modes</Label>
                <div className="flex gap-3 mt-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value="Home Service"
                      {...register("modes")}
                      defaultChecked={DEFAULT.modes.includes("Home Service")}
                    />
                    <span>Home Service</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value="Visit Provider Location"
                      {...register("modes")}
                      defaultChecked={DEFAULT.modes.includes("Visit Provider Location")}
                    />
                    <span>Visit Provider Location</span>
                  </label>
                </div>
                {errors.modes && <p className="text-xs text-red-600 mt-1">{errors.modes.message}</p>}
              </div>

              <div className="flex items-center gap-3">
                <Label>Supports Duration</Label>
                <Controller
                  control={control}
                  name="supportsDuration"
                  render={({ field }) => (
                    <Switch checked={field.value} onCheckedChange={(v) => field.onChange(Boolean(v))} />
                  )}
                />
              </div>

              {supportsDuration && (
                <>
                  <div>
                    <Label>Default Duration (minutes)</Label>
                    <Input type="number" {...register("defaultDuration", { valueAsNumber: true })} />
                  </div>

                  <div>
                    <Label>Duration Options</Label>
                    <div className="mt-2">
                      <Controller
                        control={control}
                        name="durationOptions"
                        render={({ field }) => (
                          <div className="flex gap-2 items-center">
                            <DurationChips values={[15, 30, 45, 60, 90]} />
                          </div>
                        )}
                      />
                      <p className="text-xs text-muted-foreground mt-1">Click chips to toggle options. Selected options are saved.</p>
                    </div>
                  </div>
                </>
              )}

              <div>
                <Label>Payment Mode</Label>
                <Select onValueChange={(val) => setValue("paymentMode", val)} defaultValue={DEFAULT.paymentMode}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select payment mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Both">Both</SelectItem>
                    <SelectItem value="Prepaid">Prepaid</SelectItem>
                    <SelectItem value="COD">COD</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Service Icon</Label>
                  <div
                    {...getRootIconProps()}
                    className="border-dashed border rounded p-3 flex items-center justify-center cursor-pointer min-h-[96px]"
                  >
                    <input {...getInputIconProps()} />
                    <div className="flex flex-col items-center gap-2">
                      <UploadCloud />
                      <span className="text-sm">Drop or click to upload icon</span>
                    </div>
                  </div>
                  {iconPreview && (
                    <div className="mt-2">
                      <img src={iconPreview} alt="icon preview" className="w-20 h-20 object-cover rounded" />
                    </div>
                  )}
                </div>

                <div>
                  <Label>Service Image</Label>
                  <div
                    {...getRootImageProps()}
                    className="border-dashed border rounded p-3 flex items-center justify-center cursor-pointer min-h-[96px]"
                  >
                    <input {...getInputImageProps()} />
                    <div className="flex flex-col items-center gap-2">
                      <UploadCloud />
                      <span className="text-sm">Drop or click to upload image</span>
                    </div>
                  </div>
                  {imagePreview && (
                    <div className="mt-2">
                      <img src={imagePreview} alt="image preview" className="w-full h-40 object-cover rounded" />
                    </div>
                  )}
                </div>
              </div>

            </div>

            {serverError && <p className="text-sm text-red-600">{serverError}</p>}

            <div className="flex gap-3 justify-end">
              <Button variant="secondary" type="button" onClick={() => {
                // reset to defaults quickly
                Object.entries(DEFAULT).forEach(([k, v]) => setValue(k, v));
                setImagePreview(DEFAULT.image || "");
                setIconPreview(DEFAULT.icon || "");
              }}>
                Reset to sample
              </Button>

              <Button type="submit" disabled={isSubmitting || uploading}>
                {uploading || isSubmitting ? "Saving..." : "Save Service"}
              </Button>
            </div>
          </form>
        </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateService;

// export default function AddServiceForm() {
 

//   return (
//     <div className="max-w-3xl mx-auto p-4">
//       <Card className="shadow-md">
//         <CardHeader>
//           <CardTitle>Add / Edit Service</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Form {...{ control, handleSubmit }}>
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <Label>Name</Label>
//                 <Input placeholder="Service name" {...register("name")} />
//                 {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name.message}</p>}
//               </div>

//               <div>
//                 <Label>Base Price (₹)</Label>
//                 <Input type="number" step="1" {...register("basePrice", { valueAsNumber: true })} />
//                 {errors.basePrice && <p className="text-xs text-red-600 mt-1">{errors.basePrice.message}</p>}
//               </div>

//               <div className="md:col-span-2">
//                 <Label>Description</Label>
//                 <Textarea rows={4} placeholder="Short description" {...register("description")} />
//                 {errors.description && <p className="text-xs text-red-600 mt-1">{errors.description.message}</p>}
//               </div>

//               <div>
//                 <Label>Equipment Charges (₹)</Label>
//                 <Input type="number" {...register("equipmentCharges", { valueAsNumber: true })} />
//                 {errors.equipmentCharges && <p className="text-xs text-red-600 mt-1">{errors.equipmentCharges.message}</p>}
//               </div>

//               <div>
//                 <Label>Tax Percentage (%)</Label>
//                 <Input type="number" {...register("taxPercentage", { valueAsNumber: true })} />
//                 {errors.taxPercentage && <p className="text-xs text-red-600 mt-1">{errors.taxPercentage.message}</p>}
//               </div>

//               <div className="md:col-span-2">
//                 <Label>Modes</Label>
//                 <div className="flex gap-3 mt-2">
//                   <label className="flex items-center gap-2">
//                     <input
//                       type="checkbox"
//                       value="Home Service"
//                       {...register("modes")}
//                       defaultChecked={DEFAULT.modes.includes("Home Service")}
//                     />
//                     <span>Home Service</span>
//                   </label>
//                   <label className="flex items-center gap-2">
//                     <input
//                       type="checkbox"
//                       value="Visit Provider Location"
//                       {...register("modes")}
//                       defaultChecked={DEFAULT.modes.includes("Visit Provider Location")}
//                     />
//                     <span>Visit Provider Location</span>
//                   </label>
//                 </div>
//                 {errors.modes && <p className="text-xs text-red-600 mt-1">{errors.modes.message}</p>}
//               </div>

//               <div className="flex items-center gap-3">
//                 <Label>Supports Duration</Label>
//                 <Controller
//                   control={control}
//                   name="supportsDuration"
//                   render={({ field }) => (
//                     <Switch checked={field.value} onCheckedChange={(v) => field.onChange(Boolean(v))} />
//                   )}
//                 />
//               </div>

//               {supportsDuration && (
//                 <>
//                   <div>
//                     <Label>Default Duration (minutes)</Label>
//                     <Input type="number" {...register("defaultDuration", { valueAsNumber: true })} />
//                   </div>

//                   <div>
//                     <Label>Duration Options</Label>
//                     <div className="mt-2">
//                       <Controller
//                         control={control}
//                         name="durationOptions"
//                         render={({ field }) => (
//                           <div className="flex gap-2 items-center">
//                             <DurationChips values={[15, 30, 45, 60, 90]} />
//                           </div>
//                         )}
//                       />
//                       <p className="text-xs text-muted-foreground mt-1">Click chips to toggle options. Selected options are saved.</p>
//                     </div>
//                   </div>
//                 </>
//               )}

//               <div>
//                 <Label>Payment Mode</Label>
//                 <Select onValueChange={(val) => setValue("paymentMode", val)} defaultValue={DEFAULT.paymentMode}>
//                   <SelectTrigger className="w-full">
//                     <SelectValue placeholder="Select payment mode" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="Both">Both</SelectItem>
//                     <SelectItem value="Prepaid">Prepaid</SelectItem>
//                     <SelectItem value="COD">COD</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <Label>Service Icon</Label>
//                   <div
//                     {...getRootIconProps()}
//                     className="border-dashed border rounded p-3 flex items-center justify-center cursor-pointer min-h-[96px]"
//                   >
//                     <input {...getInputIconProps()} />
//                     <div className="flex flex-col items-center gap-2">
//                       <UploadCloud />
//                       <span className="text-sm">Drop or click to upload icon</span>
//                     </div>
//                   </div>
//                   {iconPreview && (
//                     <div className="mt-2">
//                       <img src={iconPreview} alt="icon preview" className="w-20 h-20 object-cover rounded" />
//                     </div>
//                   )}
//                 </div>

//                 <div>
//                   <Label>Service Image</Label>
//                   <div
//                     {...getRootImageProps()}
//                     className="border-dashed border rounded p-3 flex items-center justify-center cursor-pointer min-h-[96px]"
//                   >
//                     <input {...getInputImageProps()} />
//                     <div className="flex flex-col items-center gap-2">
//                       <UploadCloud />
//                       <span className="text-sm">Drop or click to upload image</span>
//                     </div>
//                   </div>
//                   {imagePreview && (
//                     <div className="mt-2">
//                       <img src={imagePreview} alt="image preview" className="w-full h-40 object-cover rounded" />
//                     </div>
//                   )}
//                 </div>
//               </div>

//             </div>

//             {serverError && <p className="text-sm text-red-600">{serverError}</p>}

//             <div className="flex gap-3 justify-end">
//               <Button variant="secondary" type="button" onClick={() => {
//                 // reset to defaults quickly
//                 Object.entries(DEFAULT).forEach(([k, v]) => setValue(k, v));
//                 setImagePreview(DEFAULT.image || "");
//                 setIconPreview(DEFAULT.icon || "");
//               }}>
//                 Reset to sample
//               </Button>

//               <Button type="submit" disabled={isSubmitting || uploading}>
//                 {uploading || isSubmitting ? "Saving..." : "Save Service"}
//               </Button>
//             </div>
//           </form>
//         </Form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
