import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "../common/table";

class VinylsTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: (vinyl) => <Link to={`/vinyls/${vinyl.id}`}>{vinyl.title}</Link>,
    },
    { path: "band", label: "Band" },
    { path: "album", label: "Album" },
    {
      path: "Delete",
      label: "Delete",
      key: "delete",
      content: (vinyl) => (
        <button
          onClick={() => this.props.onDelete(vinyl)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];



  render() {
    const { vinyls, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={vinyls}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default VinylsTable;
