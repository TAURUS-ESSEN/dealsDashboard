import type { Filters, Presets } from "../../types/ui";

type Props = {
  onPreset: (value: Presets) => void;
  filters: Filters;
};

export const DashboardPresets = ({ filters, onPreset }: Props) => {
  const presetTemplate = {
    all: "All deals",
    highValue: "High value",
    atRisk: "At risk",
    noNextTask: "No next task",
    needsOwner: "Needs Owner",
  } satisfies Record<Presets, string>;

  return (
    <>
      <div>
        {Object.entries(presetTemplate).map(([key, value]) => {
          const preset = key as Presets;
          return (
            <button
              key={preset}
              className={`presetBtn ${filters.activePreset === preset ? "activePreset" : ""}`}
              onClick={() => onPreset(preset)}
            >
              {value}
            </button>
          );
        })}
      </div>
    </>
  );
};
