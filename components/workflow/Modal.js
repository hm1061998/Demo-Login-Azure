import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    (
      +c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))
    ).toString(16)
  );
}
const CustomModal = (props, ref) => {
  const [visible, setVisible] = useState(false);
  const [fieldArray, setFieldArray] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("sfs", data);
    setVisible(false);
  };

  useImperativeHandle(ref, () => ({
    show: (fields) => {
      setFieldArray(fields || []);
      setVisible(true);
    },
    close: () => {
      setVisible(false);
    },
  }));

  useEffect(() => {
    // const body=document.querySelector('body');
    Modal.setAppElement("body");
  }, []);

  function closeModal() {
    setVisible(false);
  }

  const handleAddField = () => {
    const newField = {
      id: uuidv4(),
      fieldName: `field${fieldArray.length}`,
      value: "",
    };

    setFieldArray((prev) => prev.concat(newField));
  };

  const deleteField = (field) => {
    // console.log("field", field);
    setFieldArray((prev) => prev.filter((e) => e.id !== field.id));
  };

  return (
    <Modal
      isOpen={visible}
      // onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      contentLabel="Work Detail"
      style={customStyles}
    >
      <div className="bg-white min-w-[400px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            {fieldArray.map((field) => (
              <div key={field?.id}>
                <div className="flex w-full items-center">
                  <input
                    className="block border border-blue-500 mb-2 flex-1"
                    defaultValue={field?.value}
                    {...register(field.fieldName, {
                      shouldUnregister: true,
                      required: true,
                    })}
                  />
                  <button
                    type="button"
                    className="text-red-500 px-3"
                    onClick={() => deleteField(field)}
                  >
                    X
                  </button>
                </div>
                {errors.exampleRequired && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
            ))}
          </div>

          <button type="button" className="" onClick={handleAddField}>
            Add field
          </button>

          <input
            disabled={fieldArray.length === 0}
            type="submit"
            className="block my-3 border border-green-500 px-2 py-3 rounded-sm"
          />
        </form>
      </div>
    </Modal>
  );
};

export default forwardRef(CustomModal);
