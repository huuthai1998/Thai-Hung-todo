import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck, faCalendarMinus } from "@fortawesome/free-regular-svg-icons";


export default function Sidebar(props) {
  const navigate = useNavigate();
  return (
    <aside className="w-64 bg-[#FAFAFA] min-h-screen">
      <ul className="space-y-2">
        <li>
          <button
            className={`w-full flex items-center py-3 pl-[41px] my-4 text-base font-medium hover:bg-gray-200 ${props.status === "COMPLETED" ? null : "bg-gray-200"}`}
            onClick={() => {console.log("inprogress tab"); navigate("/?filter=inprogress");}}
          >
            <FontAwesomeIcon icon={faCalendarMinus} size="lg" className="text-xred"/>
            <span className="ml-3">In progress</span>
          </button>
        </li>
        <li>
          <button 
            className={`w-full flex items-center py-3 pl-[41px] my-4 text-base font-medium hover:bg-gray-200 ${props.status === "COMPLETED" ? "bg-gray-200" : null}`}
            onClick={() => {console.log("completed tab"); navigate("?filter=completed");}}
          >
            <FontAwesomeIcon icon={faCalendarCheck} size="lg" className="text-completed-400"/>
            <span className="ml-3">Completed</span>
          </button>
        </li>
      </ul>
    </aside>
  );
}
