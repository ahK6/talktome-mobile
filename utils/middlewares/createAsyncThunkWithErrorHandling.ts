import { AsyncThunkPayloadCreator, createAsyncThunk } from "@reduxjs/toolkit";

/**
 * Función que crea un asyncThunk con manejo de errores, sustituye el uso de createAsyncThunk
 * @param typePrefix
 * @param payloadCreator
 * @returns
 */
export const createAsyncThunkWithErrorHandling = <Returned, ThunkArg = void>(
  typePrefix: string,
  payloadCreator: AsyncThunkPayloadCreator<Returned, ThunkArg, {}>
) => {
  return createAsyncThunk<Returned, ThunkArg>(
    typePrefix,
    //@ts-expect-error
    async (arg: ThunkArg, thunkAPI) => {
      try {
        // Se ejecuta el payloadCreator y se espera a que resuelva, si ocurre un error se captura si no se retorna el valor
        return await payloadCreator(arg, thunkAPI);
      } catch (error) {
        // Si ocurre un error se rechaza con un throw rejectWithValue(error) para propagar el error
        throw thunkAPI.rejectWithValue(error);
      }
    }
  );
};
