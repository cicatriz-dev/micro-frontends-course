// Note: Apps should import the global CSS separately:
// import '@repo/ui/src/styles/globals.css'

// Components
export { Button } from './components/Button';
export type { ButtonProps } from './components/Button';

export { Input } from './components/Input';
export type { InputProps } from './components/Input';

export { Card, CardHeader, CardTitle, CardContent, CardFooter } from './components/Card';
export type {
  CardProps,
  CardHeaderProps,
  CardTitleProps,
  CardContentProps,
  CardFooterProps,
} from './components/Card';

export { Form, FormField, FormLabel, FormError, FormHelper } from './components/Form';
export type {
  FormProps,
  FormFieldProps,
  FormLabelProps,
  FormErrorProps,
  FormHelperProps,
} from './components/Form';

export { Modal } from './components/Modal';
export type { ModalProps } from './components/Modal';

export { LoadingSpinner, LoadingPage } from './components/LoadingSpinner';
export type { LoadingSpinnerProps, LoadingPageProps } from './components/LoadingSpinner';

// Utilities
export { cn } from './utils/cn';

// Re-export Framer Motion for use in MFEs
export { motion, AnimatePresence } from 'framer-motion';
