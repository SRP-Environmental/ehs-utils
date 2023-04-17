import { getRegulatoryAgency } from '../regulatory-agency';

describe('getRegulatoryAgency', () => {
	it('should return the correct agency for Louisiana and Asbestos', () => {
		const louisiana = {
			name: 'Louisiana',
			abbreviation: 'LA',
		};
		const category = 'Asbestos';
		const agency = getRegulatoryAgency(louisiana, category);

		expect(agency.getName()).toEqual(
			'Louisiana Department of Environmental Quality'
		);
		expect(agency.getAbbreviation()).toEqual('LDEQ');
		expect(agency.getPhone()).toEqual('225-219-3640');
		expect(agency.getWebsite()).toEqual(
			'http://deq.louisiana.gov/page/asbestos-contacts'
		);
	});

	it('should throw an error for Texas and Mold', () => {
		const texas = {
			name: 'Texas',
			abbreviation: 'TX',
		};
		const category = 'Mold';

		expect(() => getRegulatoryAgency(texas, category)).toThrowError(
			'No regulatory agency found for Mold in Texas'
		);
	});
});
