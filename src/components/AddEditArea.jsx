import React from 'react';
import { observer, inject } from 'mobx-react';

import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AddEditForgeCards from './ForgeCard/AddEditForgeCards';
import AddEditSpecialCards from './SpecialCard/AddEditSpecialCards';

class AddEditArea extends React.Component {
    render() {
        if (this.props.store.user === null) {
            return null;
        }
        return (
            <div className="AddEditArea">
                <Accordion>
                    <AccordionItem>
                        <AccordionItemTitle hideBodyClassName="show-accordion">
                            <div className="accordion-title">
                                <FontAwesomeIcon icon={faPlus} /> Add/Edit Forge
                                Card
                            </div>
                        </AccordionItemTitle>
                        <AccordionItemBody>
                            <AddEditForgeCards />
                        </AccordionItemBody>
                    </AccordionItem>
                </Accordion>
                <Accordion>
                    <AccordionItem>
                        <AccordionItemTitle>
                            <div className="accordion-title">
                                <FontAwesomeIcon icon={faPlus} /> Add/Edit
                                Special Card
                            </div>
                        </AccordionItemTitle>
                        <AccordionItemBody>
                            <AddEditSpecialCards />
                        </AccordionItemBody>
                    </AccordionItem>
                </Accordion>
            </div>
        );
    }
}

export default inject('store')(observer(AddEditArea));
