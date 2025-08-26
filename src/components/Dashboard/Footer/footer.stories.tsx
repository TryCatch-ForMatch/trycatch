import type { Meta, StoryObj } from '@storybook/nextjs';
import { DashboardFooter } from './footer';

const meta: Meta<typeof DashboardFooter> = {
  title: 'components/Dashboard/Footer',
  component: DashboardFooter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
