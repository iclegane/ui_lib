import React, { useEffect, useState } from 'react';

import { BasePopover } from '../BasePopover';
import { Input } from '../Input';

import './styles.css';

import { SelectList } from './SelectList.tsx';

export type SelectOption = {
    id: number;
    label: string;
    disabled?: boolean;
};
type BaseSelect = {
    value?: number | null;
    options?: SelectOption[];
    onChange?: (option: SelectOption | null) => void;
    optionRender?: (option: SelectOption) => React.ReactNode;
};

type SelectAsync<T> = {
    isAsync: true;
    loadOptions: () => Promise<Response>;
    mapToSelectOptions: (data: T) => SelectOption[];
};

type SelectSync = {
    isAsync: false;
    loadOptions?: never;
    mapToSelectOptions?: never;
};

type SelectProps<T = unknown> = BaseSelect & (SelectAsync<T> | SelectSync);

export const Select = <T = unknown,>({
    isAsync,
    loadOptions,
    mapToSelectOptions,
    optionRender,
    options: userOptions,
    value: userValue,
    onChange,
}: SelectProps<T>) => {
    const [inputValue, setInputValue] = useState<string | null>();
    const [isOpen, setIsOpen] = useState(false);
    const [fetchStatus, setStatus] = useState<string>('init');

    const [selectValue, setSelectValue] = useState<SelectOption | null>(
        userOptions?.find(({ id }) => id === userValue) ?? null,
    );
    const [options, setOptions] = useState<SelectOption[]>(userOptions ?? []);

    useEffect(() => {
        if (!isAsync) {
            return;
        }
        const getItems = async () => {
            try {
                setStatus('loading');
                const response = await loadOptions();

                if (!response.ok) {
                    setStatus('error');
                }

                const data = await response.json();
                const formattedData = mapToSelectOptions(data);
                setOptions(formattedData);

                setStatus('success');
            } catch (e) {
                setStatus('error');
            }
        };

        getItems();
    }, [isAsync]);

    const onSelectHandler = (option: SelectOption) => {
        setIsOpen(false);
        setSelectValue((prev) => (prev?.id === option.id ? null : option));
        setInputValue(null);

        onChange?.(selectValue);
    };

    const onResetHandler = () => {
        setInputValue(null);
        setSelectValue(null);

        onChange?.(null);
    };

    const displayInputText = inputValue ?? selectValue?.label ?? '';

    const filteredOptions = inputValue
        ? options.filter((option) => option.label.toLowerCase().includes(inputValue.toLowerCase()))
        : options;

    const isLoading = fetchStatus === 'loading';

    return (
        <BasePopover
            position="bottom"
            trigger={'focus'}
            content={
                <SelectList
                    currentOption={selectValue}
                    isLoading={isLoading}
                    onSelect={onSelectHandler}
                    options={filteredOptions}
                    optionRender={optionRender}
                />
            }
            isOpen={isOpen}
            onOpenChange={(isOpenState) => {
                setIsOpen(isOpenState);
                !isOpenState && setInputValue(null);
            }}
        >
            <Input
                value={displayInputText}
                onSearch={(text) => {
                    setInputValue(text);
                    !isOpen && setIsOpen(true);
                }}
                onReset={onResetHandler}
                placeholder="Значение"
                type="text"
            />
        </BasePopover>
    );
};
