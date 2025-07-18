// TODO melhorar storie pois não está recebendo props etc (não aparece corretamente no storybook)
import type { Meta, StoryObj } from '@storybook/nextjs';
import { DashboardHeader } from './Header';

const meta: Meta<typeof DashboardHeader> = {
  title: 'Components/Dashboard/header',
  component: DashboardHeader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
