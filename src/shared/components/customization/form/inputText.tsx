import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

type Props = {
  form: UseFormReturn<any>;
  fieldName: string;
  label?: string;
  placeHolder?: string;
};

export default function InputText({ fieldName, form, label, placeHolder }: Props) {
  const value = form.watch(fieldName);
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className='text-start w-full'>
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
