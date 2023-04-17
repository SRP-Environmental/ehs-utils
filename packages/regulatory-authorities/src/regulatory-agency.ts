import * as fs from 'fs';

export class RegulatoryAgency {
	name: string;
	abbreviation: string;
	phone: string;
	website: string;
	governance: string[];
	// You can add additional properties as needed

	constructor(
		name: string,
		abbreviation: string,
		phone: string,
		website: string,
		governance: string[]
	) {
		this.name = name;
		this.abbreviation = abbreviation;
		this.phone = phone;
		this.website = website;
		this.governance = governance;
	}

	getInfo(): string {
		return `${this.name} (${this.abbreviation}): Phone: ${this.phone}, Website: ${this.website}`;
	}

	getName() {
		return this.name;
	}

	getAbbreviation(): string {
		return this.abbreviation;
	}

	getPhone(): string {
		return this.phone;
	}

	getWebsite(): string {
		return this.website;
	}

	getGovernance(): string[] {
		return this.governance;
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
			agency.website
		);
	}
};
