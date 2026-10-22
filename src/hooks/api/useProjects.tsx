'use client';

import { useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { apiTryCatch } from '@/lib/axios/axiosTryCatch';
import type {
  ProjectCountType,
  ProjectDetailsType,
  ProjectSummaryType,
} from '@/types/interface/team-project';

export const projectKeys = {
  all: ['team-projects'] as const,
  summary: () => [...projectKeys.all, 'summary'] as const,
  count: () => [...projectKeys.all, 'count'] as const,
  detail: (id: string) => [...projectKeys.all, 'detail', id] as const,
};

export function useProjectsSummary() {
  const { data, isPending, isError } = useQuery({
    queryKey: projectKeys.summary(),
    queryFn: async () => {
      const response = await apiTryCatch.get<ProjectSummaryType[]>(
        '/team-project/summary'
      );
      return response.data ?? [];
    },
  });

  return { projects: data ?? [], isLoading: isPending, isError };
}

export function useProjectsCount() {
  const { data, isPending } = useQuery({
    queryKey: projectKeys.count(),
    queryFn: async () => {
      const response = await apiTryCatch.get<ProjectCountType>(
        '/team-project/count'
      );
      return response.data;
    },
    refetchInterval: 5000,
  });

  return { counts: data?.counts, isLoading: isPending };
}

export function useProjectDetails(id: string) {
  const { data, isPending, isError } = useQuery({
    queryKey: projectKeys.detail(id),
    queryFn: async () => {
      const response = await apiTryCatch.get<ProjectDetailsType>(
        `/team-project/${id}`
      );
      return response.data;
    },
    enabled: !!id,
  });

  return { project: data ?? null, isLoading: isPending, isError };
}

export function useInvalidateProjects() {
  const queryClient = useQueryClient();

  return useCallback(
    () => queryClient.invalidateQueries({ queryKey: projectKeys.all }),
    [queryClient]
  );
}
