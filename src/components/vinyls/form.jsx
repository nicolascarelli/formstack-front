import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import { saveVinyl } from "../../services/vinylService";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { addVinyl, updateVinyl } from "../../redux/actions/actions";
import { makeGetVinylState } from "../../selectors";

class VinylForm extends Form {
  state = {
    errors: {},
  };

  constructor(props) {
    super(props);
  }

  schema = {
    id: Joi.string(),
    title: Joi.string().required().label("Title"),
    band: Joi.string().required().label("Band"),
    album: Joi.string().required().label("Album"),
  };

  doSubmit = async () => {
    try {
      this.setState({submitting: true})
      const { data } = await saveVinyl(this.props.data);
      this.setState({submitting: false})
      const vinylId = this.props.match.params.id;
      if (vinylId === "new") {
        const body = { ...this.props.data };
        delete body.id;
        this.props.addVinyl({ ...this.props.data, id: data });
      } else {
        this.props.updateVinyl({ vinyl: this.props.data });
      }
      this.props.history.push("/vinyls");
    } catch (ex) {
      if (ex.response) {
        toast.error(ex.response.data);
      }
      this.setState({submitting: false})
    }
  };

  render() {
    const vinylId = this.props.match.params.id;
    const {submitting} = this.state
    return (
      <div>
        {vinylId === "new" && <h2>Create Vinyl</h2>}
        {vinylId != "new" && <h2>Edit Vinyl</h2>}
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderInput("band", "Band")}
          {this.renderInput("album", "Album")}
          {!submitting && this.renderButton("Save")}
          {submitting && <span>Waiting...</span>}
        </form>
      </div>
    );
  }
}

const makeMapStateToProps = () => {
  const getVinylState = makeGetVinylState();
  const mapStateToProps = (state, props) => {
    return {
      data: getVinylState(state, props),
    };
  };
  return mapStateToProps;
};

const mapDispatchToProprs = {
  updateVinyl,
  addVinyl,
};

export default connect(makeMapStateToProps, mapDispatchToProprs)(VinylForm);
