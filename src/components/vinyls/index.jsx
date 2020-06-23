import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import VinylsTable from "./table";
import Pagination from "../common/pagination";
import { getVinyls, deleteVinyl } from "../../services/vinylService";
import { paginate } from "../../utils/paginate";
import _ from "lodash";
import SearchBox from "../common/searchBox";
import { connect } from "react-redux";
import { addVinyl, removeVinyl } from "../../redux/actions/actions";

class Vinyls extends Component {
  state = {
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    sortColumn: { path: "name", order: "asc" },
  };

  constructor(props) {
    super(props);
  }

  handleDelete = async (vinyl) => {
    this.props.removeVinyl(vinyl.id);

    try {
      await deleteVinyl(vinyl.id);
    } catch (ex) {
      if (ex.response)
        toast.error("There was a problem and the item was not deleted.");
      this.props.addVinyl(vinyl.id);
    }
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    const { vinyls } = this.props;

    let allVinyls = vinyls;
    let filtered = allVinyls;

    if (searchQuery)
      filtered = allVinyls.filter((v) =>
        v.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const data = paginate(sorted, currentPage, pageSize);
    // console.log(filtered, filtered.length)
    return { totalCount: filtered.length, data };
  };

  render() {
    const { length: count } = this.props.vinyls;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const { totalCount, data: vinyls } = this.getPagedData();

    return (
      <div className="row">
        <div className="col">
          <Link
            to="/vinyls/new"
            className="btn btn-primary float-right mt-4"
            style={{ marginBottom: 20 }}
          >
            New Vinyl
          </Link>

          {count === 0 && <p>There are no vinyls in the database.</p>}

          {count != 0 && (
            <React.Fragment>
              <SearchBox value={searchQuery} onChange={this.handleSearch} />
              <p>Showing {totalCount} records.</p>
              <VinylsTable
                vinyls={vinyls}
                sortColumn={sortColumn}
                onDelete={this.handleDelete}
                onSort={this.handleSort}
              />
              <Pagination
                itemsCount={totalCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
              />
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    vinyls: state.vinyls,
  };
};

const mapDispatchToProprs = {
  removeVinyl,
  addVinyl,
};

export default connect(mapStateToProps, mapDispatchToProprs)(Vinyls);
