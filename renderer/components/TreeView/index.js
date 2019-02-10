/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {Treebeard, decorators} from 'react-treebeard';
import {Menu, Item, Separator, contextMenu} from 'react-contexify';

import styles from './styles';

// Menu Ids declaration
const connection_menu = "connection_menu";
const collection_menu = "collection_menu";

const getIcon = (node) => {
  if (node.type === "connection") {
    return <img src={require('../../static/svg/cloud-open.svg')} className="padding-right-5" alt="logo" />;
  } else if (node.type === "database") {
    return <img src={require('../../static/svg/database.svg')} className="padding-right-5" alt="logo" />;
  } else if (node.type === "collectionsFolder") {
    return <img src={require('../../static/svg/folder.svg')} className="padding-right-5" alt="logo" />;
  } else {
    return <img src={require('../../static/svg/table.svg')} className="padding-right-5" alt="logo" />;
  }
};

const getMenuId = (type) => {
  if (type === 'connection' || type === 'database') {
    return connection_menu;
  } else if (type === 'collectionsFolder' || type === 'collection') {
    return collection_menu;
  }
};

class TreeView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      node: null,
      cursor: null
    };
    this.onToggle = this.onToggle.bind(this);
    this.onClick = this.onClick.bind(this);
    this.changeDecorator();
  }

  onClick({ event, props }) {
  }

  changeDecorator() {
    decorators.Header = ({ style, node }) => {
      return (
        <div disabled={node.loading} onDoubleClick={() => this.props.loadCollection(node)} style={style.base}>
          <div onContextMenu={(event) => { this.handleEvent(event, node) }} props={node}
               event="onClick"
               style={style.title}>
            {getIcon(node)}
            <span>{node.name}</span>
          </div>
        </div>
      );
    };
  }

  changeLoading() {
    decorators.Loading = ({ style, node }) => {
      return (
        <div onDoubleClick={() => this.loadCollection(node)} style={style.base}>
          <div onContextMenu={(event) => { this.handleEvent(event, node) }} props={node}
               event="onClick"
               style={style.title}>
            {getIcon(node)}
            <span>{node.name}</span>
          </div>
        </div>
      );
    };
  }

  connectionMenuStart() {
    return (
      <Menu style={{ borderRadius: 5, padding: 5 }} id={connection_menu}>
        <Item onClick={this.onClick}>Show Info</Item>
        <Separator />
        <Item>Edit</Item>
        <Item>Remove</Item>
      </Menu>
    )
  }

  collectionMenuStart() {
    return (
      <Menu style={{ borderRadius: 5, padding: 5 }} id={collection_menu}>
        <Item onClick={this.onClick}>Show Info</Item>
        <Item onClick={this.onClick}>Remove Collection</Item>
        <Separator />
        <Item>Export Collection</Item>
      </Menu>
    )
  }

  handleEvent(e, node) {
    const menu_id = getMenuId(node.type);
    e.preventDefault();
    contextMenu.show({
      id: menu_id,
      event: e
    });
  }

  onToggle(node, toggled) {
    const { cursor } = this.state;

    if (cursor) {
      cursor.active = false;
    }

    node.active = true;
    if (node.children) {
      node.toggled = toggled;
    }

    this.setState({ cursor: node, node });
  }
  render() {
    const { data } = this.props;

    return (
      <div>
        <Treebeard
          data={data}
          decorators={decorators}
          onToggle={this.onToggle}
          style={styles}/>
        {this.collectionMenuStart()}
        {this.connectionMenuStart()}
      </div>
    );
  }
}

export default TreeView;