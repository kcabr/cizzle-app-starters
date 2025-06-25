import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Checkbox } from "~/components/ui/checkbox";
import { Switch } from "~/components/ui/switch";
import { zodValidator } from "@tanstack/zod-form-adapter";

// Define form validation schema
const formSchema = z.object({
  personal: z.object({
    firstName: z
      .string()
      .min(2, { message: "First name must be at least 2 characters" }),
    lastName: z
      .string()
      .min(2, { message: "Last name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    age: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val, 10) : undefined)),
  }),
  address: z.object({
    street: z
      .string()
      .min(5, { message: "Street address must be at least 5 characters" }),
    city: z.string().min(2, { message: "City must be at least 2 characters" }),
    state: z
      .string()
      .min(2, { message: "State must be at least 2 characters" }),
    zipCode: z
      .string()
      .regex(/^\d{5}(-\d{4})?$/, { message: "Please enter a valid zip code" }),
  }),
  preferences: z.object({
    receiveEmails: z.boolean().default(false),
    receiveSMS: z.boolean().default(false),
    theme: z.enum(["light", "dark", "system"]).default("system"),
  }),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function TestForm() {
  const [output, setOutput] = useState<string>("");

  const form = useForm<FormValues>({
    defaultValues: {
      personal: {
        firstName: "",
        lastName: "",
        email: "",
        age: "",
      },
      address: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
      },
      preferences: {
        receiveEmails: false,
        receiveSMS: false,
        theme: "system",
      },
      terms: false,
    },
    onSubmit: async ({ value }) => {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setOutput(JSON.stringify(value, null, 2));
    },
  });

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">TanStack Form Demo</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-8"
      >
        {/* Personal Information Section */}
        <div className="bg-card p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <form.Field
              name="personal.firstName"
              validators={{
                onChange: (value) => {
                  try {
                    formSchema.shape.personal.shape.firstName.parse(value);
                    return { status: "success" };
                  } catch (error) {
                    return {
                      status: "error",
                      error: "First name must be at least 2 characters",
                    };
                  }
                },
                onBlur: (value) => {
                  try {
                    formSchema.shape.personal.shape.firstName.parse(value);
                    return { status: "success" };
                  } catch (error) {
                    return {
                      status: "error",
                      error: "First name must be at least 2 characters",
                    };
                  }
                },
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>First Name</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      field.handleChange(e.target.value)
                    }
                  />
                  {field.state.meta.errors &&
                  field.state.meta.errors[0]?.error ? (
                    <p className="text-sm text-destructive">
                      {field.state.meta.errors[0].error}
                    </p>
                  ) : null}
                </div>
              )}
            </form.Field>

            <form.Field
              name="personal.lastName"
              validators={{
                onChange: (value) => {
                  try {
                    formSchema.shape.personal.shape.lastName.parse(value);
                    return { status: "success" };
                  } catch (error) {
                    return {
                      status: "error",
                      error: "Last name must be at least 2 characters",
                    };
                  }
                },
                onBlur: (value) => {
                  try {
                    formSchema.shape.personal.shape.lastName.parse(value);
                    return { status: "success" };
                  } catch (error) {
                    return {
                      status: "error",
                      error: "Last name must be at least 2 characters",
                    };
                  }
                },
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Last Name</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      field.handleChange(e.target.value)
                    }
                  />
                  {field.state.meta.errors &&
                  field.state.meta.errors[0]?.error ? (
                    <p className="text-sm text-destructive">
                      {field.state.meta.errors[0].error}
                    </p>
                  ) : null}
                </div>
              )}
            </form.Field>

            <form.Field
              name="personal.email"
              validators={{
                onChange: (value) => {
                  try {
                    formSchema.shape.personal.shape.email.parse(value);
                    return { status: "success" };
                  } catch (error) {
                    return {
                      status: "error",
                      error: "Please enter a valid email address",
                    };
                  }
                },
                onBlur: (value) => {
                  try {
                    formSchema.shape.personal.shape.email.parse(value);
                    return { status: "success" };
                  } catch (error) {
                    return {
                      status: "error",
                      error: "Please enter a valid email address",
                    };
                  }
                },
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Email</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      field.handleChange(e.target.value)
                    }
                  />
                  {field.state.meta.errors &&
                  field.state.meta.errors[0]?.error ? (
                    <p className="text-sm text-destructive">
                      {field.state.meta.errors[0].error}
                    </p>
                  ) : null}
                </div>
              )}
            </form.Field>

            <form.Field
              name="personal.age"
              validators={{
                onChange: (value) => {
                  if (!value) return { status: "success" };
                  const num = parseInt(value, 10);
                  if (isNaN(num))
                    return { status: "error", error: "Age must be a number" };
                  if (num < 18)
                    return {
                      status: "error",
                      error: "You must be at least 18 years old",
                    };
                  return { status: "success" };
                },
                onBlur: (value) => {
                  if (!value) return { status: "success" };
                  const num = parseInt(value, 10);
                  if (isNaN(num))
                    return { status: "error", error: "Age must be a number" };
                  if (num < 18)
                    return {
                      status: "error",
                      error: "You must be at least 18 years old",
                    };
                  return { status: "success" };
                },
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Age</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="number"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      field.handleChange(e.target.value)
                    }
                  />
                  {field.state.meta.errors &&
                  field.state.meta.errors[0]?.error ? (
                    <p className="text-sm text-destructive">
                      {field.state.meta.errors[0].error}
                    </p>
                  ) : null}
                </div>
              )}
            </form.Field>
          </div>
        </div>

        {/* Address Section */}
        <div className="bg-card p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Address</h2>
          <div className="grid grid-cols-1 gap-4">
            <form.Field
              name="address.street"
              validators={{
                onChange: (value) => {
                  try {
                    formSchema.shape.address.shape.street.parse(value);
                    return { status: "success" };
                  } catch (error) {
                    return {
                      status: "error",
                      error: "Street address must be at least 5 characters",
                    };
                  }
                },
                onBlur: (value) => {
                  try {
                    formSchema.shape.address.shape.street.parse(value);
                    return { status: "success" };
                  } catch (error) {
                    return {
                      status: "error",
                      error: "Street address must be at least 5 characters",
                    };
                  }
                },
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Street</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      field.handleChange(e.target.value)
                    }
                  />
                  {field.state.meta.errors &&
                  field.state.meta.errors[0]?.error ? (
                    <p className="text-sm text-destructive">
                      {field.state.meta.errors[0].error}
                    </p>
                  ) : null}
                </div>
              )}
            </form.Field>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <form.Field
                name="address.city"
                validators={{
                  onChange: (value) => {
                    try {
                      formSchema.shape.address.shape.city.parse(value);
                      return { status: "success" };
                    } catch (error) {
                      return {
                        status: "error",
                        error: "City must be at least 2 characters",
                      };
                    }
                  },
                  onBlur: (value) => {
                    try {
                      formSchema.shape.address.shape.city.parse(value);
                      return { status: "success" };
                    } catch (error) {
                      return {
                        status: "error",
                        error: "City must be at least 2 characters",
                      };
                    }
                  },
                }}
              >
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>City</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        field.handleChange(e.target.value)
                      }
                    />
                    {field.state.meta.errors &&
                    field.state.meta.errors[0]?.error ? (
                      <p className="text-sm text-destructive">
                        {field.state.meta.errors[0].error}
                      </p>
                    ) : null}
                  </div>
                )}
              </form.Field>

              <form.Field
                name="address.state"
                validators={{
                  onChange: (value) => {
                    try {
                      formSchema.shape.address.shape.state.parse(value);
                      return { status: "success" };
                    } catch (error) {
                      return {
                        status: "error",
                        error: "State must be at least 2 characters",
                      };
                    }
                  },
                  onBlur: (value) => {
                    try {
                      formSchema.shape.address.shape.state.parse(value);
                      return { status: "success" };
                    } catch (error) {
                      return {
                        status: "error",
                        error: "State must be at least 2 characters",
                      };
                    }
                  },
                }}
              >
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>State</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        field.handleChange(e.target.value)
                      }
                    />
                    {field.state.meta.errors &&
                    field.state.meta.errors[0]?.error ? (
                      <p className="text-sm text-destructive">
                        {field.state.meta.errors[0].error}
                      </p>
                    ) : null}
                  </div>
                )}
              </form.Field>

              <form.Field
                name="address.zipCode"
                validators={{
                  onChange: (value) => {
                    try {
                      formSchema.shape.address.shape.zipCode.parse(value);
                      return { status: "success" };
                    } catch (error) {
                      return {
                        status: "error",
                        error: "Please enter a valid zip code",
                      };
                    }
                  },
                  onBlur: (value) => {
                    try {
                      formSchema.shape.address.shape.zipCode.parse(value);
                      return { status: "success" };
                    } catch (error) {
                      return {
                        status: "error",
                        error: "Please enter a valid zip code",
                      };
                    }
                  },
                }}
              >
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Zip Code</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        field.handleChange(e.target.value)
                      }
                    />
                    {field.state.meta.errors &&
                    field.state.meta.errors[0]?.error ? (
                      <p className="text-sm text-destructive">
                        {field.state.meta.errors[0].error}
                      </p>
                    ) : null}
                  </div>
                )}
              </form.Field>
            </div>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="bg-card p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Preferences</h2>
          <div className="space-y-4">
            <form.Field name="preferences.receiveEmails">
              {(field) => (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={field.name}
                    checked={field.state.value}
                    onCheckedChange={field.handleChange}
                  />
                  <Label htmlFor={field.name}>Receive Email Updates</Label>
                </div>
              )}
            </form.Field>

            <form.Field name="preferences.receiveSMS">
              {(field) => (
                <div className="flex items-center space-x-2">
                  <Switch
                    id={field.name}
                    checked={field.state.value}
                    onCheckedChange={field.handleChange}
                  />
                  <Label htmlFor={field.name}>Receive SMS Updates</Label>
                </div>
              )}
            </form.Field>

            <form.Field name="preferences.theme">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Theme Preference</Label>
                  <div className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="theme-light"
                        name={field.name}
                        value="light"
                        checked={field.state.value === "light"}
                        onChange={() => field.handleChange("light")}
                      />
                      <Label htmlFor="theme-light">Light</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="theme-dark"
                        name={field.name}
                        value="dark"
                        checked={field.state.value === "dark"}
                        onChange={() => field.handleChange("dark")}
                      />
                      <Label htmlFor="theme-dark">Dark</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="theme-system"
                        name={field.name}
                        value="system"
                        checked={field.state.value === "system"}
                        onChange={() => field.handleChange("system")}
                      />
                      <Label htmlFor="theme-system">System</Label>
                    </div>
                  </div>
                </div>
              )}
            </form.Field>
          </div>
        </div>

        {/* Terms & Conditions */}
        <form.Field
          name="terms"
          validators={{
            onChange: (value) => {
              return value
                ? { status: "success" }
                : {
                    status: "error",
                    error: "You must accept the terms and conditions",
                  };
            },
            onBlur: (value) => {
              return value
                ? { status: "success" }
                : {
                    status: "error",
                    error: "You must accept the terms and conditions",
                  };
            },
          }}
        >
          {(field) => (
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={field.name}
                  checked={field.state.value}
                  onCheckedChange={field.handleChange}
                />
                <Label htmlFor={field.name}>
                  I agree to the Terms and Conditions
                </Label>
              </div>
              {field.state.meta.errors && field.state.meta.errors[0]?.error ? (
                <p className="text-sm text-destructive">
                  {field.state.meta.errors[0].error}
                </p>
              ) : null}
            </div>
          )}
        </form.Field>

        {/* Form Actions */}
        <div className="flex justify-between items-center">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <div className="space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                form.validate();
              }}
            >
              Validate
            </Button>
            <Button type="submit" disabled={form.state.isSubmitting}>
              {form.state.isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </div>
      </form>

      {/* Form Debug and Output */}
      <div className="mt-8 space-y-4">
        <div className="p-4 bg-muted rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Form State</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p>
                <strong>Dirty:</strong> {form.state.isDirty ? "Yes" : "No"}
              </p>
              <p>
                <strong>Valid:</strong> {form.state.isValid ? "Yes" : "No"}
              </p>
              <p>
                <strong>Submitting:</strong>{" "}
                {form.state.isSubmitting ? "Yes" : "No"}
              </p>
            </div>
            <div>
              <p>
                <strong>Submitted:</strong>{" "}
                {form.state.isSubmitted ? "Yes" : "No"}
              </p>
              <p>
                <strong>Validating:</strong>{" "}
                {form.state.isValidating ? "Yes" : "No"}
              </p>
              <p>
                <strong>Touched:</strong> {form.state.isTouched ? "Yes" : "No"}
              </p>
            </div>
          </div>
        </div>

        {output && (
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Form Submission</h3>
            <pre className="bg-card p-4 rounded-md text-xs overflow-auto">
              {output}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
