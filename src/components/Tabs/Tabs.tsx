import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  label: string;
  tabs: TabItem[];
  defaultTabId?: string;
}

// Follows the WAI-ARIA tabs pattern: arrow keys move between enabled tabs,
// Home and End jump to the ends, and only the selected tab is in the tab order.
export function Tabs({ label, tabs, defaultTabId }: TabsProps) {
  const baseId = useId();
  const firstEnabled = tabs.find((tab) => !tab.disabled)?.id;
  const [selectedId, setSelectedId] = useState(defaultTabId ?? firstEnabled);
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const enabledIds = tabs.filter((tab) => !tab.disabled).map((tab) => tab.id);

  const select = (id: string) => {
    setSelectedId(id);
    tabRefs.current.get(id)?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, id: string) => {
    const index = enabledIds.indexOf(id);
    if (index === -1) return;

    let next: string | undefined;
    if (event.key === 'ArrowRight') next = enabledIds[(index + 1) % enabledIds.length];
    if (event.key === 'ArrowLeft') next = enabledIds[(index - 1 + enabledIds.length) % enabledIds.length];
    if (event.key === 'Home') next = enabledIds[0];
    if (event.key === 'End') next = enabledIds[enabledIds.length - 1];

    if (next) {
      event.preventDefault();
      select(next);
    }
  };

  const panelId = (id: string) => `${baseId}-panel-${id}`;
  const tabId = (id: string) => `${baseId}-tab-${id}`;

  return (
    <div className="flex flex-col gap-4">
      <div role="tablist" aria-label={label} className="flex gap-1 border-b border-border">
        {tabs.map((tab) => {
          const selected = tab.id === selectedId;
          return (
            <button
              key={tab.id}
              ref={(node) => {
                if (node) tabRefs.current.set(tab.id, node);
                else tabRefs.current.delete(tab.id);
              }}
              id={tabId(tab.id)}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={panelId(tab.id)}
              tabIndex={selected ? 0 : -1}
              disabled={tab.disabled}
              onClick={() => select(tab.id)}
              onKeyDown={(event) => handleKeyDown(event, tab.id)}
              className={`-mb-px border-b-2 px-4 py-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-50 ${
                selected
                  ? 'border-fg text-fg'
                  : 'border-transparent text-muted enabled:hover:text-fg'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          id={panelId(tab.id)}
          role="tabpanel"
          aria-labelledby={tabId(tab.id)}
          hidden={tab.id !== selectedId}
          tabIndex={0}
          className="text-sm text-fg focus-visible:outline-2 focus-visible:outline-accent"
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
