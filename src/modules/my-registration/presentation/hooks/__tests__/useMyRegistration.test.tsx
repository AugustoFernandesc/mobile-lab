import React from 'react';
import { renderHook, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

jest.mock('../../../../../infra/http/api', () => ({ api: { get: jest.fn() } }));
jest.mock('../../../../auth/presentation/context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

import { api } from '../../../../../infra/http/api';
import { useAuth } from '../../../../auth/presentation/context/AuthContext';
import { useMyRegistration } from '../useMyRegistration';

const mockedGet = api.get as jest.Mock;
const mockedUseAuth = useAuth as unknown as jest.Mock;

function createWrapper() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false, gcTime: 0 } } });
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
  };
}

describe('useMyRegistration', () => {
  beforeEach(() => {
    mockedGet.mockReset();
  });

  it('fetches and exposes the registration of the logged student', async () => {
    mockedUseAuth.mockReturnValue({ session: { user: { id: 'student-1' } } });
    mockedGet.mockResolvedValue({ data: { plan_name: 'Black', monthly_value: 99 } });

    const { result } = await renderHook(() => useMyRegistration(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.registration).not.toBeNull());

    expect(result.current.registration?.plan_name).toBe('Black');
    expect(mockedGet).toHaveBeenCalledWith('/students/student-1/registration-summary');
  });

  it('does not fetch and reports an error when there is no logged student', async () => {
    mockedUseAuth.mockReturnValue({ session: null });

    const { result } = await renderHook(() => useMyRegistration(), { wrapper: createWrapper() });

    expect(result.current.errorMessage).toBe('Não foi possível identificar o aluno logado.');
    expect(result.current.isLoading).toBe(false);
    expect(mockedGet).not.toHaveBeenCalled();
  });
});
