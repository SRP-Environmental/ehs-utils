import * as fs from 'fs';

export class RegulatoryAgency {
	name: string;
	abbreviation: string;
	phone: string;
	website: string;
	governance: string[];
	state: State;
	requestedGovernance: string;
	// You can add additional properties as needed

	constructor(
		name: string,
		abbreviation: string,
		phone: string,
		website: string,
		governance: string[],
		state: State,
		requestedGovernance: string
	) {
		this.name = name;
		this.abbreviation = abbreviation;
		this.phone = phone;
		this.website = website;
		this.governance = governance;
		this.state = state;
		this.requestedGovernance = requestedGovernance;
	}

	/**
	 * combineArray
	 * @param arr the array of strings to combine
	 * @returns the combined string of the array properly formatted for a sentence
	 * @example
	 * combineArray(['Asbestos']) // returns 'Asbestos'
	 * combineArray(['Asbestos', 'Mold']) // returns 'Asbestos and Mold'
	 * combineArray(['Asbestos', 'Mold', 'Lead']) // returns 'Asbestos, Mold, and Lead'
	 */
	static combineArray(arr: string[]) {
		if (arr.length === 1) {
			return arr[0];
		} else if (arr.length === 2) {
			return arr.join(' and ');
		} else {
			return (
				arr.slice(0, arr.length - 1).join(', ') + ', and ' + arr[arr.length - 1]
			);
		}
	}

	getInfo(useRequestedAgencyOnly: boolean): string {
		return `${this.name} (${this.abbreviation}) is the governing agency for ${
			useRequestedAgencyOnly
				? this.requestedGovernance.toLocaleLowerCase()
				: RegulatoryAgency.combineArray(this.governance).toLocaleLowerCase()
		} in ${this.state.name}: Phone: ${this.phone}, Website: ${this.website}`;
	}

	toJSON(): string {
		return JSON.stringify({
			name: this.name,
			abbreviation: this.abbreviation,
			phone: this.phone,
			website: this.website,
			governance: this.governance,
		});
	}
}

type Category = 'Asbestos' | 'Mold'; // add additional categories as needed

type State = {
	name: string;
	abbreviation: string;
};

export const getRegulatoryAgency = (
	state: State,
	category: Category
): RegulatoryAgency => {
	const filePath = './src/data/regulatory-data.json';
	const regulatoryAgencies = JSON.parse(fs.readFileSync(filePath, 'utf8'));
	const stateName = state.name || state.abbreviation;

	const stateData = regulatoryAgencies.find(
		(agency: any) =>
			agency.state === stateName || agency.abbreviation === state.abbreviation
	);

	if (!state) {
		throw new Error(`No state found for ${stateName}`);
	}

	const agency = stateData.agencies
		? stateData.agencies.find((agency: any) =>
				agency.governance.includes(category)
		  )
		: null;

	if (!agency) {
		throw new Error(
			`No regulatory agency found for ${category} in ${stateName}`
		);
	} else {
		console.log(agency);
		return new RegulatoryAgency(
			agency.name,
			agency.abbreviation,
			agency.phoneNumber,
			agency.website,
			agency.governance,
			{ name: stateData.state, abbreviation: stateData.abbreviation },
			category
		);
	}
};
