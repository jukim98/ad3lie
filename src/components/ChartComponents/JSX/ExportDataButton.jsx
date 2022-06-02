import React from 'react';
import { download } from "../../../utils/ExportData"
import { myComp } from "../../../utils/CodePreview"

export const ExportDataButton = (name, data) => {
    return (
    <button
      className="export-data button"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      onClick={() => download(`${name}Data.txt`, JSON.stringify(data))}
      >
      Export Data
    </button>
  )}

// export const ExportCompButton = (name, data) => {
//     return (
//     <button
//       className="export-comp button"
//       class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
//       onClick={() => formatCode(this.refs.code)}
//       >
//       Export Data
//     </button>
//   )}

