import React from 'react';
import map from 'lodash/map';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-dark.css';
import mobx from 'mobx';
import { observer, inject } from 'mobx-react';
import get from 'lodash/get';
import find from 'lodash/find';
import forOwn from 'lodash/forOwn';

const createSpecialCardColumns = specialCards => {
    const headerColumn = {
        headerName: 'Forge cards',
        field: 'forgeCardName',
        pinned: 'left'
    };
    const specialCardColumns = map(specialCards, (specialCard, i) => {
        const { id, name } = specialCard;
        return {
            headerName: name,
            field: id,
            editable: true
        };
    });

    return [headerColumn, ...specialCardColumns];
};

const createForgeCardRows = (specialCards, forgeCards) => {
    return map(forgeCards, forgeCard => {
        const { id: forgeCardId, name: forgeCardName } = forgeCard;
        const forgeCardNameCell = {
            forgeCardName
        };
        const forgeCardMapping = { ...forgeCardNameCell };
        forOwn(specialCards, specialCard => {
            const {
                id: specialCardId,
                name: specialCardName,
                requirements
            } = specialCard;
            const requiredForgeCardCount = get(
                find(requirements, req => req.id === forgeCardId),
                'quantity',
                0
            );
            forgeCardMapping[specialCardId] = requiredForgeCardCount;
        });

        return forgeCardMapping;
    });
};
class ForgeMatrix extends React.Component {
    render() {
        const { forgeCards, specialCards } = this.props.store;
        const columns = createSpecialCardColumns(mobx.toJS(specialCards));
        const rowData = createForgeCardRows(
            mobx.toJS(specialCards),
            mobx.toJS(forgeCards)
        );
        if (this.props.store.user === null) {
            return null;
        }
        return (
            <div
                className="ag-theme-dark"
                style={{
                    width: '1000px',
                    height: '600px'
                }}
            >
                <AgGridReact columnDefs={columns} rowData={rowData} />
            </div>
        );
    }
}

export default inject('store')(observer(ForgeMatrix));
