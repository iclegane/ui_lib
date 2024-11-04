import { Button } from '@headlessui/react';
import { useState } from 'react';

import { ApiLoadOptions, CitySelectItems } from './ui/Api';
import { Drawer } from './ui/components/Drawer';
import { Dropdown } from './ui/components/Dropdown';
import { Modal } from './ui/components/Modal';
import { Popover } from './ui/components/Popover';
import { Select } from './ui/components/Select';

function App() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

    const toggleModal = () => {
        setIsModalOpen((prev) => !prev);
    };

    const toggleDrawer = () => {
        setIsDrawerOpen((prev) => !prev);
    };

    const [selectValue, setSelectValue] = useState<number | null>();

    return (
        <div className="container mx-auto">
            <button
                onClick={toggleModal}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
                Open modal
            </button>
            <Modal
                title="Enter title"
                isOpen={isModalOpen}
                onClose={toggleModal}
                footer={<div>Footer content</div>}
                content={
                    <div>
                        <button onClick={toggleDrawer} type="button">
                            Open Drawer
                        </button>
                    </div>
                }
            />
            <button onClick={toggleDrawer} type="button">
                Open Drawer
            </button>
            <Drawer
                isOpen={isDrawerOpen}
                onClose={toggleDrawer}
                content={
                    <button onClick={toggleModal} type="button">
                        Open Modal
                    </button>
                }
            />
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 24,
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                }}
            >
                <Popover trigger="click" content={'Popover content'}>
                    <Button>Open Popover</Button>
                </Popover>

                <Dropdown>
                    <Dropdown.Trigger>
                        <button>Menu</button>
                    </Dropdown.Trigger>
                    <Dropdown.Menu>
                        <Dropdown.Item>
                            <button>Item 1</button>
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => console.log('Dropdown.Item.Click')}>
                            <button>Item 2</button>
                        </Dropdown.Item>
                        <Dropdown.Item isLink>
                            <button>Item 3</button>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <button>Item 4</button>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <Select<CitySelectItems>
                    isAsync={true}
                    loadOptions={ApiLoadOptions}
                    mapToSelectOptions={(response) => {
                        const res = response?.cities ?? [];
                        return res.map(({ id, code, description }) => ({
                            id,
                            label: `${code}-${description}`,
                            disabled: id === 2,
                        }));
                    }}
                />

                <Select
                    isAsync={false}
                    value={selectValue}
                    onChange={(option) => setSelectValue(option?.id)}
                    options={[
                        {
                            id: 0,
                            label: 'Item 1',
                        },
                        {
                            id: 1,
                            label: 'Item 2',
                            disabled: true,
                        },
                        {
                            id: 2,
                            label: 'Item 3',
                        },
                        {
                            id: 3,
                            label: 'Item 4',
                        },
                    ]}
                />
            </div>
        </div>
    );
}

export default App;
