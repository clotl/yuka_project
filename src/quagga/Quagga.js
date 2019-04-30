import React, { Component } from "react";
import Scanner from "./Scanner";
import { Redirect } from "react-router-dom";
import "./Quagga.css";
import { Progress } from "reactstrap";
import Quagga from "quagga";

class QuaggaApp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			scanning: false,
			results: [],
			bestResult: null,
			numberOfScans: 0,
			scanFrequency: 20
		};
	}

	_scan = () => {
		this.setState({ scanning: !this.state.scanning });
	};

	// Most occuring barcode function
	bestBarcode = array => {
		if (array.length === 0) return null;
		let modeMap = {};
		let maxEl = array[0],
			maxCount = 1;
		for (let i = 0; i < array.length; i++) {
			let el = array[i];
			if (modeMap[el] === null) modeMap[el] = 1;
			else modeMap[el]++;
			if (modeMap[el] > maxCount) {
				maxEl = el;
				maxCount = modeMap[el];
			}
		}
		return maxEl;
	};

	// When scanner detects a barcode
	_onDetected = result => {
		if (this.state.numberOfScans < 20) {
			let pushing = this.state.results.concat(result.codeResult.code);
			let incre = this.state.numberOfScans + 1;
			this.setState({ numberOfScans: incre });
			this.setState({ results: pushing });
			console.log(this.state.results);
			console.log(this.state.numberOfScans);
		} else if (this.state.numberOfScans >= 20) {
			this.setState({ bestResult: this.bestBarcode(this.state.results) });
			console.log(`bestresult: ${this.state.bestResult}`);
			console.log(`scans ${this.state.numberOfScans}`);
		}
	};

	progressBarColor = (scansNb, frequency) => {
		let barProgression = "";
		if (scansNb <= frequency * 0.25) {
			barProgression = "danger";
		} else if (scansNb <= frequency * 0.5) {
			barProgression = "warning";
		} else if (scansNb <= frequency * 0.75) {
			barProgression = "info";
		} else if (scansNb <= frequency * 1) {
			barProgression = "success";
		} else barProgression = "";
		return barProgression;
	};

	componentDidMount() {
		this._scan();
	}

	render() {
		// Product page redirection when bestBarcode() returns the most occuring barcode
		const barCode = this.state.bestResult;
		if (this.state.bestResult) {
			Quagga.stop();
		}

		return barCode === null ? (
			<>
				{/* <button onClick={this._scan} className="button"> 
  {this.state.scanning ? 'Stop' : 'Scan' }
  </button> */}
				{this.state.scanning ? (
					<>
						<div className="container-fluid border8">
							<div className="row">
								<div className="col-12  border8 progressBar m-auto">
									<Scanner onDetected={this._onDetected} />
								</div>
							</div>
						</div>
					</>
				) : null}
				
				{this.state.numberOfScans > 0 ? (
				<div className="row">
					<div className="col-10 offset-1 border8 progressBar m-auto">
						<Progress multi>
							<Progress
								bar
								color={this.progressBarColor(
									this.state.numberOfScans,
									this.state.scanFrequency
								)}
								value={this.state.numberOfScans * 5}
							>
								{" "}
								{this.state.numberOfScans}{" "}
							</Progress>
						</Progress>
					</div>
				</div>
			) : null}
			</>
		) : (
			<Redirect to={`/product/${barCode}`} />
		);
	}
}

export default QuaggaApp;
