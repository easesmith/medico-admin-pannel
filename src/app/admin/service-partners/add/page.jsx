"use client";

import { H1 } from "@/components/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";

// shadcn/ui components (assumes your project has them configured)
import { AddServicePartnerStep1 } from "@/components/service-partner/add-steps/add-service-partner-step1";
import { Stepper } from "@/components/service-partner/add-steps/stepper";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { fullSchema } from "@/schemas/ServiceProviderSchema";
import { useState } from "react";
import { AddServicePartnerStep2 } from "@/components/service-partner/add-steps/add-service-partner-step2";
import { AddServicePartnerStep3 } from "@/components/service-partner/add-steps/add-service-partner-step3";
import { AddServicePartnerStep4 } from "@/components/service-partner/add-steps/add-service-partner-step4";
import { AddServicePartnerStep5 } from "@/components/service-partner/add-steps/add-service-partner-step5";
import { AddServicePartnerStep6 } from "@/components/service-partner/add-steps/add-service-partner-step6";

const defaultValues = {
  firstName: "",
  lastName: "",
  ownerName: "",
  age: 25,
  dateOfBirth: "",
  gender: "Male",
  mobile: "",
  alternateNumber: "",
  landline: "",
  email: "",
  currentAddress: {
    street: "",
    locality: "",
    city: "",
    state: "",
    country: "India",
    pincode: "",
    landmark: "",
  },
  permanentAddress: {
    street: "",
    locality: "",
    city: "",
    state: "",
    country: "India",
    pincode: "",
    landmark: "",
    sameAsCurrent: false,
  },
  workAddress: {
    clinicName: "",
    street: "",
    locality: "",
    city: "",
    state: "",
    country: "India",
    pincode: "",
    landmark: "",
  },
  qualification: "",
  registrationNumber: "",
  registrationCouncil: "",
  yearsOfExperience: 0,
  services: [
    { serviceId: "", serviceName: "", experienceYears: 0, specialization: "" },
  ],
  profilePhoto: "",
  bankDetails: {
    accountHolderName: "",
    accountNumber: "",
    ifscCode: "",
    bankName: "",
    branchName: "",
    upiId: "",
  },
  availability: {
    days: [],
    timeSlots: [{ startTime: "", endTime: "" }],
    available24x7: false,
  },
  serviceCities: [],
  languages: [],
  about: "",
  emergencyContact: { name: "", relationship: "", mobile: "" },
  isAvailable: true,
};

const AddServicePartner = () => {
  const [step, setStep] = useState(5);

  const form = useForm({
    defaultValues,
    resolver: zodResolver(fullSchema),
    mode: "onTouched",
  });

  const {
    control,
    handleSubmit,
    setError,
    getValues,
    register,
    watch,
    setValue,
  } = form;

  const steps = [
    { id: "personal", label: "Personal & Contact" },
    { id: "address", label: "Addresses" },
    { id: "professional", label: "Professional & Services" },
    { id: "documents", label: "Documents" },
    { id: "bankAvailability", label: "Bank & Availability" },
    { id: "final", label: "Service Cities & Misc" },
  ];

  const validateStep = (index) => {
    try {
      const values = getValues();
      switch (index) {
        case 0:
          personalContactSchema.parse(values);
          break;
        case 1:
          addressSchema.parse(values);
          break;
        case 2:
          professionalServiceSchema.parse(values);
          break;
        case 3:
          documentsSchema.parse(values);
          break;
        case 4:
          bankAvailabilitySchema.parse(values);
          break;
        case 5:
          finalStepSchema.parse(values);
          break;
        default:
          break;
      }
      return true;
    } catch (err) {
      if (err && err.errors) {
        err.errors.forEach((e) => {
          if (e.path && e.path.length) {
            const field = e.path.join(".");
            setError(field, { type: "manual", message: e.message });
          }
        });
      }
      return false;
    }
  };

  const onNext = () => {
    // if (validateStep(step)) {
    setStep((s) => Math.min(s + 1, steps.length - 1));
    // }
  };

  const onBack = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = (data) => {
    // Final submit: data is validated by zodResolver already
    console.log("FINAL PAYLOAD", data);
    // TODO: call your API here, e.g. axios.post('/api/service-providers', data)
    // Show success toast / redirect
  };

  return (
    <div className="space-y-6">
      <Link
        href="/admin/service-partners"
        className="flex gap-1 items-center mb-4"
      >
        <ArrowLeftIcon className="text-3xl cursor-pointer" />
        <H1>Add Service Partner</H1>
      </Link>

      <Stepper steps={steps} step={step} />

      <Card>
        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {step === 0 && <AddServicePartnerStep1 />}
              {step === 1 && <AddServicePartnerStep2 />}
              {step === 2 && <AddServicePartnerStep3 />}
              {step === 3 && <AddServicePartnerStep4 />}
              {step === 4 && <AddServicePartnerStep5 />}
              {step === 5 && <AddServicePartnerStep6 />}
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between">
        <div>
          {step > 0 && (
            <Button
              variant="outline"
              type="button"
              onClick={onBack}
              className="mr-2"
            >
              Back
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2">
          {step < steps.length - 1 && (
            <Button type="button" onClick={onNext}>
              Next
            </Button>
          )}

          {step === steps.length - 1 && <Button type="submit">Submit</Button>}
        </div>
      </div>
    </div>
  );
};

export default AddServicePartner;
