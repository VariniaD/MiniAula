import { useCallback, useEffect, useRef, useState } from 'react';
import { getApiErrorMessage } from '../services/api';

/**
 * Hook genérico para cargar datos remotos.
 * Recibe una función de servicio que devuelve una promesa y las dependencias
 * que deben provocar una nueva carga. Gestiona data, loading y error.
 */
export function useFetch(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  // Mantener siempre la versión más reciente de la función sin re-disparar el efecto
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  useEffect(() => {
    let ignore = false;

    setLoading(true);
    setError(null);

    fetcherRef
      .current()
      .then((result) => {
        if (!ignore) setData(result);
      })
      .catch((err) => {
        if (!ignore) {
          setData(null);
          setError(getApiErrorMessage(err, 'No se pudieron cargar los datos'));
        }
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    // Evitar actualizar estado de peticiones obsoletas
    return () => {
      ignore = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, reloadKey]);

  const refetch = useCallback(() => setReloadKey((key) => key + 1), []);

  return { data, loading, error, refetch };
}

export default useFetch;
