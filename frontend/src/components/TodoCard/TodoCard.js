import React, { useRef } from "react";
import { COLORS, CATEGORY_LIST, PRIORITY_LIST } from "../../constant";
import {
  Typography,
  Button,
  Row,
  Col,
  Popconfirm,
  DatePicker,
  Select,
  Input,
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
const { Paragraph } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const styles = {
  container: {
    backgroundColor: "white",
    boxShadow: "0px 0px 8px 2px rgba(0, 0, 0, 0.05)",
    borderRadius: 10,
    maxWidth: 1160,
    minHeight: 100,
  },
  checkCircle: {
    width: 40,
    height: 40,
    border: 0,
    backgroundColor: COLORS.BG_COMPLETED,
  },
  circle: {
    boxSizing: "border-box",
    width: 40,
    height: 40,
    border: `4px solid ${COLORS.LIGHT_GRAY}`,
  },
  checkIcon: {
    color: COLORS.COMPLETED,
    fontSize: 20,
  },
  checkContainer: {
    minHeight: 100,
  },
  content: {
    fontSize: "20px",
    maxWidth: 820,
    color: COLORS.MAIN_BLACK,
    fontWeight: 500,
  },
  editingContent: {
    fontSize: "19px",
    color: COLORS.MAIN_BLACK,
    fontWeight: 400,
    width: 1050,
    borderRadius: 10,
    marginBottom: 15,
  },
  cardBtn: {
    borderRadius: 5,
    fontWeight: 500,
    fontSize: 14,
    display: "flex",
    paddingLeft: 22,
    paddingRight: 22,
    marginRight: 16,
  },
  btnEdit: {
    border: `1px solid ${COLORS.BORDER_GRAY}`,
    color: "#555555",
  },
  btnRemove: {
    border: `1px solid ${COLORS.MAIN_RED}`,
    color: COLORS.MAIN_RED,
  },
  props: {
    border: 0,
    fontSize: 14,
    backgroundColor: "white",
    fontWeight: 500,
    marginLeft: 8
  },
  btnSave: {
    backgroundColor: COLORS.MAIN_RED,
    borderColor: COLORS.MAIN_RED,
    color: "white",
  },
  btnCancel: {
    backgroundColor: COLORS.BG_GREY,
    borderColor: COLORS.BG_GREY,
    color: "black",
  },
};

export default function TodoCard(props) {
  const [isCompleted, setIsCompleted] = useState(props.isCompleted);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);

  const content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit";
  const dueTime = moment("2022/07/19 13:30");
  const category = "PERSONAL";
  const priority = "HIGH";

  const sharedInputProps = {
    style: styles.editingContent,
    defaultValue: content,
    maxLength: 200,
    // showCount: true,
    // bordered: false,
    autoFocus: true,
    size: "large",
    ref: inputRef,
  };

  const onClickEdit = () => {
    setIsEditing(true);
    // console.log(inputRef.current);
    // inputRef.current.focus({cursor: "end"});
  };

  return (
    <Row style={styles.container}>
      <Col span={2}>
        <Row justify="center" align="middle" style={styles.checkContainer}>
          <Button
            shape="circle"
            style={isCompleted ? styles.checkCircle : styles.circle}
            onClick={() => {
              if (!isEditing) setIsCompleted(!isCompleted);
            }}
          >
            {isCompleted ? (
              <FontAwesomeIcon icon={faCheck} style={styles.checkIcon} />
            ) : (
              <FontAwesomeIcon icon={faCheck} color="white" />
            )}
          </Button>
        </Row>
      </Col>
      <Col span={22}>
        <Col span={24}>
          <Row justify="space-between" style={{ paddingTop: 17 }}>
            <Col>
              {isEditing ? (
                <TextArea {...sharedInputProps} />
              ) : (
                <Paragraph
                  ellipsis={{
                    rows: 1,
                    expandable: true,
                    symbol: "more",
                  }}
                  style={styles.content}
                >
                  {content}
                </Paragraph>
              )}
            </Col>
            {isEditing ? null : (
              <Col flex="auto">
                <Row justify="end">
                  {isCompleted ? null : (
                    <Button
                      style={{ ...styles.btnEdit, ...styles.cardBtn }}
                      onClick={onClickEdit}
                    >
                      Edit
                    </Button>
                  )}
                  <Popconfirm
                    placement="bottomLeft"
                    title="Do you really want to remove this post?"
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button style={{ ...styles.btnRemove, ...styles.cardBtn }}>
                      Remove
                    </Button>
                  </Popconfirm>
                </Row>
              </Col>
            )}
          </Row>
        </Col>
        <Col span={24} style={{ paddingBottom: 15 }}>
          <Row justify="space-between">
            <Row>
              <span style={{ marginRight: 18 }}>
                {isEditing ? (
                  <DatePicker
                    showTime
                    format="YYYY-MM-DD HH:mm"
                    defaultValue={dueTime}
                  />
                ) : (
                  <>
                    <FontAwesomeIcon
                      icon={faCalendarDays}
                      color={COLORS.TIME}
                    />
                    <button
                      style={{ ...styles.props, color: COLORS.TIME }}
                    >
                      {dueTime.format("ddd MMM DD YYYY HH:mm")}
                    </button>
                  </>
                )}
              </span>
              <span style={{ marginRight: 18 }}>
                {isEditing ? (
                  <Select
                    defaultValue={category}
                    style={{ width: 120 }}
                    onChange={(value) => console.log(value)}
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
                    <button
                      style={{ ...styles.props, color: COLORS.CATEGORY }}
                    >
                      {category}
                    </button>
                  </>
                )}
              </span>
              <span>
                {isEditing ? (
                  <Select
                    defaultValue={priority}
                    style={{ width: 120 }}
                    onChange={(value) => console.log(value)}
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
                    <FontAwesomeIcon icon={faFlag} color={COLORS[priority]} />
                    <button
                      style={{
                        ...styles.props,
                        color: COLORS[priority],
                      }}
                    >
                      {priority}
                    </button>
                  </>
                )}
              </span>
            </Row>
            {isEditing ? (
              <Row style={{ marginTop: 35 }}>
                <Button
                  style={{ ...styles.btnCancel, ...styles.cardBtn }}
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
                <Button style={{ ...styles.btnSave, ...styles.cardBtn }}>
                  Save
                </Button>
              </Row>
            ) : null}
          </Row>
        </Col>
      </Col>
    </Row>
  );
}
