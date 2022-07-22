import React from "react";
import { COLORS, CATEGORY_LIST, PRIORITY_LIST } from "../../constant";
import {
  Typography,
  Popconfirm,
  DatePicker,
  Select,
  Input,
  notification,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faCalendarDays,
  faCircle,
  faFlag,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { useState } from "react";
import { faEdit, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { useTodoContext } from "../../contexts/todoStore";
import axios from "axios";
const { Paragraph } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const styles = {
  checkCircle: {
    border: 0,
    backgroundColor: COLORS.BG_COMPLETED,
  },
  circle: {
    border: `4px solid ${COLORS.LIGHT_GRAY}`,
  },
  props: {
    border: 0,
    fontSize: 14,
    backgroundColor: "white",
    fontWeight: 500,
    marginLeft: 8,
  },
};

export default function TodoCard(props) {
  const [isCompleted, setIsCompleted] = useState(props.isCompleted);
  const [curData, setCurData] = useState(props.data);
  const [isEditing, setIsEditing] = useState(false);
  const [isEdited, setIsEdited] = useState(false);

  const { editTodo, deleteTodo } = useTodoContext();

  const sharedInputProps = {
    className: "xl:w-[1040px] lg:w-[880px] md:w-[660px] sm:w-[400px]",
    defaultValue: curData.content,
    maxLength: 200,
    showCount: true,
    autoFocus: true,
    size: "large",
    onChange: (ref) => {
      setCurData({ ...curData, content: ref.target.value });
      setIsEdited(true);
    },
  };

  const handleDelete = async () => {
    console.log("Delete todo:", curData.id);
    try {
      const { status, data } = await axios.delete(`/todo/${curData.id}`);
      if (status === 200) deleteTodo(curData.id);
      else {
        notification.info({
          message: data.message,
          placement: "top",
          duration: 1,
        });
      }
    } catch (err) {
      console.log(err);
      notification.error({
        message: err.message,
        placement: "top",
        duration: 2,
      });
    }
  };

  const handleEdit = async () => {
    if (!isEdited) {
      setIsEditing(false);
      return;
    }
    console.log("Edit todo:", curData.id);
    if (curData.content && curData.content.trim().length > 0) {
      try {
        curData.content = curData.content.trim();
        const { status, data } = await axios.patch(
          `/todo/${curData.id}`,
          curData
        );
        if (status === 200) {
          editTodo(curData);
          setIsEditing(false);
        }
        notification.info({
          message: data.message,
          placement: "top",
          duration: 2,
        });
      } catch (err) {
        console.log(err);
        notification.error({
          message: err.message,
          placement: "top",
        });
      }
    } else {
      notification.info({
        message: "Task content can't be empty",
        placement: "top",
        duration: 2,
      });
    }
    setIsEdited(false);
  };

  const changeStatus = async () => {
    if (isEditing) return;
    console.log("Change todo status:", curData.id);
    const newStatus = !isCompleted ? "COMPLETED" : "INPROGRESS";
    if (isCompleted) console.log("Uncheck");
    else console.log("Check");
    try {
      const { status, data } = await axios.patch(`/todo/${curData.id}`, {
        status: newStatus,
      });
      if (status === 200) {
        setIsCompleted(!isCompleted);
        editTodo({ ...curData, status: newStatus });
        notification.info({
          message: "Status updated",
          placement: "top",
          duration: 1.5,
        });
      } else {
        notification.info({
          message: data.message,
          placement: "top",
          duration: 2,
        });
      }
    } catch (err) {
      console.log(err);
      notification.info({
        message: err.message,
        placement: "top",
      });
    }
  };

  return (
    <div className="min-h-[100px] max-w-6xl grid grid-cols-12 bg-white rounded-lg shadow-[0_0_8px_2px_rgba(0,0,0,0.05)]">
      <div className="md:col-span-1 h-full grid place-items-center">
        <button
          className="rounded-full w-10 h-10"
          style={isCompleted ? styles.checkCircle : styles.circle}
          onClick={changeStatus}
        >
          {isCompleted ? (
            <FontAwesomeIcon
              icon={faCheck}
              className="text-completed-400 text-xl"
            />
          ) : null}
        </button>
      </div>
      <div className="col-span-11">
        <div className="flex justify-between pt-4">
          <div>
            {isEditing ? (
              <TextArea {...sharedInputProps} />
            ) : (
              <Paragraph
                ellipsis={{
                  rows: 2,
                  // -- remove this will improve ux
                  // expandable: true,
                  // symbol: "more",
                }}
                className="text-xl max-w-[920px] text-black font-medium"
              >
                {curData.content}
              </Paragraph>
            )}
          </div>
          {isEditing ? null : (
            <div>
              {isCompleted ? null : (
                <button
                  className="font-medium text-lg pb-1 px-2 mr-2 hover:text-gray-600 text-gray-500"
                  onClick={() => setIsEditing(true)}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              )}
              <Popconfirm
                placement="bottomLeft"
                title="Do you really want to delete this task?"
                okText="Yes"
                cancelText="No"
                onConfirm={handleDelete}
              >
                <button className="font-medium text-lg pb-1 px-2 mr-2 hover:text-red-700 text-xred">
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
              </Popconfirm>
            </div>
          )}
        </div>
        <div className="pb-4">
          <div className="flex justify-between">
            <div>
              <span className="mr-5">
                {isEditing ? (
                  <DatePicker
                    showTime
                    format="YYYY-MM-DD HH:mm"
                    defaultValue={moment(curData.dueDate)}
                    onChange={(value) => {
                      setCurData({ ...curData, dueDate: value });
                      setIsEdited(true);
                    }}
                  />
                ) : (
                  <>
                    <FontAwesomeIcon
                      icon={faCalendarDays}
                      color={COLORS.TIME}
                    />
                    <button style={{ ...styles.props, color: COLORS.TIME }}>
                      {moment(curData.dueDate).format("ddd MMM DD YYYY HH:mm")}
                    </button>
                  </>
                )}
              </span>
              <span className="mr-5">
                {isEditing ? (
                  <Select
                    defaultValue={curData.category}
                    className="w-32"
                    onChange={(value) => {
                      setCurData({ ...curData, category: value });
                      setIsEdited(true);
                    }}
                  >
                    {CATEGORY_LIST.map((val) => (
                      <Option key={val} value={val}>
                        {val}
                      </Option>
                    ))}
                  </Select>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faCircle} color={COLORS.BG_BLUE} />
                    <button style={{ ...styles.props, color: COLORS.CATEGORY }}>
                      {curData.category}
                    </button>
                  </>
                )}
              </span>
              <span>
                {isEditing ? (
                  <Select
                    defaultValue={curData.priority}
                    className="w-32"
                    onChange={(value) => {
                      setCurData({ ...curData, priority: value });
                      setIsEdited(true);
                    }}
                  >
                    {PRIORITY_LIST.map((val) => (
                      <Option
                        key={val}
                        value={val}
                        style={{ color: COLORS[val] }}
                      >
                        {val}
                      </Option>
                    ))}
                  </Select>
                ) : (
                  <>
                    <FontAwesomeIcon
                      icon={faFlag}
                      color={COLORS[curData.priority]}
                    />
                    <button
                      style={{
                        ...styles.props,
                        color: COLORS[curData.priority],
                      }}
                    >
                      {curData.priority}
                    </button>
                  </>
                )}
              </span>
            </div>
            {isEditing ? (
              <div className="mt-8">
                <button
                  className="rounded-md border border-gray-300 shadow-sm px-4 py-1 bg-white text-base font-medium text-black hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
                <button
                  className="rounded-md shadow-sm px-4 py-1 mr-4 bg-xred text-base font-medium text-white hover:bg-red-600 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleEdit}
                >
                  Save
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
