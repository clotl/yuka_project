import React, { Component } from "react";

import SuperPower from "./SuperPower";
import styles from "./LegendPower.module.css";
import AccordionPower from "./AccordionPower";
import { CardDeck } from "reactstrap";
import NoteA from "../images/noteA.png";
import NoteB from "../images/noteB.png";
import NoteC from "../images/noteC.png";
import NoteD from "../images/noteD.png";
import NoteE from "../images/noteE.png";
import Unknow from "../images/unknow.png";

class LegendPower extends Component {
	constructor(props) {
		super(props);
		this.state = {
			power: [
				{
					power: "Super méga pouvoir",
					noteNutriscore: "A",
					image: NoteA,
					description:
						"Excellent ce produit est plein de supers pouvoirs, continue comme ça !!!"
				},
				{
					power: "Pouvoir force verte",
					noteNutriscore: "B",
					image: NoteB,
					description:
						"Bravo, belle trouvaille !! C'est un bon produit, continue sur cette lancée !  "
				},
				{
					power: "Pouvoir force jaune",
					noteNutriscore: "C",
					image: NoteC,
					description:
						"Bof bof !! Ce produit n'est ni bon ni mauvais, tu peux trouver mieux n'hésite pas à chercher encore."
				},
				{
					power: "Pouvoir force orange",
					noteNutriscore: "D",
					image: NoteD,
					description:
						"Hum... force orange n'est pas un très bon pouvoir... Cherche encore il existe des produits similaires avec de meilleurs pouvoirs."
				},
				{
					power: "Pouvoir maléfique",
					noteNutriscore: "E",
					image: NoteE,
					description:
						"Attention, ce produit a des pouvoirs maléfiques !!  Vérifie auprès de tes parents avant de l'ajouter au panier !!!"
				},
				{
					power: "Ooops",
					noteNutriscore: "undefined",
					image: Unknow,
					description:
						"Pouvoirs mystères, à toi de les découvrir ! Demande à tes parents, ils pourront peut-être t'aider..."
				}
			]
		};
	}

	render() {
		return (
			<div className={`${styles.container}`}>
				<h1 className="p-3 text-center">
					Découvre les supers pouvoirs de tes produits
				</h1>
				<CardDeck className="justify-content-center">
					{this.state.power.map((powerList, index) => {
						return <SuperPower {...powerList} key={index} />;
					})}
				</CardDeck>

				{this.state.power.map((powerAccordion, index) => {
					return <AccordionPower {...powerAccordion} key={index} />;
				})}
			</div>
		);
	}
}

export default LegendPower;
