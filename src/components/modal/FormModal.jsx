import React from 'react'
import {  Modal} from 'flowbite-react';

function FormModal({openModal, setOpenModal, cb}) {
  return (
    <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
    <Modal.Header />
    <Modal.Body>
      <div className="space-y-6">
        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
        <div>
         
        </div>
        <div className="w-full">
          <Button>Log in to your account</Button>
        </div>
        <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
          Not registered?&nbsp;
          <a href="#" className="text-cyan-700 hover:underline dark:text-cyan-500">
            Create account
          </a>
        </div>
      </div>
    </Modal.Body>
  </Modal>
  )
}

export default FormModal