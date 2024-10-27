import { Button } from '@headlessui/react';
import { useState } from 'react';

import { Drawer } from './ui/components/Drawer';
import { Dropdown } from './ui/components/Dropdown';
import { Modal } from './ui/components/Modal';
import { Popover } from './ui/components/Popover';

function App() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

    const toggleModal = () => {
        setIsModalOpen((prev) => !prev);
    };

    const toggleDrawer = () => {
        setIsDrawerOpen((prev) => !prev);
    };

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
            <br />
            <br />
            <Popover trigger="hover" content={'Popover content'}>
                <Button>Open Popover</Button>
            </Popover>

            <Dropdown trigger={'click'} position={'bottom'}>
                <Dropdown.Trigger>
                    <button>Menu</button>
                </Dropdown.Trigger>
                <Dropdown.Menu>
                    <Dropdown.Item>Item 1</Dropdown.Item>
                    <Dropdown.Item>Item 2</Dropdown.Item>
                    <Dropdown.Item isLink>Item 3</Dropdown.Item>
                    <Dropdown.Item>Item 4</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}

export default App;
