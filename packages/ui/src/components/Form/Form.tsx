import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

// Form Container
export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {}

export const Form = forwardRef<HTMLFormElement, FormProps>(({ className, ...props }, ref) => {
  return <form ref={ref} className={cn('space-y-4', className)} {...props} />;
});

Form.displayName = 'Form';

// Form Field
export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {}

export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn('w-full', className)} {...props} />;
  }
);

FormField.displayName = 'FormField';

// Form Label
export interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export const FormLabel = forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className, required, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn('block text-sm font-medium text-gray-700 mb-1', className)}
        {...props}
      >
        {children}
        {required && <span className="text-error ml-1">*</span>}
      </label>
    );
  }
);

FormLabel.displayName = 'FormLabel';

// Form Error
export interface FormErrorProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const FormError = forwardRef<HTMLParagraphElement, FormErrorProps>(
  ({ className, children, ...props }, ref) => {
    if (!children) return null;

    return (
      <p
        ref={ref}
        className={cn('mt-1 text-sm text-error', className)}
        {...props}
      >
        {children}
      </p>
    );
  }
);

FormError.displayName = 'FormError';

// Form Helper Text
export interface FormHelperProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const FormHelper = forwardRef<HTMLParagraphElement, FormHelperProps>(
  ({ className, ...props }, ref) => {
    return (
      <p ref={ref} className={cn('mt-1 text-sm text-gray-500', className)} {...props} />
    );
  }
);

FormHelper.displayName = 'FormHelper';
