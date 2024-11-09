import React, { Component } from "react";
import { connect } from "react-redux";
import { updateBien, deleteBien } from "../actions/bienes";
import BienDataService from "../services/bien.service";

class Bien extends Component {

  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getBien = this.getBien.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.removeBien = this.removeBien.bind(this);

    this.state = {
      currentBien: {
        id: null,
        title: "",
        description: "",
        published: false,
      },
      message: "",
    };
  }

  componentDidMount() {
    console.log(this.props.params.id);
    this.getBien(this.props.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function (prevState) {
      return {
        currentBien: {
          ...prevState.currentBien,
          title: title,
        },
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState((prevState) => ({
      currentBien: {
        ...prevState.currentBien,
        description: description,
      },
    }));
  }

  getBien(id) {
    BienDataService.get(id)
      .then((response) => {
        this.setState({
          currentBien: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateStatus(status) {
    var data = {
      id: this.state.currentBien.id,
      title: this.state.currentBien.title,
      description: this.state.currentBien.description,
      published: status,
    };

    this.props
      .updateBien(this.state.currentBien.id, data)
      .then((reponse) => {
        console.log(reponse);

        this.setState((prevState) => ({
          currentBien: {
            ...prevState.currentBien,
            published: status,
          },
        }));

        this.setState({ message: "El estado ha sido actualizado existosamente!" });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateContent() {
    this.props
      .updateBien(this.state.currentBien.id, this.state.currentBien)
      .then((reponse) => {
        console.log(reponse);
        
        this.setState({ message: "El bien ha sido actualizado exitosamente!" });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  removeBien() {
    this.props
      .deleteBien(this.state.currentBien.id)
      .then(() => {
        this.props.history.push("/bienes");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentBien } = this.state;

    return (
      <div>
        {currentBien ? (
          <div className="edit-form">
            <h4>Bien</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentBien.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Descripción</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentBien.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Estado:</strong>
                </label>
                {currentBien.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentBien.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateStatus(false)}
              >
                Despublicar
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateStatus(true)}
              >
                Publicar
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.removeBien}
            >
              Borrar
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateContent}
            >
              Actualizar
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Clic en un Bien...</p>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { updateBien, deleteBien })(Bien);