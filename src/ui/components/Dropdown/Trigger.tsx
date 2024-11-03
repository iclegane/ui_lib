import React, { cloneElement, forwardRef, ReactElement } from 'react';

type TriggerProps = {
    children: React.ReactNode;
};

export const Trigger = forwardRef<HTMLDivElement, TriggerProps>(({ children, ...props }, ref) => {
    return React.isValidElement(children)
        ? cloneElement(children as ReactElement, {
              ref,
              className: 'dropdown-trigger',
              ...props,
          })
        : null;
});
