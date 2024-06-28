import '@patternfly/react-core/dist/styles/base.css';
import React from 'react';
import { TreeView, TreeViewDataItem } from '@patternfly/react-core';
import { useState } from 'react';

const CheckboxTreeView = (props) => {
  const { options, setSelectedOptions } = props;
  const [state, setState] = useState({ activeItems: [], checkedItems: [] });

  const onClick = (evt, treeViewItem, parentItem) => {
    setState({
      activeItems: [treeViewItem, parentItem]
    });
  };

  const onCheck = (evt, treeViewItem) => {
    const checked = evt.target.checked;
    // console.log(checked);

    const checkedItemTree = options
      .map((opt) => Object.assign({}, opt))
      .filter((item) => filterItems(item, treeViewItem));
    const flatCheckedItems = flattenTree(checkedItemTree);

    setState(
      (prevState) => ({
        checkedItems: checked
          ? prevState.checkedItems.concat(
              flatCheckedItems.filter(
                (item) => !prevState.checkedItems.some((i) => i.id === item.id)
              )
            )
          : prevState.checkedItems.filter((item) => !flatCheckedItems.some((i) => i.id === item.id))
      }),
      () => {
        // console.log('Checked items: ', state.checkedItems);
      }
    );
  };
  setSelectedOptions(state.checkedItems);
  // Helper functions
  const isChecked = (dataItem) => state.checkedItems.some((item) => item.id === dataItem.id);
  const areAllDescendantsChecked = (dataItem) =>
    dataItem.children
      ? dataItem.children.every((child) => areAllDescendantsChecked(child))
      : isChecked(dataItem);
  const areSomeDescendantsChecked = (dataItem) =>
    dataItem.children
      ? dataItem.children.some((child) => areSomeDescendantsChecked(child))
      : isChecked(dataItem);

  const flattenTree = (tree) => {
    var result = [];
    tree.forEach((item) => {
      result.push(item);
      if (item.children) {
        result = result.concat(flattenTree(item.children));
      }
    });
    return result;
  };

  const mapTree = (item) => {
    const hasCheck = areAllDescendantsChecked(item);
    // Reset checked properties to be updated
    item.checkProps.checked = false;

    if (hasCheck) {
      item.checkProps.checked = true;
    } else {
      const hasPartialCheck = areSomeDescendantsChecked(item);
      if (hasPartialCheck) {
        item.checkProps.checked = null;
      }
    }

    if (item.children) {
      return {
        ...item,
        children: item.children.map((child) => mapTree(child))
      };
    }
    return item;
  };

  const filterItems = (item, checkedItem) => {
    if (item.id === checkedItem.id) {
      return true;
    }

    if (item.children) {
      return (
        (item.children = item.children
          .map((opt) => Object.assign({}, opt))
          .filter((child) => filterItems(child, checkedItem))).length > 0
      );
    }
  };
  const mapped = options.map((item) => mapTree(item));
  return <TreeView data={mapped} onSelect={onClick} onCheck={onCheck} hasChecks />;
};

export default CheckboxTreeView;
