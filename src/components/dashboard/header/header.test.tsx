import { DashboardHeader } from '@/components/dashboard/header';
import { render, screen } from '@testing-library/react'; // TODO quando o arquivo test-utils.tsx estiver pronto, importar isso de lá
import { User } from 'next-auth';

// TODO evoluir esse teste conforme o projeto escala

describe('<DashboardHeader/>', () => {
  it('should render dashboardHeader component', () => {
    const mockUser: User = {
      id: '1',
      name: 'Jhon Doe',
      email: 'jhondoe@email.com',
      role: 'USER',
    };

    render(<DashboardHeader user={mockUser} />);
    const dashboardHeaderText = screen.getByRole('heading');

    expect(dashboardHeaderText).toBeInTheDocument();
    expect(dashboardHeaderText).toHaveTextContent(
      `Dashboard - Bem-vindo, Jhon Doe`
    );
  });
});
