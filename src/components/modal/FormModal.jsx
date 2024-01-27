import React, { useState } from "react";
import { Modal } from "flowbite-react";
import { IoWarningOutline } from "react-icons/io5";
import Input from "../Input";
import Button from "../Button";
import { useForm } from "react-hook-form";
import { authService, toastify } from "../../feature";
function FormModal({ openModal, setOpenModal, cb }) {
 
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    authService.changePassword(data).then(response => {
   
      toastify.success( response.message);
    }).catch(error=>console.log(error))

    console.log(data);
  };

  return (
    <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Sign in to our platform
          </h3>
       
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                label="Current Password"
                {...register("oldPassword", {
                  required: "This field is required",
                })}
              />
              {errors.oldPassword && (
                <p className="text-red-600 mt-2 inline-flex items-center">
                  <IoWarningOutline />
                  {errors.oldPassword?.message}
                </p>
              )}
              <div className="mt-3 mb-8">
                <Input
                  label="New Password"
                  {...register("newPassword", {
                    required: "This field is required",
                  })}
                />
                {errors.newPassword && (
                  <p className="text-red-600 mt-2 inline-flex items-center">
                    <IoWarningOutline />
                    {errors.newPasswordPassword?.message}
                  </p>
                )}
              </div>
              <Button type="submit">Save Changes</Button>
            </form>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default FormModal;
