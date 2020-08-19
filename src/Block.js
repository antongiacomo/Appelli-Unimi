import React from "react";
import moment from "moment";

function Block({ item }) {
  function chiusura(chiusura) {
    var weigth = "500 border-b-2 pb-0";
    chiusura = moment().diff(chiusura, "days");

    if (chiusura >= -2 && chiusura <= 0) return "border-yellow-" + weigth;
    if (chiusura > 0) return "border-red-" + weigth;
    return "border-green-" + weigth;
  }

  return (
    <div
      className="flex flex-wrap overflow-y-scroll"
      style={{ maxHeight: "300px" }}
    >
      {item.appelli.map((appello) => (
        <div
          key={appello.idAppello}
          className="w-full bg-gray-200 mr-1 my-1 p-2 rounded-lg hover:shadow-md hover:translate-x-1"
        >
          <div
            className={
              moment().diff(appello.chiusura, "days") > 0
                ? "opacity-50"
                : "opacity-100"
            }
          >
            <p>
              <span className="font-medium">Appello: </span>
              {moment(appello.data).format("DD/M")}

              <span className="text-sm">
                 ({moment().diff(appello.data, "days")} giorni)
              </span>
            </p>
          </div>
          <p>
            <div className="flex items-center">
              <span className="font-medium">Chiusura:</span>
              {moment().diff(appello.chiusura, "days") === 0 && (
                <svg
                  fill="currentColor"
                  className="h-4 w-4 text-red-600"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              )}

              <span className={chiusura(appello.chiusura) + " p-1"}>
                {appello.chiusuraStr}({moment().diff(appello.chiusura, "days")}{" "}
                giorni)
              </span>
            </div>
          </p>
        </div>
      ))}
    </div>
  );
}
export default Block;
