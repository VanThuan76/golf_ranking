import React from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Eye, EyeOff } from 'lucide-react'
import { Input } from '@/components/ui/input'

type Props = {
    form: any
    fieldName: string
    label?: string
    placeHolder?: string
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>
}

export default function InputPassword({ fieldName, form, label, placeHolder, inputProps }: Props) {
    const [isShowPW, setShowPW] = React.useState(false)
    return (
        <FormField
            control={form.control}
            name={fieldName}
            render={({ field }) => (
                <FormItem >
                    {label && <FormLabel className='capitalize text-base'>{label}</FormLabel>}
                    <FormControl>
                        <div className='relative'>
                            <Input placeholder={placeHolder} {...field} {...inputProps} type={isShowPW ? 'text' : 'password'} />
                            <div className='absolute right-3 top-3 cursor-pointer' onClick={() => setShowPW(!isShowPW)}>
                                {isShowPW ? <EyeOff size={16} /> : <Eye size={16} />}
                            </div>
                        </div>
                    </FormControl>

                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
1