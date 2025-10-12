import { apiTryCatch } from '@/lib/axios/axiosTryCatch';
import { useState, useEffect, useCallback } from 'react';
import { ProjectSummaryType } from '@/types/interface/team-project';
import { ProjectDetailsType } from '@/types/interface/team-project';
import { ProjectCountType } from '@/types/interface/team-project';

export function useProjects() {
  const [allProjects, setAllProjects] = useState<ProjectSummaryType[]>([]);
  const [allProjectsDetails, setAllProjectsDetails] = useState<
    ProjectDetailsType[]
  >([]);

  const [projectsEstatistica, setProjectsEstatistica] =
    useState<ProjectCountType>({} as ProjectCountType);
  const [isProjectsLoading, setIsProjectsLoading] = useState(false);

  //Busca todos os projects com alguns informacoes extras
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

  //Busca todos os projectos
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

  //Busca as estatisca dos projectos. Concluido|Buscando|Em Adnamento
  const fetchProjectsStatics = useCallback(async () => {
    setIsProjectsLoading(true);
    try {
      const response = await apiTryCatch.get('/team-project/count');
      setProjectsEstatistica(response.data);
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
    fetchProjectsStatics();
  }, [fetchProjects, fetchProjectsDetails, fetchProjectsStatics]);

  const getProjectDetailsById = async (id: string) => {
    try {
      const response = await apiTryCatch.get(`/team-project/${id}`);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

  return {
    allProjects,
    allProjectsDetails,
    isProjectsLoading,
    fetchProjects,
    projectsEstatistica,
    fetchProjectsStatics,
    getProjectDetailsById,
  };
}
