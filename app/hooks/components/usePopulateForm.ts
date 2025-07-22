import { useState, useEffect, useMemo } from "react";

export function usePopulateForm<T extends Record<string, any>>(
  initialData: T | null,
  defaultValues?: Partial<T>
) {
  const [formData, setFormData] = useState<T | null>(null);
  const [isPopulated, setIsPopulated] = useState(false);

  // Memoize the default values to prevent unnecessary re-renders
  const memoizedDefaultValues = useMemo(() => defaultValues, [defaultValues]);

  useEffect(() => {
    if (initialData) {
      // Merge with default values if provided
      const populatedData = memoizedDefaultValues
        ? { ...memoizedDefaultValues, ...initialData }
        : initialData;
      setFormData(populatedData);
      setIsPopulated(true);
    } else if (memoizedDefaultValues) {
      // Use default values for new forms
      setFormData(memoizedDefaultValues as T);
      setIsPopulated(false);
    } else {
      setFormData(null);
      setIsPopulated(false);
    }
  }, [initialData, memoizedDefaultValues]);

  const updateField = (key: keyof T, value: any) => {
    setFormData((prev) =>
      prev ? { ...prev, [key]: value } : ({ [key]: value } as T)
    );
  };

  const resetForm = () => {
    setFormData((defaultValues as T) || null);
    setIsPopulated(false);
  };

  const getFieldValue = (key: keyof T): any => {
    return formData?.[key] ?? defaultValues?.[key] ?? "";
  };

  return {
    formData,
    setFormData,
    updateField,
    resetForm,
    getFieldValue,
    isPopulated,
  };
}
