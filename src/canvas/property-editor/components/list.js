import React, { Component } from "react";
import styles from "./list.css";
import PropTypes from 'prop-types'

export default class List extends Component {
  static propTypes = {
    currentElement:PropTypes.object
  }

  static contextTypes = {
    store:PropTypes.object
  }

  createClickHandler = (nextListType) => (ev) => {
    ev.preventDefault();
    const currentListType = this.props.currentElement.props.listType;

    this.context.store.updateElementProps({
      listType: currentListType === nextListType ? null : nextListType,
      isQuote: false
    });
  }

  render() {
    const { currentElement } = this.props;

    return (
      <div className={styles.listWrapper}>
        <span
          onClick={this.createClickHandler("unordered")}
          className={
            `octicon
             octicon-list-unordered
             ${styles.listBox}
             ${currentElement.props.listType === "unordered" ? styles.selectedList : ""}`
          }
        >
        </span>
        <span
          onClick={this.createClickHandler("ordered")}
          className={
            `octicon
             octicon-list-ordered
             ${styles.listBox}
             ${currentElement.props.listType === "ordered" ? styles.selectedList : ""}`
          }
        >
        </span>
      </div>
    );
  }
}
