import React from 'react';

type ItemProps = {
    isLink?: boolean;
    onClick?: () => void;
    children: React.ReactNode;
};

export const Item: React.FC<ItemProps> = ({ children, isLink, onClick }) => (
    <div onClick={onClick} className={`dropdown-item ${isLink ? 'dropdown-item--link' : null}`}>
        {children}
    </div>
);
