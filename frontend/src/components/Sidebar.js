import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faCalendarMinus,
} from "@fortawesome/free-regular-svg-icons";
import { TAB_STATUS } from "../constant";

export default function Sidebar({ status }) {
  return (
    <aside className="w-64 bg-[#FAFAFA] min-h-screen hidden md:block">
      <ul className="space-y-2">
        <li>
          <Link
            to={{
              pathname: "/",
              search: "?filter=inprogress",
            }}
            className={`w-full flex items-center py-3 pl-[41px] my-4 text-base text-black hover:text-black font-medium hover:bg-gray-200 ${
              status === TAB_STATUS.COMPLETED ? null : "bg-gray-200"
            }`}
          >
            <FontAwesomeIcon
              icon={faCalendarMinus}
              size="lg"
              className="text-xred"
            />
            <span className="ml-3">In progress</span>
          </Link>
        </li>
        <li>
          <Link
            to={{
              pathname: "/",
              search: "?filter=completed",
            }}
            className={`w-full flex items-center py-3 pl-[41px] my-4 text-base text-black hover:text-black font-medium hover:bg-gray-200 ${
              status === TAB_STATUS.COMPLETED ? "bg-gray-200" : null
            }`}
          >
            <FontAwesomeIcon
              icon={faCalendarCheck}
              size="lg"
              className="text-completed-400"
            />
            <span className="ml-3">Completed</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
}
