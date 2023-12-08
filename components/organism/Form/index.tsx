import React, { useState, useEffect } from "react";
import { FormModalProps } from "@/utils/interface";
import { useSelector, useDispatch } from "react-redux";
import {
  useAddTaskMutation,
  useGetTaskMutation
} from "@/services/task";
import { setTask } from "@/redux/slice/taskSlice";

const FormModal: React.FC<FormModalProps> = ({
  setIsShowModal,
  updateListTask,
  updateEditedContact,
  showErrorMessage,
  showSuccessMessage,
  setIsEdit,
  isEdit,
  selectedContact,
}) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [visible, setVisible] = useState(true);

  const task = useSelector((state: any) => state.task);
  const dispatch = useDispatch();

  const [addTask] = useAddTaskMutation();
  const [getTask] = useGetTaskMutation();

  useEffect(() => {
    // Populate the form fields with the selected contact data when editing
    if (isEdit && selectedContact) {
      setTitle(selectedContact.first_name);
      setDesc(selectedContact.last_name);
      setDate(selectedContact.phones);
    } else {
      // Clear the form fields when adding a new contact
      setTitle("");
      setDesc("");
      setDate("");
    }
  }, [isEdit, selectedContact]);

  const handleCloseModal = () => {
    setVisible(false);
    setTimeout(() => {
      setIsShowModal(false);
      setIsEdit(false);
    }, 300);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Regular expression to check for only numbers and / ex: 12/12/2021 but string
    const dateRegex = new RegExp(/^[0-9/]*$/);

    // Check if the form fields are empty
    if (title === "" || desc === "" || date === "") {
      showErrorMessage("Please fill in all fields");
      return;
    }

    // Check if the date is in the correct format
    if (!dateRegex.test(date)) {
      showErrorMessage("Please enter a valid date");
      return;
    }

    // Check if the date is in the correct format
    if (date.length !== 10) {
      showErrorMessage("Please enter a valid date");
      return;
    }

    // Check if the date is in the correct format
    if (date[2] !== "/" || date[5] !== "/") {
      showErrorMessage("Please enter a valid date");
      return;
    }

    // Check if the date is in the correct format
    if (parseInt(date[0]) > 3) {
      showErrorMessage("Please enter a valid date");
      return;
    }

    // Check if the date is in the correct format
    if (parseInt(date[3]) > 1) {
      showErrorMessage("Please enter a valid date");
      return;
    }

    // Check if the date is in the correct format
    if (parseInt(date[6]) > 2) {
      showErrorMessage("Please enter a valid date");
      return;
    }

    // Check if the date is in the correct format
    if (parseInt(date[7]) > 9) {
      showErrorMessage("Please enter a valid date");
      return;
    }

    // Check if the date is in the correct format
    if (parseInt(date[8]) > 9) {
      showErrorMessage("Please enter a valid date");
      return;
    }

    // Check if the date is in the correct format
    if (parseInt(date[9]) > 9) {
      showErrorMessage("Please enter a valid date");
      return;
    }

    // Add the new List Task to the database and renew task state by fetching the updated data
    try {
    // Add the new task to the database
    const response = await addTask({
      title: title,
      desc: desc,
      date: date,
      status: "created"
    });

    // Fetch the updated task data from the database
    await fetchUpdatedTask();
      
    // Update the task list immediately (if available)
    if (updateListTask) {
      if ('data' in response) {
        updateListTask(response.data.task);
      }
    }

    showSuccessMessage("Task added successfully");
    handleCloseModal();
  } catch (error: any) {
    showErrorMessage(error.message);
  }
  };

  // Function to fetch the updated task data from the database
  const fetchUpdatedTask = () => {
    return getTask()
      .unwrap()
      .then((res) => {
        dispatch(setTask(res));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="fixed top-0 left-0 z-[999] w-full h-full flex items-center justify-center overflow-hidden bg-[rgba(0,0,0,0.4)] duration-[0.3s] ease-in-out transition-opacity">
      <div className="bg-[#fefefe] p-[2rem] rounded-[0.25rem] lg:w-[75%] lg:max-h-[80vh] overflow-y-auto sm:w-full sm:max-h-[100vh]">
        <span className="text-[#aaa] float-right text-[28px] font-bold hover:text-orange-400 hover:no-underline hover:cursor-pointer focus:text-orange-400 focus:no-underline focus:cursor-pointer" onClick={handleCloseModal}>&times;</span>
        <div className="flex flex-col lg:gap-[1rem] sm:gap-[0.25rem]">
          {isEdit ? <h2 className="font-bold text-[1.5rem]">Edit Contact</h2> : <h2 className="font-bold text-[1.5rem]">Add Contact</h2>}
          <form className="mt-[1rem] flex flex-col gap-[1rem]" onSubmit={handleFormSubmit}>
            <div className="flex flex-col gap-[0.25rem]">
              <label className="lg:text-[1rem] font-bold sm:text-[0.75rem]" htmlFor="task-title">Task Title</label>
              <input
                className="p-[1rem_0.5rem] shadow-[0_0_0.1rem_rgba(0,0,0,0.25)] rounded-[0.25rem] lg:text-[1rem] h-[2rem] outline-none transition-all duration-[0.25s] ease-in-out focus:border-[1px_solid_black] focus:shadow-[0_0_0.5rem_rgba(0,0,0,0.25)] sm:text-[0.75rem]"
                type="text"
                id="task-title"
                placeholder="Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-[0.25rem]">
              <label className="lg:text-[1rem] font-bold sm:text-[0.75rem]" htmlFor="task-desc">Task Description</label>
              <input
                className="p-[1rem_0.5rem] shadow-[0_0_0.1rem_rgba(0,0,0,0.25)] rounded-[0.25rem] lg:text-[1rem] h-[2rem] outline-none transition-all duration-[0.25s] ease-in-out focus:border-[1px_solid_black] focus:shadow-[0_0_0.5rem_rgba(0,0,0,0.25)] sm:text-[0.75rem]"
                type="text"
                id="task-desc"
                placeholder="Task Description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-[0.25rem]">
              <label className="lg:text-[1rem] font-bold sm:text-[0.75rem]" htmlFor="task-date">Task Date</label>
              <input
                className="p-[1rem_0.5rem] shadow-[0_0_0.1rem_rgba(0,0,0,0.25)] rounded-[0.25rem] lg:text-[1rem] h-[2rem] outline-none transition-all duration-[0.25s] ease-in-out focus:border-[1px_solid_black] focus:shadow-[0_0_0.5rem_rgba(0,0,0,0.25)] sm:text-[0.75rem]"
                type="text"
                id="task-date"
                placeholder="Task Date, Example: 12/12/2021"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <button className="p-[0.5rem_1rem] border-[1px_solid_black] rounded-[0.25rem] bg-black text-white text-[1rem] font-bold outline-none transition-all duration-[0.25s] ease-in-out hover:bg-orange-300 hover:text-white hover:cursor-pointer hover:border-[1px_solid_orange]" type="submit">
              {isEdit ? "Update Task" : "Add Task"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormModal;