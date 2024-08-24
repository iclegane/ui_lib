import { useState } from "react"
import { Modal } from "./ui/Modal"
import { Drawer } from "./ui/Drawer"

function App() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setIsModalOpen(prev => !prev)
  }

  const toggleDrawer = () => {
    setIsDrawerOpen(prev => !prev)
  }

  return (
    <div className="container mx-auto">
      <button onClick={toggleModal} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Open modal</button>
      <Modal title="Enter title" isOpen={isModalOpen} onClose={toggleModal} footer={<div>Footer content</div>} content={<div>
        <button onClick={toggleDrawer} type="button">Open Drawer</button>
      </div>} />
      <Drawer isOpen={isDrawerOpen} onClose={toggleDrawer} content={<div>2</div>}/>
  </div>
  )
}

export default App
