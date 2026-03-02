import PrimaryBtn from "@/components/ui/PrimaryBtn";
import Textarea from "@/components/ui/Textarea";
import { Schedule } from "@/types/calendar";
import { format } from "date-fns";
import Modal from "react-modal";
import useScheduleDetail from "../hooks/useScheduleDetail";

type PropsType = {
  selectedSchedule: Schedule | null;
  closeModal: () => void;
  saveSchedule: (schedule: Schedule) => void;
  deleteSchedule: (schedule: Schedule) => void;
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

const ScheduleDetailModal = ({
  selectedSchedule,
  closeModal,
  saveSchedule,
  deleteSchedule,
}: PropsType) => {
  const {
    isEditing,
    setIsEditing,
    handleEditSchedule,
    editSchedule,
    changeEditSchedule,
    handleDeleteSchedule,
  } = useScheduleDetail({
    closeModal,
    selectedSchedule,
    saveSchedule,
    deleteSchedule,
  });

  return (
    <Modal
      isOpen={!!selectedSchedule}
      onRequestClose={closeModal}
      style={customStyles}
    >
      {isEditing
        ? selectedSchedule && (
            <div>
              <h3 className="text-center text-3xl text-lime-800 font-bold pb-5">
                予定編集
              </h3>
              <form
                onSubmit={handleEditSchedule}
                className="flex flex-col gap-8"
              >
                <div className="w-full flex items-center">
                  <label htmlFor="title-form" className="w-[30%] text-lime-800">
                    タイトル
                  </label>
                  <input
                    id="title-form"
                    name="title"
                    type="text"
                    value={editSchedule.title}
                    onChange={changeEditSchedule}
                    className="w-full border-4 border-solid border-lime-800 rounded-md p-2"
                  />
                </div>
                <div className="w-full flex items-center">
                  <p className="w-[30%] text-lime-800">日付</p>
                  <p className="w-full p-2">
                    {format(selectedSchedule.date, "yyyy年M月d日")}
                  </p>
                </div>
                <div className="w-full flex items-center">
                  <label
                    htmlFor="description-form"
                    className="w-[30%] text-lime-800"
                  >
                    内容
                  </label>
                  <Textarea
                    id="description-form"
                    name="description"
                    value={editSchedule.description}
                    onChange={changeEditSchedule}
                  />
                </div>
                <div className="flex justify-center">
                  <PrimaryBtn size="lg" color="primary" onClick={() => null}>
                    保存
                  </PrimaryBtn>
                </div>
              </form>
            </div>
          )
        : selectedSchedule && (
            <div className="flex flex-col gap-8">
              <h3 className="text-center text-3xl text-lime-800 font-bold pb-5">
                {selectedSchedule.title}
              </h3>
              <p>{format(selectedSchedule.date, "yyyy年M月d日")}</p>
              <p>{selectedSchedule.description}</p>
              <div className="flex justify-center gap-3">
                <PrimaryBtn
                  size="lg"
                  color="primary"
                  onClick={() => setIsEditing(true)}
                >
                  編集
                </PrimaryBtn>
                <PrimaryBtn
                  size="lg"
                  color="danger"
                  onClick={handleDeleteSchedule}
                >
                  削除
                </PrimaryBtn>
              </div>
            </div>
          )}
    </Modal>
  );
};

export default ScheduleDetailModal;
