import React, { useState, useEffect } from "react";
import axios from "axios";
import "./tailwind.generated.css";
import { useStorageState } from 'react-storage-hooks';
import Block from "./Block";
//import Corsi from "./corsi.json"
//import Select from 'react-select'
//
function App() {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState([""]);
  const [filter, setFilter] = useStorageState(
    localStorage,
    'filters',
    []
  );

  useEffect(() => {
    var config = {
      headers: { "Access-Control-Allow-Origin": "*" },
    };

    const fetchData = async () => {
      const result = await axios(
        "https://cors-anywhere.herokuapp.com/https://work.unimi.it/foProssimiEsami/json/F94",
        config
      );

      setData(result.data);
    };

    fetchData();
  }, []);

  function clear(item,filterOnly = false) {
    var atitle = filterOnly ? [] : title
    var set = [...atitle, ...filter];

    var result = set.map((element) => {
      return (
        item.descrIns.toLowerCase().includes(element) ||
        item.appelli[0].docente.nome.toLowerCase().includes(element) ||
        item.appelli[0].docente.cognome.toLowerCase().includes(element)
      );
    });

    return result.some((item) => item);
  }

  return (
    <div className="">
      <div className="w-full px-8 py-6 sticky bg-white z-50 bg-white top-0">

        <input
        placeholder="Search..."
          className="w-full  h-full border py-2 px-4 rounded-lg shadow bg-white"
          onChange={(event) =>
            setTitle(event.target.value.toLowerCase().split("&"))
          }
          value={title}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              setFilter([...(new Set([...filter, event.target.value.toLowerCase()]))]);
              setTitle([""]);
            }
          }}
        />
         {/* <Select options={Corsi} /> */}
      </div>
      <div>

      </div>
      <div className="flex px-8 flex-wrap space-x-2">
        {filter.map((f) => {
          return (
            <span key={f} className="rounded-full py-2 px-4 my-2 bg-gray-300 hover:shadow-md hover:translate-x-1">
              {f}{" "}
              <span
                className="ml-1 border cursor-pointer"
                data-value={f}
                onClick={(event) =>
                  setFilter(
                    filter.filter((e) => e !== event.target.dataset.value)
                  )
                }
              >
                ✘
              </span>
            </span>
          );
        })}
      </div>

      <div className="flex flex-wrap p-4">
        {data
          .filter((item) => clear(item))
          .sort((a, b) => false - clear(a,true))
          .map((item) => {
            return (
              <div
                className="lg:w-1/4 md:w-1/3 sm:w-1/2 w-full p-4 relative"
                key={item.codW4}

              >

                <div className="relative border w-full h-full p-4 rounded-lg shadow overflow-hidden z-40">

                 { clear(item,true) && <div className="absolute bg-indigo-600 w-6 h-8 z-30 transform rotate-45" style={{ top: '-0.75rem' , left: '-0.75rem'}}></div>}

                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="float-right"
                    href={
                      "https://www.unimi.it/it/corsi/insegnamenti-dei-corsi-di-laurea/2021/" +
                      item.descrIns.toLowerCase().trim().replace(/ /g, "-")
                    }
                  >
                    <svg
                      className="w-6 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 1792 1792"
                    >
                      <defs />
                      <path d="M1408 928V448q0-26-19-45t-45-19H864q-42 0-59 39-17 41 14 70l144 144-534 534q-19 19-19 45t19 45l102 102q19 19 45 19t45-19l534-534 144 144q18 19 45 19 12 0 25-5 39-17 39-59zm256-512v960q0 119-84 204t-204 84H416q-119 0-203-84t-85-204V416q0-119 85-203t203-85h960q119 0 204 85t84 203z" />
                    </svg>
                  </a>

                  <p className="font-medium text-lg mb-1 cursor-pointer hover:underline" onClick={ () => setFilter([...(new Set([...filter, item.descrIns.toLowerCase()]))])}>{item.descrIns}</p>
                  <p className="text-sm mb-5">
                    {item.appelli[0].docente.nome}{" "}
                    {item.appelli[0].docente.cognome}
                  </p>
                  <Block item={item ?? []}></Block>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
