import { DashboardFooter } from '@/components/dashboard/footer/footer';
import { render, screen } from '@testing-library/react'; // TODO quando o arquivo test-utils.tsx estiver pronto, importar isso de lá

describe('<DashboardFooter/>', () => {
  it('should render dashboardFooter component', () => {
    render(<DashboardFooter />);

    const dashboardFooterText = screen.getByRole('contentinfo');

    expect(dashboardFooterText).toBeInTheDocument();
  });
});
