import { createSlice } from "@reduxjs/toolkit";
import { AsyncActionStatus } from "@/shared/types/enums.types";
import { IConfigState } from "./config.types";
import {
  getMyConfig,
  getUserConfig,
  updateMyConfig,
  updateUserConfig,
  updateSingleSetting,
  resetMyConfig,
  resetUserConfig,
} from "./config.actions";

const initialState: IConfigState = {
  userConfig: null,
  configStatus: AsyncActionStatus.idle,
  updateStatus: AsyncActionStatus.idle,
  resetStatus: AsyncActionStatus.idle,
};

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    clearConfigState: (state) => {
      state.userConfig = null;
      state.configStatus = AsyncActionStatus.idle;
      state.updateStatus = AsyncActionStatus.idle;
      state.resetStatus = AsyncActionStatus.idle;
    },
    // Actualización optimista para mejor UX - corregido
    updateConfigOptimistically: (state, action) => {
      if (state.userConfig) {
        const { setting, value } = action.payload;
        
        // Actualizar directamente la propiedad en IUserConfig
        if (setting in state.userConfig) {
          (state.userConfig as any)[setting] = value;
        }
      }
    },
    // Actualizar múltiples configuraciones optimísticamente - corregido
    updateMultipleConfigOptimistically: (state, action) => {
      if (state.userConfig) {
        const updates = action.payload;
        
        // Actualizar directamente las propiedades que existen en IUserConfig
        Object.keys(updates).forEach(setting => {
          if (setting in state.userConfig!) {
            (state.userConfig as any)[setting] = updates[setting];
          }
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Get My Config
      .addCase(getMyConfig.pending, (state, action) => {
        if (action.meta.arg.shouldStoreOutputState !== false) {
          state.configStatus = AsyncActionStatus.loading;
        }
      })
      .addCase(getMyConfig.fulfilled, (state, action) => {
        if (action.meta.arg.shouldStoreOutputState !== false) {
          state.configStatus = AsyncActionStatus.done;
          state.userConfig = action.payload.data;
        }
      })
      .addCase(getMyConfig.rejected, (state, action) => {
        if (action.meta.arg.shouldStoreOutputState !== false) {
          state.configStatus = AsyncActionStatus.error;
        }
      })

      // Get User Config (admin)
      .addCase(getUserConfig.pending, (state, action) => {
        if (action.meta.arg.shouldStoreOutputState !== false) {
          state.configStatus = AsyncActionStatus.loading;
        }
      })
      .addCase(getUserConfig.fulfilled, (state, action) => {
        if (action.meta.arg.shouldStoreOutputState !== false) {
          state.configStatus = AsyncActionStatus.done;
          state.userConfig = action.payload.data;
        }
      })
      .addCase(getUserConfig.rejected, (state, action) => {
        if (action.meta.arg.shouldStoreOutputState !== false) {
          state.configStatus = AsyncActionStatus.error;
        }
      })

      // Update My Config
      .addCase(updateMyConfig.pending, (state, action) => {
        if (action.meta.arg.shouldStoreOutputState !== false) {
          state.updateStatus = AsyncActionStatus.loading;
        }
      })
      .addCase(updateMyConfig.fulfilled, (state, action) => {
        if (action.meta.arg.shouldStoreOutputState !== false) {
          state.updateStatus = AsyncActionStatus.done;
          state.userConfig = action.payload.data;
        }
      })
      .addCase(updateMyConfig.rejected, (state, action) => {
        if (action.meta.arg.shouldStoreOutputState !== false) {
          state.updateStatus = AsyncActionStatus.error;
        }
      })

      // Update User Config (admin)
      .addCase(updateUserConfig.pending, (state, action) => {
        if (action.meta.arg.shouldStoreOutputState !== false) {
          state.updateStatus = AsyncActionStatus.loading;
        }
      })
      .addCase(updateUserConfig.fulfilled, (state, action) => {
        if (action.meta.arg.shouldStoreOutputState !== false) {
          state.updateStatus = AsyncActionStatus.done;
          state.userConfig = action.payload.data;
        }
      })
      .addCase(updateUserConfig.rejected, (state, action) => {
        if (action.meta.arg.shouldStoreOutputState !== false) {
          state.updateStatus = AsyncActionStatus.error;
        }
      })

      // Update Single Setting
      .addCase(updateSingleSetting.pending, (state, action) => {
        if (action.meta.arg.shouldStoreOutputState !== false) {
          state.updateStatus = AsyncActionStatus.loading;
        }
      })
      .addCase(updateSingleSetting.fulfilled, (state, action) => {
        if (action.meta.arg.shouldStoreOutputState !== false) {
          state.updateStatus = AsyncActionStatus.done;
          state.userConfig = action.payload.data;
        }
      })
      .addCase(updateSingleSetting.rejected, (state, action) => {
        if (action.meta.arg.shouldStoreOutputState !== false) {
          state.updateStatus = AsyncActionStatus.error;
        }
      })

      // Reset My Config
      .addCase(resetMyConfig.pending, (state, action) => {
        if (action.meta.arg.shouldStoreOutputState !== false) {
          state.resetStatus = AsyncActionStatus.loading;
        }
      })
      .addCase(resetMyConfig.fulfilled, (state, action) => {
        if (action.meta.arg.shouldStoreOutputState !== false) {
          state.resetStatus = AsyncActionStatus.done;
          state.userConfig = action.payload.data;
        }
      })
      .addCase(resetMyConfig.rejected, (state, action) => {
        if (action.meta.arg.shouldStoreOutputState !== false) {
          state.resetStatus = AsyncActionStatus.error;
        }
      })

      // Reset User Config (admin)
      .addCase(resetUserConfig.pending, (state, action) => {
        if (action.meta.arg.shouldStoreOutputState !== false) {
          state.resetStatus = AsyncActionStatus.loading;
        }
      })
      .addCase(resetUserConfig.fulfilled, (state, action) => {
        if (action.meta.arg.shouldStoreOutputState !== false) {
          state.resetStatus = AsyncActionStatus.done;
          state.userConfig = action.payload.data;
        }
      })
      .addCase(resetUserConfig.rejected, (state, action) => {
        if (action.meta.arg.shouldStoreOutputState !== false) {
          state.resetStatus = AsyncActionStatus.error;
        }
      });
  },
});

export const { 
  clearConfigState, 
  updateConfigOptimistically, 
  updateMultipleConfigOptimistically 
} = configSlice.actions;

const configReducer = configSlice.reducer;
export default configReducer;