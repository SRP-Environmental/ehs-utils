### Regulatory Authorities Package

#### Description

This npm package provides a comprehensive database of regulatory authorities responsible for enforcing environmental regulations related to asbestos, mold, and other categories. It allows you to access data by state and by category, providing a convenient way to retrieve regulatory agency information for a particular type of regulation in a specific state.

The package includes a [`getRegulatoryAgency()`](#methods) function that allows you to retrieve information about the regulatory agency responsible for enforcing a particular type of environmental regulation in a given state. You can specify the state and category of regulation (e.g., asbestos, mold) to retrieve the corresponding agency information.

The returned RegulatoryAgency object contains detailed information about the regulatory agency, including its name, abbreviation, phone number, website, and other relevant data. You can use this information to assist with compliance and regulatory reporting.

This package is useful for anyone who needs to access regulatory agency data related to environmental regulations, such as environmental consultants, facility managers, and regulatory compliance professionals. It provides a convenient and easy-to-use way to retrieve detailed regulatory agency information by state and by category, ensuring compliance with environmental regulations.

#### Installation

To install the package, run the following command:

`npm install @ehs-utils/regulatory-authorities`

#### Usage

To use the package, import the getRegulatoryAgency function from the package:

`import { getRegulatoryAgency } from '@ehs-utils/regulatory-authorities';`

Then, call the function with the state and category of regulation as arguments:

`const agency = getRegulatoryAgency({ name: "California"}, 'Asbestos');`

#### Example

```javascript
import { getRegulatoryAgency } from '@ehs-utils/regulatory-authorities';

const agency = getRegulatoryAgency({ name: 'California' }, 'Asbestos');
```

#### Methods

##### `getRegulatoryAgency(state, category)`

Returns a RegulatoryAgency object containing information about the regulatory agency responsible for enforcing a particular type of environmental regulation in a given state.

###### Arguments

| Argument | Type     | Description                                          |
| -------- | -------- | ---------------------------------------------------- |
| state    | State    | The state in which the regulatory agency is located. |
| category | Category | The category of environmental regulation.            |

###### Returns

| Type             | Description                                                                                                                                                            |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RegulatoryAgency | A RegulatoryAgency object containing information about the regulatory agency responsible for enforcing a particular type of environmental regulation in a given state. |

#### Types

##### State

| Property     | Type   | Description                                |
| ------------ | ------ | ------------------------------------------ |
| name         | string | The name of the state.                     |
| abbreviation | string | The two-letter abbreviation for the state. |

##### Category

| Name     | Description                   |
| -------- | ----------------------------- |
| Asbestos | Asbestos-related regulations. |
| Mold     | Mold-related regulations.     |

##### RegulatoryAgency

##### Properties

| Property            | Type   | Description                                                                  |
| ------------------- | ------ | ---------------------------------------------------------------------------- |
| name                | string | The name of the regulatory agency.                                           |
| abbreviation        | string | The abbreviation for the regulatory agency.                                  |
| website             | string | The website for the regulatory agency.                                       |
| phone               | string | The phone number for the regulatory agency.                                  |
| governance          | string | The type of governance for the regulatory agency. (ie. Asbestos, Mold, etc.) |
| state               | State  | The state in which the regulatory agency is located.                         |
| requestedGovernance | string | The type of governance requested.                                            |

##### Class Methods

`toJSON()`

Returns a JSON representation of the RegulatoryAgency object.

###### Example

```javascript
const agency = getRegulatoryAgency({ name: 'California' }, 'Asbestos');
console.log(agency.toJSON());

// {"name":"California Division of Occupational Safety and Health","abbreviation":"Cal/OSHA","phone":"800-963-9424","website":"https://www.dir.ca.gov/dosh/Asbestos-in-Construction.html","governance":["Asbestos"]}
```

`getInfo(useRequestedAgencyOnly)`

Returns a string representation of the RegulatoryAgency object.

###### Arguments

| Argument               | Type    | Description                                                                                   |
| ---------------------- | ------- | --------------------------------------------------------------------------------------------- |
| useRequestedAgencyOnly | boolean | If true, only the requested agency will be returned. If false, all agencies will be returned. |

###### Example

```javascript
const agency = getRegulatoryAgency({ name: 'California' }, 'Asbestos');
console.log(agency.getInfo());

// California Division of Occupational Safety and Health (Cal/OSHA) is the governing agency for asbestos in California: Phone: 800-963-9424, Website: https://www.dir.ca.gov/dosh/Asbestos-in-Construction.html
```

#### License

MIT License

#### Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

#### Road Map

- [ ] Add more regulatory agencies
- [ ] Add more categories
- [ ] Add more states
- [ ] Expand outside of the US
- [ ] Add more methods to the RegulatoryAgency class

#### Current Supported States

- California
- Florida
- New York
- Louisiana
- Texas

#### Current Supported Categories

- Asbestos
- Mold

#### Contact

For questions or comments, use the Discussions feature or please contact us at
tech@srpenvironmental.net or visit our website at https://srpenvironmental.com

#### Acknowledgements

This package was created by SRP Environmental, LLC a leading IH, environmental, and safety consulting firm based in the United States. For more information, please visit our website at https://srpenvironmental.com/about/

#### Disclaimer

This package is not intended to be used as legal advice. Please consult with an attorney for legal advice. This package is provided "as is" without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software.

#### Changelog

##### 1.0.0

- Initial release
