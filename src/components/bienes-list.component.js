import React, { Component } from "react";
import { connect } from "react-redux";
import { retrieveBienes, findBienesByTitle, deleteAllBienes } from "../actions/bienes";
import { Link } from "react-router-dom";

class BienesList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.setActiveBien = this.setActiveBien.bind(this);
    this.findByTitle = this.findByTitle.bind(this);
    this.removeAllBienes = this.removeAllBienes.bind(this);

    this.state = {
      currentBien: null,
      currentIndex: -1,
      searchTitle: "",
    };
  }

  componentDidMount() {
    this.props.retrieveBienes();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle,
    });
  }

  refreshData() {
    this.setState({
      currentBien: null,
      currentIndex: -1,
    });
  }

  setActiveBien(bien, index) {
    this.setState({
      currentBien: bien,
      currentIndex: index,
    });
  }

  removeAllBienes() {
    this.props
      .deleteAllBienes()
      .then((response) => {
        console.log(response);
        this.refreshData();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  findByTitle() {
    this.refreshData();

    this.props.findBienesByTitle(this.state.searchTitle);
  }

  render() {
    const { searchTitle, currentBien, currentIndex } = this.state;
    const { bienes } = this.props;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por título"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.findByTitle}
              >
                Buscar
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Lista de Bienes</h4>

          <ul className="list-group">
            {bienes &&
              bienes.map((bien, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveBien(bien, index)}
                  key={index}
                >
                  {bien.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllBienes}
          >
            Borrar todo
          </button>
        </div>
        <div className="col-md-6">
          {currentBien ? (
            <div>
              <h4>Bien</h4>
              <div>
                <label>
                  <strong>Nombre:</strong>
                </label>{" "}
                {currentBien.title}
              </div>
              <div>
                <label>
                  <strong>Descripción:</strong>
                </label>{" "}
                {currentBien.description}
              </div>
              <div>
                <label>
                  <strong>Estado:</strong>
                </label>{" "}
                {currentBien.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/bienes/" + currentBien.id}
                className="badge badge-warning"
              >
                Editar
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Clic en un Bien...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    bienes: state.bienes,
  };
};

export default connect(mapStateToProps, { retrieveBienes, findBienesByTitle, deleteAllBienes })(BienesList);