import { createFormHook, createFormHookContexts } from "@tanstack/solid-form";

import { SubmitButton } from "~/client/components/form/submit-button.tsx";
import { TextField } from "~/client/components/form/text-field.tsx";
import { TextareaField } from "~/client/components/form/textarea-field.tsx";
import { OTPFieldComponent as OTPField } from "~/client/components/form/otp-field.tsx";

// Export contexts so components can use them
export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

// Create the app form hook with pre-bound components
export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    OTPField,
    TextField,
    TextareaField,
  },
  formComponents: {
    SubmitButton,
  },
});
