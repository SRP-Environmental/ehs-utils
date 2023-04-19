const fs = require('fs');
const gulp = require('gulp');
const prompt = require('gulp-prompt');
const ts = require('gulp-typescript');

gulp.task('add-data', function () {
	return gulp.src('*').pipe(
		prompt.prompt(
			[
				{
					type: 'input',
					name: 'state',
					message: 'Enter the state name:',
				},
				{
					type: 'input',
					name: 'abbreviation',
					message: 'Enter the state abbreviation:',
				},
				{
					type: 'input',
					name: 'name',
					message: 'Enter the agency name:',
				},
				{
					type: 'input',
					name: 'agencyAbbreviation',
					message: 'Enter the agency abbreviation:',
				},
				{
					type: 'input',
					name: 'phoneNumber',
					message: 'Enter the agency phone number:',
				},
				{
					type: 'input',
					name: 'website',
					message: 'Enter the agency website:',
				},
				{
					type: 'input',
					name: 'category',
					message: 'Enter the category (Asbestos/Mold):',
				},
			],
			function (res) {
				const data = JSON.parse(
					fs.readFileSync('./src/data/regulatory-data.json', 'utf8')
				);
				const {
					state,
					abbreviation,
					name,
					agencyAbbreviation,
					phoneNumber,
					website,
					category,
				} = res;
				const stateIndex = data.findIndex(
					(stateData) =>
						stateData.state === state && stateData.abbreviation === abbreviation
				);

				if (stateIndex === -1) {
					data.push({
						state,
						abbreviation,
						agencies: [
							{
								name,
								abbreviation: agencyAbbreviation,
								phoneNumber,
								website,
								governance: [category],
							},
						],
					});
				} else {
					const agencyIndex = data[stateIndex].agencies.findIndex(
						(agency) => agency.abbreviation === agencyAbbreviation
					);
					if (agencyIndex === -1) {
						data[stateIndex].agencies.push({
							name,
							abbreviation: agencyAbbreviation,
							phoneNumber,
							website,
							governance: [category],
						});
					} else {
						data[stateIndex].agencies[agencyIndex].governance.push(category);
					}
				}

				fs.writeFileSync(
					'./src/data/regulatory-data.json',
					JSON.stringify(data, null, 2)
				);
			}
		)
	);
});

const tsProject = ts.createProject('tsconfig.json');

gulp.task('build', function () {
	return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
	gulp.watch('src/**/*.ts', gulp.series('build'));
});

gulp.task('default', gulp.series('build', 'watch'));
