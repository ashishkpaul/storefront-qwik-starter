import { $, component$, useOnDocument, useStyles$, useVisibleTask$ } from '@builder.io/qwik';
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from '@builder.io/qwik-city';
import { Head } from './components/head/head';

// import the Flowbite module
import { initFlowbite } from 'flowbite';

import globalStyles from './global.css?inline';
import { useI18n } from './utils/i18n';

export default component$(() => {
	/**
	 * The root of a QwikCity site always start with the <QwikCityProvider> component,
	 * immediately followed by the document's <head> and <body>.
	 *
	 * Don't remove the `<head>` and `<body>` elements.
	 */
	// initialise the event listeners for the data attributes on render
	useVisibleTask$(() => {
		initFlowbite();
	});

	useStyles$(globalStyles);
	useOnDocument('qinit', $(useI18n));

	return (
		<QwikCityProvider>
			<Head />
			<body lang="en">
				<RouterOutlet />
				<ServiceWorkerRegister />
			</body>
		</QwikCityProvider>
	);
});
