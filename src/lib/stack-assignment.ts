export type StackAssignmentUser = {
  name?: string | null;
};

export type StackAssignmentLike = {
  takenBy?: StackAssignmentUser | null;
};

export function getStackAssignmentLabel(stack?: StackAssignmentLike | null) {
  const name = stack?.takenBy?.name?.trim();

  return name ? `Assumido por ${name}` : null;
}
