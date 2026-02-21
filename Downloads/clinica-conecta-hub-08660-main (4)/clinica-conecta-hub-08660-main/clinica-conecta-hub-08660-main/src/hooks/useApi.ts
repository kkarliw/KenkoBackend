import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { ApiErrorResponse } from '@/types/index';

interface UseApiState {
  isLoading: boolean;
  isError: boolean;
  error: string | null;
  data: any;
}

interface UseApiOptions {
  showSuccessToast?: boolean;
  successMessage?: string;
  showErrorToast?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

/**
 * Hook para manejar llamadas API con estados de carga, error y éxito
 * @param asyncFunction - Función async que realiza la llamada API
 * @param options - Opciones para manejar toast y callbacks
 */
export const useApi = <T,>(
  asyncFunction: () => Promise<T>,
  options: UseApiOptions = {}
) => {
  const {
    showSuccessToast = false,
    successMessage = 'Operación completada',
    showErrorToast = true,
    onSuccess,
    onError,
  } = options;

  const [state, setState] = useState<UseApiState>({
    isLoading: false,
    isError: false,
    error: null,
    data: null,
  });

  const execute = useCallback(async () => {
    setState({ isLoading: true, isError: false, error: null, data: null });
    try {
      const result = await asyncFunction();
      setState({ isLoading: false, isError: false, error: null, data: result });
      
      if (showSuccessToast) {
        toast.success(successMessage);
      }
      
      if (onSuccess) {
        onSuccess(result);
      }
      
      return result;
    } catch (err) {
      let errorMessage = 'Error desconocido';
      
      if (err instanceof AxiosError) {
        const response = err.response?.data as ApiErrorResponse;
        errorMessage = response?.message || err.response?.statusText || 'Error en la solicitud';
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      setState({ 
        isLoading: false, 
        isError: true, 
        error: errorMessage, 
        data: null 
      });
      
      if (showErrorToast) {
        toast.error(errorMessage);
      }
      
      if (onError) {
        onError(errorMessage);
      }
      
      throw err;
    }
  }, [asyncFunction, showSuccessToast, successMessage, showErrorToast, onSuccess, onError]);

  return {
    ...state,
    execute,
  };
};

/**
 * Hook para ejecutar una función al montar el componente
 */
export const useApiOnMount = <T,>(
  asyncFunction: () => Promise<T>,
  options: UseApiOptions = {}
) => {
  const api = useApi(asyncFunction, options);

  // Auto-execute on mount
  useState(() => {
    api.execute();
  });

  return api;
};

/**
 * Hook para ejecutar una función basada en dependencias (similar a useEffect)
 */
export const useApiEffect = <T,>(
  asyncFunction: () => Promise<T>,
  dependencies: any[] = [],
  options: UseApiOptions = {}
) => {
  const api = useApi(asyncFunction, options);
  
  // Auto-execute when dependencies change
  useState(() => {
    api.execute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  return api;
};
