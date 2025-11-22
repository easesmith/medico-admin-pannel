"use client";

import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// shadcn/ui components (assumes these exist in your project)
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils"; // optional classNames helper


export default function ServiceProviderMultiStepForm() {
  const [step, setStep] = useState(0);

  const form = useForm({
    defaultValues,
    resolver: zodResolver(fullSchema),
    mode: "onTouched",
  });

  const { control, handleSubmit, setError, getValues, register, watch } = form;

  const servicesFieldArray = useFieldArray({ control, name: "services" });
  const educationalFieldArray = useFieldArray({
    control,
    name: "educationalCertificates",
  });

  const steps = [
    { id: "personal", label: "Personal & Contact" },
    { id: "address", label: "Addresses" },
    { id: "professional", label: "Professional & Services" },
    { id: "documents", label: "Documents" },
    { id: "bankAvailability", label: "Bank & Availability" },
    { id: "final", label: "Service Cities & Misc" },
  ];

  // Validate current step using its schema
  

  return (
    <Card>
      <CardHeader>
        <CardTitle>Service Provider — Registration</CardTitle>
      </CardHeader>

      <CardContent>
        {/* Stepper */}
        

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Step Panels */}

            {step === 0 && (
              <div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="ownerName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Owner name (optional)</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date of Birth</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Male">Male</SelectItem>
                              <SelectItem value="Female">Female</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="mobile"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mobile</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="alternateNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Alternate number</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <h3 className="text-sm font-medium mb-4">Current Address</h3>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={control}
                    name="currentAddress.street"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="currentAddress.locality"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Locality</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="currentAddress.city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="currentAddress.state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="currentAddress.pincode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pincode</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="currentAddress.landmark"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Landmark (optional)</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <h3 className="text-sm font-medium mt-6 mb-4">
                  Permanent Address
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={control}
                    name="permanentAddress.street"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="permanentAddress.locality"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Locality</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="permanentAddress.city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="permanentAddress.state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="permanentAddress.pincode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pincode</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="permanentAddress.sameAsCurrent"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Same as current</FormLabel>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormDescription>
                          Tick to copy current address into permanent address
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <h3 className="text-sm font-medium mt-6 mb-4">
                  Work Address (optional)
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={control}
                    name="workAddress.clinicName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Clinic / Work place</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="workAddress.city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={control}
                    name="qualification"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Qualification</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="registrationNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Registration Number</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="registrationCouncil"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Registration Council</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="yearsOfExperience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Years of experience</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium">Services</h4>
                    <Button
                      size="sm"
                      type="button"
                      onClick={() =>
                        servicesFieldArray.append({
                          serviceId: "",
                          serviceName: "",
                          experienceYears: 0,
                          specialization: "",
                        })
                      }
                    >
                      Add
                    </Button>
                  </div>

                  {servicesFieldArray.fields.map((item, idx) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-12 gap-2 items-end mb-2"
                    >
                      <div className="col-span-4">
                        <FormField
                          control={control}
                          name={`services.${idx}.serviceName`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Service name</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="col-span-3">
                        <FormField
                          control={control}
                          name={`services.${idx}.experienceYears`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Years</FormLabel>
                              <FormControl>
                                <Input type="number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="col-span-4">
                        <FormField
                          control={control}
                          name={`services.${idx}.specialization`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Specialization</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="col-span-1">
                        <Button
                          size="sm"
                          variant="destructive"
                          type="button"
                          onClick={() => servicesFieldArray.remove(idx)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <div className="mb-4">
                  <FormField
                    control={control}
                    name="profilePhoto"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Profile Photo (URL)</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">
                    Educational Certificates
                  </h4>
                  <div className="space-y-2">
                    {educationalFieldArray.fields.map((it, i) => (
                      <div
                        key={it.id}
                        className="grid grid-cols-3 gap-2 items-end"
                      >
                        <FormField
                          control={control}
                          name={`educationalCertificates.${i}.degree`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Degree</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={control}
                          name={`educationalCertificates.${i}.institution`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Institution</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="flex gap-2">
                          <Button
                            type="button"
                            size="sm"
                            onClick={() => educationalFieldArray.remove(i)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}

                    <Button
                      type="button"
                      size="sm"
                      onClick={() =>
                        educationalFieldArray.append({
                          degree: "",
                          institution: "",
                          year: undefined,
                          certificateUrl: "",
                        })
                      }
                    >
                      Add certificate
                    </Button>
                  </div>
                </div>

                <div className="mt-4">
                  <FormField
                    control={control}
                    name="policeVerification.certificateUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Police verification URL</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={control}
                    name="bankDetails.accountHolderName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account holder</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="bankDetails.accountNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account number</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="bankDetails.ifscCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>IFSC</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="bankDetails.upiId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>UPI ID</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="mt-6">
                  <h4 className="text-sm font-medium mb-2">Availability</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={control}
                      name="availability.available24x7"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Available 24x7</FormLabel>
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={control}
                      name="availability.days"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Days (comma separated values)</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              onChange={(e) =>
                                field.onChange(
                                  e.target.value.split(",").map((s) => s.trim())
                                )
                              }
                              value={
                                Array.isArray(field.value)
                                  ? field.value.join(",")
                                  : field.value
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 5 && (
              <div>
                <FormField
                  control={control}
                  name="serviceCities"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service cities (comma separated)</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value.split(",").map((s) => s.trim())
                            )
                          }
                          value={
                            Array.isArray(field.value)
                              ? field.value.join(",")
                              : field.value
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="languages"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Languages (comma separated)</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value.split(",").map((s) => s.trim())
                            )
                          }
                          value={
                            Array.isArray(field.value)
                              ? field.value.join(",")
                              : field.value
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="about"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>About</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="emergencyContact.mobile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Emergency contact number</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="isAvailable"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Currently available</FormLabel>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between">
              <div>
                {step > 0 && (
                  <Button
                    variant="secondary"
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

                {step === steps.length - 1 && (
                  <Button type="submit">Submit</Button>
                )}
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
