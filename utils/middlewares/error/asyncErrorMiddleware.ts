import { Middleware } from "@reduxjs/toolkit";
import { isRejectedWithValue } from "@reduxjs/toolkit";

/**
 * Middleware que intercepta las acciones que son rejected
 * @param store
 * @returns
 */
export const asyncErrorMiddleware: Middleware =
  (store) => (next) => (action) => {
    // Intercepta las acciones que son rejected
    if (isRejectedWithValue(action)) {
      if (__DEV__)
        console.info(
          `[${action.type}]:`,
          JSON.stringify(action.payload, null, 2)
        );

      // TODO: Aquí se puede agregar un manejo de errores global
      // handleGlobalException(action.payload);
    }

    return next(action); // Continuar con la acción
  };
