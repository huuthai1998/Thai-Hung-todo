import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck, faCalendarMinus } from "@fortawesome/free-regular-svg-icons";


export default function Sidebar() {
  const navigate = useNavigate();
  return (
    <aside className="w-64 bg-[#FAFAFA] overscoll-y-auto">
      <ul class="space-y-2">
        <li>
          <button
            class="w-full flex items-center py-3 pl-[41px] my-4 text-base font-medium bg-gray-100 hover:bg-gray-200"
            onClick={() => navigate("/?filter=inprogress")}
          >
            <FontAwesomeIcon icon={faCalendarMinus} size="lg" className="text-blue"/>
            <span class="ml-3">In progress</span>
          </button>
        </li>
        <li>
          <button 
            class="w-full flex items-center py-3 pl-[41px] my-4 text-base font-medium hover:bg-gray-200"
            onClick={() => navigate("?filter=completed")}
          >
            <FontAwesomeIcon icon={faCalendarCheck} size="lg" className="text-completed-400"/>
            <span class="ml-3">Completed</span>
          </button>
        </li>
      </ul>
    </aside>
  );
}
