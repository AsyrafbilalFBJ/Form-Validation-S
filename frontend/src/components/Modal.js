"use client";

import { Modal, Button } from 'flowbite-react';

export default function Component({ showModal, setShowModal, errorMessage, Icon }) {
  return (
    <Modal show={showModal} onClose={() => setShowModal(false)}>
        <Modal.Body>
            <div className="text-center">
                <div className="h-12 w-12 mx-auto mb-5">
                    <Icon className="h-full w-full text-red-600" />
                </div>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    {errorMessage}
                </h3>
                <div className="flex justify-center">
                    <Button color="gray" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </div>
            </div>
        </Modal.Body>
    </Modal>
  );
}
