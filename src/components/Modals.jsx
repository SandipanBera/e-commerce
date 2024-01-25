import React from "react";
import { Modal, Button } from "flowbite-react";
function Modals({ openModal, setOpenModal, cb,headerText,bodyText,btn1,btn2 }) {
  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)}>
      <Modal.Header>{ headerText}</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-center">
           {bodyText}
          </p>
        
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={cb}>{ btn1}</Button>
        <Button
          color="gray"
          onClick={() => {
            setOpenModal(false);
          }}
        >
        {btn2}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Modals;
