import PrimaryBtn from "@/components/ui/PrimaryBtn";
import Textarea from "@/components/ui/Textarea";
import { Schedule } from "@/types/calendar";
import Modal from "react-modal";
import useCreateSchedule from "../hooks/useCreateSchedule";
Modal.setAppElement("body");

type PropsType = {
  isOpen: boolean;
  closeModal: () => void;
  addSchedule: (schedule: Schedule) => void;
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    width: "30%",
    height: "60vh",
    transform: "translate(-50%, -50%)",
  },
};

const CreateScheduleModal = ({
  isOpen,
  closeModal,
  addSchedule,
}: PropsType) => {
  const { errorMessage, newSchedule, changeNewSchedule, handleCreateSchedule } =
    useCreateSchedule({ closeModal, addSchedule });

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
      <div>
        <h3 className="text-center text-3xl text-lime-800 font-bold pb-5">
          予定作成
        </h3>
        {errorMessage !== "" && (
          <div className="p-5 mb-5 bg-red-500 text-white text-center rounded-lg">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleCreateSchedule} className="flex flex-col gap-8">
          <div className="w-full flex items-center">
            <label htmlFor="title-form" className="w-[30%] text-lime-800">
              タイトル
            </label>
            <input
              id="title-form"
              name="title"
              type="text"
              value={newSchedule.title}
              onChange={changeNewSchedule}
              className="w-full border-4 border-solid border-lime-800 rounded-md p-2"
            />
          </div>
          <div className="w-full flex items-center">
            <label htmlFor="date-form" className="w-[30%] text-lime-800">
              日付
            </label>
            <input
              id="date-form"
              name="date"
              type="date"
              value={newSchedule.date}
              onChange={changeNewSchedule}
              className="w-full border-4 border-solid border-lime-800 rounded-md p-2"
            />
          </div>
          <div className="w-full flex items-center">
            <label htmlFor="description-form" className="w-[30%] text-lime-800">
              内容
            </label>
            <Textarea
              id="description-form"
              name="description"
              value={newSchedule.description}
              onChange={changeNewSchedule}
            />
          </div>
          <div className="flex justify-center">
            <PrimaryBtn color="primary" size="lg" onClick={() => null}>
              作成
            </PrimaryBtn>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateScheduleModal;
