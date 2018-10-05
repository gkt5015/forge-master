import React from "react";
import map from "lodash/map";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-dark.css";
import mobx from "mobx";
import { observer, inject } from "mobx-react";
import get from 'lodash/get'
import forEach from 'lodash'
import find from 'lodash/find'
import forOwn from 'lodash/forOwn'

const COLS = [
  "aasdfasd",
  "aasdfasd",
  "aasdfasd",
  "aasdfasd",
  "aasdfasd",
  "aasdfasd",
  "aasdfasd",
  "aasdfasd",
  "aasdfasd",
  "aasdfasd",
  "aasdfasd",
  "aasdfasd",
  "aasdfasd",
  "aasdfasd",
  "aasdfasd",
  "aasdfasd",
  "aasdfasd",
  "aasdfasd",
  "aasdfasd",
  "aasdfasd",
  "aasdfasd",
  "aasdfasd",
  "aasdfasd",
  "aasdfasd",
  "aasdfasd",
  "aasdfasd",
  "aasdfasd",
  "aasdfasd",
  "aasdfasd",
  "aasdfasd"
];
const columns = COLS.map((col, i) => {
  const str = col + i;
  const pinned = i === 0 ? { pinned: "left" } : {};
  return {
    headerName: str,
    field: str,
    editable: true,
    ...pinned
  };
});

const rows = COLS.map((col, i) => {
  const str = col + i;

  return {
    [str]: str
  };
});

const createSpecialCardColumns = specialCards => {
    const headerColumn = {headerName: 'Forge cards', field: 'forgeCardName',
    pinned: "left"}
    const specialCardColumns = map(specialCards, (specialCard, i) => {
        const { id, name } = specialCard;
        return {
          headerName: name,
          field: id,
          editable: true,
        };
      })
    
  return [headerColumn, ...specialCardColumns]
};

const createForgeCardRows = (specialCards, forgeCards) => {
    return map(forgeCards, forgeCard => {
        const { id: forgeCardId, name: forgeCardName } = forgeCard;
        const forgeCardNameCell = {
            forgeCardName
        }
        const forgeCardMapping = {...forgeCardNameCell}
        console.log('CHECKING OUT SPEC CARDS', specialCards)
        forOwn(specialCards, specialCard => {
            console.count('specialCards')
            const { id: specialCardId, name: specialCardName, requirements } = specialCard;
            const requiredForgeCardCount = get(find(requirements, req => req.id === forgeCardId), 'quantity', 0)
            forgeCardMapping[specialCardId] = requiredForgeCardCount
            console.log('RESULT UP HERE', forgeCardMapping)

        })

        console.log('RESULT', forgeCardMapping)

        return forgeCardMapping
    })
}
class ForgeMatrix extends React.Component {
  constructor() {
    super();

    this.state = {
      columnDefs: columns,
      rowData: rows
    };
  }

  render() {
    const { forgeCards, specialCards } = this.props.store;
    const columns = createSpecialCardColumns( mobx.toJS(specialCards));
    const rowData = createForgeCardRows( mobx.toJS(specialCards),  mobx.toJS(forgeCards))
    console.log('ROWDATA', rowData)
    return (
      <div
        className="ag-theme-dark"
        style={{
          height: "500px",
          width: "600px"
        }}
      >
        <AgGridReact columnDefs={columns} rowData={rowData} />
      </div>
    );
  }
}

export default inject("store")(observer(ForgeMatrix));
