import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { 
  getMyConfig, 
  updateMyConfig, 
  updateSingleSetting, 
  resetMyConfig 
} from '@/store/config/config.actions';
import { 
  updateConfigOptimistically,
  updateMultipleConfigOptimistically 
} from '@/store/config/config.store';
import { IUserConfig } from '@/store/config/config.types';
import { showToast } from '@/components/shared/notifications/toast';
import { useEffect } from 'react';

export const useConfig = () => {
  const dispatch: AppDispatch = useDispatch();
  const { userConfig, configStatus, updateStatus, resetStatus } = useSelector(
    (state: RootState) => state.config
  );

  // Cargar configuración automáticamente
  useEffect(() => {
    if (!userConfig && configStatus === 'idle') {
      loadConfig();
    }
  }, [userConfig, configStatus]);

  // Cargar configuración
  const loadConfig = async () => {
    try {
      await dispatch(getMyConfig({ shouldStoreOutputState: true })).unwrap();
    } catch (error: any) {
      showToast(
        error.message || 'Error al cargar configuración',
        { type: 'danger' }
      );
    }
  };

  // Actualizar configuración específica con optimistic update
  const updateSetting = async (
    setting: "notifications" | "contactInfoVisible",
    value: boolean
  ) => {
    try {
      // Update optimista
      dispatch(updateConfigOptimistically({ setting, value }));
      
      // Update en servidor
      await dispatch(updateSingleSetting({
        inputParams: { setting, value },
        shouldStoreOutputState: true
      })).unwrap();

      showToast('Configuración actualizada', { type: 'success' });
    } catch (error: any) {
      // Revertir el cambio optimista cargando la config actual
      await loadConfig();
      showToast(
        error.message || 'Error al actualizar configuración',
        { type: 'danger' }
      );
    }
  };

  // Actualizar múltiples configuraciones
  const updateMultipleSettings = async (
    updates: Partial<Pick<IUserConfig, 'notifications' | 'contactInfoVisible'>>
  ) => {
    try {
      // Update optimista
      dispatch(updateMultipleConfigOptimistically(updates));
      
      // Update en servidor
      await dispatch(updateMyConfig({
        inputParams: updates,
        shouldStoreOutputState: true
      })).unwrap();

      showToast('Configuraciones actualizadas', { type: 'success' });
    } catch (error: any) {
      // Revertir cambios cargando la config actual
      await loadConfig();
      showToast(
        error.message || 'Error al actualizar configuraciones',
        { type: 'danger' }
      );
    }
  };

  // Helpers específicos para cada configuración
  const updateNotifications = async (enabled: boolean) => {
    await updateSetting('notifications', enabled);
  };

  const updateContactInfoVisible = async (visible: boolean) => {
    await updateSetting('contactInfoVisible', visible);
  };

  // Resetear configuración
  const resetConfig = async () => {
    try {
      await dispatch(resetMyConfig({ shouldStoreOutputState: true })).unwrap();
      showToast('Configuración reseteada', { type: 'success' });
    } catch (error: any) {
      showToast(
        error.message || 'Error al resetear configuración',
        { type: 'danger' }
      );
    }
  };

  // Forzar recarga de configuración
  const refreshConfig = async () => {
    await loadConfig();
  };

  return {
    // State
    userConfig,
    configStatus,
    updateStatus,
    resetStatus,
    
    // Actions generales
    loadConfig,
    refreshConfig,
    updateSetting,
    updateMultipleSettings,
    resetConfig,
    
    // Actions específicas
    updateNotifications,
    updateContactInfoVisible,
    
    // Computed states
    isLoading: configStatus === 'loading',
    isUpdating: updateStatus === 'loading',
    isResetting: resetStatus === 'loading',
    hasConfig: !!userConfig,
    
    // Valores actuales (con fallbacks)
    notifications: userConfig?.notifications ?? true,
    contactInfoVisible: userConfig?.contactInfoVisible ?? true,
  };
};