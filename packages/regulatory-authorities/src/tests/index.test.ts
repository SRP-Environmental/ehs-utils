import { getRegulatoryAgency } from '../regulatory-agency';

describe('getRegulatoryAgency', () => {
	it('should return the correct agency for Louisiana and Asbestos', () => {
		const louisiana = {
			name: 'Louisiana',
			abbreviation: 'LA',
		};
		const category = 'Asbestos';
		const agency = getRegulatoryAgency(louisiana, category);

		expect(agency.name).toEqual(
			'Louisiana Department of Environmental Quality'
		);
		expect(agency.abbreviation).toEqual('LDEQ');
		expect(agency.phone).toEqual('225-219-3640');
		expect(agency.website).toEqual(
			'http://deq.louisiana.gov/page/asbestos-contacts'
		);
	});
});
