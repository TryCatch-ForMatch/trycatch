import { DashboardFooter } from '@/components/Dashboard/Footer';
import { render, screen } from '@testing-library/react'; // TODO quando o arquivo test-utils.tsx estiver pronto, importar isso de lá

// TODO evoluir esse teste conforme o projeto escala

describe('<DashboardFooter/>', () => {
  it('should render dashboardFooter component', () => {
    render(<DashboardFooter />);

    const dashboardFooterText = screen.getByRole('contentinfo');

    expect(dashboardFooterText).toBeInTheDocument();
  });
});
