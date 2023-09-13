import React from 'react';
import { UseFormReturn } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/src/shared/components/ui/form';
import { Textarea } from '@/src/shared/components/ui/textarea';

type Props = {
  form: UseFormReturn<any>;
  fieldName: string;
  label?: string;
  placeHolder?: string;
};

export default function InputTextArea({ fieldName, form, label, placeHolder }: Props) {
  const value = form.watch(fieldName);
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Textarea className='resize-y' placeholder={placeHolder} {...field} value={value || ''} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
