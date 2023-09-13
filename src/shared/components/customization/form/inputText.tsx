import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';

type Props = {
  form: UseFormReturn<any>;
  fieldName: string;
  label?: string;
  placeHolder?: string;
  className?: string
};

export default function InputText({ fieldName, form, label, placeHolder,className }: Props) {
  const value = form.watch(fieldName);
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className={`text-start w-full ${className}`}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input placeholder={placeHolder} {...field} value={value || ''}/>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
