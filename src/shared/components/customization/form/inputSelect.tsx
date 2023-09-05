import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { Check, ChevronsUpDown } from 'lucide-react'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { cn } from '@/utils/tailwindPlugin'

/* TODO : filter theo label hoac value */
type Props = {
    className?: string
    form: UseFormReturn<any>
    fieldName: string
    label?: string
    placeHolder?: string
    options?: { value: any, label: string }[]
}

export default function InputSelect({ className, form, label, placeHolder, fieldName, options = [] }: Props) {
    return (
        <FormField
            control={form.control}
            name={fieldName}
            render={({ field }) => (
                <FormItem className={`w-full ${className}`}>
                    {label && <FormLabel>{label}</FormLabel>}
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                        "w-full justify-between",
                                        !field.value && "text-muted-foreground"
                                    )}
                                >
                                    {field.value
                                        ? options?.find((op) => op.value === field.value)?.label
                                        : placeHolder}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0" >
                            <Command>
                                <CommandInput placeholder={placeHolder}
                                />
                                <CommandEmpty >
                                    Not found...
                                </CommandEmpty>
                                <CommandGroup >
                                    {options?.map((op) => (
                                        <CommandItem
                                            value={op.value}
                                            key={op.value}
                                            onSelect={(value) => {
                                                console.log(value)
                                                form.setValue(fieldName, op.value)
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    op.value === field.value
                                                        ? "opacity-100"
                                                        : "opacity-0"
                                                )}
                                            />
                                            {op.label}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    <FormMessage />
                </FormItem>
            )
            }
        />
    )
}