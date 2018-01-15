import React, { Component } from "react";
import { observer } from "mobx-react";
import { autorun } from "mobx";
import PropTypes from 'prop-types'
import styles from "./index.css";
import { ElementTypes, BLACKLIST_CURRENT_ELEMENT_DESELECT } from "../../constants";
const Menumap = new Map();


@observer
class PropertyEditor extends Component {
  static contextTypes = {
    store: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {
      hasMenu: false,
      contextualMenu: null
    };
  }

  componentDidMount() {
    autorun(() => {
      if (this.context.store.currentElement) {
        const currentElement =  this.context.store.components.get(this.context.store.currentElement)
        this.setState({
          hasMenu: true,
          contextualMenu: currentElement.type
        });
        return;
      }
      this.setState({ hasMenu: false, contextualMenu: null });
    });
  }

  render() {
    const moveMenu = this.state.hasMenu ? styles.slidesInactive : "";
    const { hasMenu} = this.state;

    return (
      <div className={`${styles.editor} ${BLACKLIST_CURRENT_ELEMENT_DESELECT}`}>
             
      </div>
    );
  }
}

export default PropertyEditor;
