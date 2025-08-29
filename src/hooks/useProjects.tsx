import { apiTryCatch } from '@/lib/axios/axiosTryCatch';
import { useState, useEffect, useCallback } from 'react';
import { ProjectSummaryType } from '@/types/team-project';
import { ProjectDetailsType } from '@/types/team-project';

export function useProjects() {
  const [allProjects, setAllProjects] = useState<ProjectSummaryType[]>([]);
  const [allProjectsDetails, setAllProjectsDetails] = useState<
    ProjectDetailsType[]
  >([]);
  const [isProjectsLoading, setIsProjectsLoading] = useState(false);

  const fetchProjects = useCallback(async () => {
    setIsProjectsLoading(true);
    try {
      const response = await apiTryCatch.get('/team-project/summary');
      setAllProjects(response.data);
    } catch (error) {
      console.error('Erro ao buscar projetos:', error);
      throw error;
    } finally {
      setIsProjectsLoading(false);
    }
  }, []);

  const fetchProjectsDetails = useCallback(async () => {
    setIsProjectsLoading(true);
    try {
      const response = await apiTryCatch.get('/team-project');
      setAllProjectsDetails(response.data);
    } catch (error) {
      console.error('Erro ao buscar projetos:', error);
      throw error;
    } finally {
      setIsProjectsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
    fetchProjectsDetails();
  }, [fetchProjects, fetchProjectsDetails]);

  return {
    allProjects,
    allProjectsDetails,
    isProjectsLoading,
    fetchProjects,
  };
}
