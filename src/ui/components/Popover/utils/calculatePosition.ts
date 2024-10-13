type calculatePositionOptions = {
    position: string;
    offset: number;
};

export const calculatePosition = (
    target: Readonly<HTMLDivElement>,
    popover: Readonly<HTMLDivElement>,
    options: calculatePositionOptions,
) => {
    const { position, offset } = options;
    const popoverRect = popover.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    let top = 0;
    let left = 0;

    switch (position) {
        case 'top':
            top = targetRect.top - popoverRect.height - offset;
            left = targetRect.left + targetRect.width / 2 - popoverRect.width / 2;
            break;
        case 'bottom':
            top = targetRect.bottom + offset;
            left = targetRect.left + targetRect.width / 2 - popoverRect.width / 2;
            break;
        case 'left':
            top = targetRect.top + targetRect.height / 2 - popoverRect.height / 2;
            left = targetRect.left - popoverRect.width - offset;
            break;
        case 'right':
            top = targetRect.top + targetRect.height / 2 - popoverRect.height / 2;
            left = targetRect.right + offset;
            break;
    }

    return {
        top,
        left,
    };
};
