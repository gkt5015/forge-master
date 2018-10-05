
import React from 'react'

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-dark.css';
const COLS = ['aasdfasd', 'aasdfasd', 'aasdfasd', 'aasdfasd', 'aasdfasd', 'aasdfasd', 'aasdfasd', 'aasdfasd', 'aasdfasd', 'aasdfasd', 'aasdfasd', 'aasdfasd', 'aasdfasd', 'aasdfasd', 'aasdfasd', 'aasdfasd', 'aasdfasd', 'aasdfasd', 'aasdfasd', 'aasdfasd', 'aasdfasd', 'aasdfasd', 'aasdfasd', 'aasdfasd', 'aasdfasd', 'aasdfasd', 'aasdfasd', 'aasdfasd', 'aasdfasd', 'aasdfasd']
const columns = COLS.map((col, i) => {
    const str = col + i
    const pinned = i === 0 ? { pinned: 'left' } : {}
    return {
        headerName: str, field: str, editable: true,
        ...pinned
    }
})

const rows = COLS.map((col, i) => {
    const str = col + i
    
    return {
        [str]: str,
    }
})
class ForgeMatrix extends React.Component {
    constructor() {
        super()

        this.state = {
            columnDefs: columns,
            rowData: rows
        }
    }

    render() {
        return (
            <div 
                  className="ag-theme-dark"
                  style={{ 
	                height: '500px', 
	                width: '600px' }} 
		            >
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}>
                    </AgGridReact>
                </div>
        )
    }
}

export default ForgeMatrix
