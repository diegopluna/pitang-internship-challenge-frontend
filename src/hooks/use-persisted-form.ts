import { useEffect } from 'react';
import { UseFormReturn, useForm, FieldValues, UseFormProps } from 'react-hook-form';

export function usePersistedForm<TFieldValues extends FieldValues = FieldValues>(
  key: string,
  options: UseFormProps<TFieldValues>
): UseFormReturn<TFieldValues> {
  const savedData = localStorage.getItem(key);
  const parsedData = savedData ? JSON.parse(savedData) : null;

  if (parsedData) {
    Object.keys(parsedData).forEach((field) => {
      if (parsedData[field] && typeof parsedData[field] === 'string') {
        const date = new Date(parsedData[field]);
        if (!isNaN(date.getTime())) {
          parsedData[field] = date;
        }
      }
    });
  }

  const form = useForm<TFieldValues>({
    ...options,
    defaultValues: parsedData || options.defaultValues,
  });

  useEffect(() => {
    const subscription = form.watch((value) => {
      localStorage.setItem(key, JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [form, key]);

  return form;
}