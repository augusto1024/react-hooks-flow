const COMPONENT_MESSAGE_PREFIX = (id: string, level: number): string =>
  `${Array(level).join("  ")}Component ${id}: `;

export const COMPONENT_MESSAGE = {
  LAZY_USE_STATE: "lazy initial state function were called.",
  USE_STATE: "useState was triggered.",
  USE_EFFECT_NO_DEPENDENCY: "useEffect with no dependencies was triggered",
  USE_EFFECT_DEPENDENCY: "useEffect with dependencies was triggered",
  CLEANUP_EFFECTS: "cleanup effects were triggered",
  RENDER_START: "render started",
  RENDER_END: "render ended",
  UNMOUNT: "unmounted",
};

export const NEW_COMPONENT_MESSAGE = (
  id: string,
  level: number,
  message: string
): string => {
  return `${COMPONENT_MESSAGE_PREFIX(id, level)}${message}`;
};
