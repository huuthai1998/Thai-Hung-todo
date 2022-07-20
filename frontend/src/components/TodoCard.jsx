import React from "react";
import { COLORS } from "../constant";
import { Typography, Button, Row, Col, Popconfirm } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faCalendarDays,
  faCircle,
  faFlag,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
const { Paragraph } = Typography;

const styles = {
  container: {
    backgroundColor: "white",
    boxShadow: "0px 0px 8px 2px rgba(0, 0, 0, 0.05)",
    borderRadius: 15,
    maxWidth: 1162,
    minHeight: 113,
  },
  checkCircle: {
    width: 42,
    height: 42,
    border: 0,
    backgroundColor: COLORS.BG_COMPLETED,
  },
  circle: {
    boxSizing: "border-box",
    width: 42,
    height: 42,
    border: `4px solid ${COLORS.LIGHT_GRAY}`,
  },
  checkIcon: {
    color: COLORS.COMPLETED,
    fontSize: 21,
  },
  checkContainer: {
    minHeight: 113,
  },
  content: {
    fontSize: "22px",
    maxWidth: 800,
    color: COLORS.MAIN_BLACK,
    fontWeight: 500,
  },
  btnTopRight: {
    borderRadius: 10,
    fontWeight: 500,
    fontSize: 16,
    display: "flex",
    alignItems: "center",
    paddingLeft: 22,
    paddingRight: 22,
    marginRight: 16,
  },
  btnEdit: {
    border: `1.5px solid ${COLORS.BORDER_GRAY}`,
    color: "#555555",
  },
  btnRemove: {
    border: `1.5px solid ${COLORS.MAIN_RED}`,
    color: COLORS.MAIN_RED,
  },
  btnBottomLeft: {
    border: 0,
    fontSize: 18,
    backgroundColor: "white",
    fontWeight: 500,
  },
  btnTime: {
    color: COLORS.CARD_TIME,
  },
  btnCategory: {
    color: COLORS.CARD_CATEGORY,
  },
};

export default function TodoCard(props) {
  const [isCompleted, setIsCompleted] = useState(false);
  const content =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit";

  return (
    <Row style={styles.container}>
      <Col span={2}>
        <Row justify="center" align="middle" style={styles.checkContainer}>
          <Button
            shape="circle"
            style={isCompleted ? styles.checkCircle : styles.circle}
            onClick={() => setIsCompleted(!isCompleted)}
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
            <Row>
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
            </Row>
            <Row justify="end">
              {isCompleted ? null : (
                <Button style={{ ...styles.btnEdit, ...styles.btnTopRight }}>
                  Edit
                </Button>
              )}
              <Popconfirm
                placement="bottomLeft"
                title="Do you really want to remove this post?"
                okText="Yes"
                cancelText="No"
              >
                <Button style={{ ...styles.btnRemove, ...styles.btnTopRight }}>
                  Remove
                </Button>
              </Popconfirm>
            </Row>
          </Row>
        </Col>
        <Col span={24} style={{ paddingBottom: 15 }}>
          <span style={{ marginRight: 16 }}>
            <FontAwesomeIcon
              icon={faCalendarDays}
              color={styles.btnTime.color}
            />
            <button style={{ ...styles.btnBottomLeft, ...styles.btnTime }}>
              10:00 am
            </button>
          </span>
          <span style={{ marginRight: 16 }}>
            <FontAwesomeIcon icon={faCircle} color={COLORS.BG_BLUE} />
            <button style={{ ...styles.btnBottomLeft, ...styles.btnCategory }}>
              Personal
            </button>
          </span>
          <span style={{ marginRight: 16 }}>
            <FontAwesomeIcon icon={faFlag} color={COLORS.CARD_URGENT} />
            <button
              style={{ ...styles.btnBottomLeft, color: COLORS.CARD_URGENT }}
            >
              Urgent
            </button>
          </span>
        </Col>
      </Col>
    </Row>
  );
}
