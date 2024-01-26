import React from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Modal, Button } from "flowbite-react";
function Modals({ openModal, setOpenModal, cb, bodyText, btn1, btn2 }) {
  return (

    <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            {bodyText}
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={cb}>
              {btn1}
            </Button>
            <Button color="gray" onClick={() => setOpenModal(false)}>
              {btn2}
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default Modals;
